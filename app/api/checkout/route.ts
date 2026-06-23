import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rateLimit";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cacsalvationcenter.org";

type OrderItem = { id: string; quantity: number; variant?: string };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!rateLimit(ip, 20, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment." },
      { status: 503 }
    );
  }

  let orderItems: OrderItem[];
  try {
    ({ items: orderItems } = await req.json());
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const validItems = orderItems.filter(
    (i) =>
      typeof i.id === "string" &&
      Number.isInteger(i.quantity) &&
      i.quantity > 0 &&
      i.quantity <= 100
  );
  if (validItems.length === 0) {
    return Response.json({ error: "Invalid cart items" }, { status: 400 });
  }

  // Server-side price lookup — client-supplied priceCents is ignored
  const supabase = createServiceClient();
  const ids = [...new Set(validItems.map((i) => i.id))];
  const { data: products, error: dbError } = await supabase
    .from("products")
    .select("id, name, category, price_cents")
    .in("id", ids)
    .eq("published", true);

  if (dbError || !products) {
    return Response.json({ error: "Could not load products" }, { status: 500 });
  }

  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of validItems) {
    if (!productMap.has(item.id)) {
      return Response.json({ error: "Unknown or unavailable product" }, { status: 400 });
    }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-05-27.dahlia",
  });

  const line_items = validItems.map((item) => {
    const product = productMap.get(item.id)!;
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.variant ? `${product.name} — ${item.variant}` : product.name,
          description: product.category,
        },
        unit_amount: product.price_cents,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${SITE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/store`,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      custom_text: {
        submit: {
          message:
            "Your receipt will be emailed. All proceeds support CAC Salvation Center ministries.",
        },
      },
      metadata: { source: "cac-salvation-center-store" },
    });

    if (!session.url) {
      return Response.json({ error: "Stripe did not return a checkout URL." }, { status: 500 });
    }

    return Response.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout] Stripe session error:", msg);
    return Response.json({ error: "Could not create checkout session. Please try again." }, { status: 500 });
  }
}
