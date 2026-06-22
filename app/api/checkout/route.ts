import Stripe from "stripe";
import type { CartItem } from "@/contexts/CartContext";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cacsalvationcenter.org";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-05-27.dahlia",
  });

  let items: CartItem[];
  try {
    ({ items } = await req.json());
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const hasPhysical = items.some((i) => !i.isDigital);

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.variant ? `${item.name} — ${item.variant}` : item.name,
        description: item.category,
      },
      unit_amount: item.priceCents,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${SITE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/store`,
    ...(hasPhysical
      ? { shipping_address_collection: { allowed_countries: ["US", "CA"] } }
      : {}),
    phone_number_collection: { enabled: true },
    billing_address_collection: "auto",
    custom_text: {
      submit: {
        message: "Your receipt will be emailed by Stripe. Digital downloads are delivered within 24 hours. All proceeds support CAC Salvation Center ministries.",
      },
    },
    metadata: {
      source: "cac-salvation-center-store",
      has_digital: String(items.some((i) => i.isDigital)),
    },
  });

  return Response.json({ url: session.url });
}
