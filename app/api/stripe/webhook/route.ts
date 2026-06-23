import Stripe from "stripe";
import { Resend } from "resend";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

const FROM = "CAC Salvation Center <noreply@cacsalvationcenter.org>";

function fmt(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function buildOrderEmail(session: Stripe.Checkout.Session): string {
  const customerDetails = session.customer_details;
  const name = customerDetails?.name;
  const items = session.line_items?.data ?? [];
  const total = session.amount_total ?? 0;
  const address = customerDetails?.address;

  const greeting = name ? `Hi ${name.split(" ")[0]},` : "Hello,";

  const itemRows = items.length > 0
    ? items
        .map(
          (li) => `
          <tr>
            <td style="padding:10px 16px;font-size:14px;color:#1B130E;border-bottom:1px solid #ede9e4">${li.description ?? "Item"}</td>
            <td style="padding:10px 16px;font-size:14px;color:#5f5e5a;text-align:center;border-bottom:1px solid #ede9e4">${li.quantity ?? 1}</td>
            <td style="padding:10px 16px;font-size:14px;font-weight:700;color:#1B130E;text-align:right;border-bottom:1px solid #ede9e4">${fmt(li.amount_total ?? 0)}</td>
          </tr>`
        )
        .join("")
    : `<tr><td colspan="3" style="padding:10px 16px;font-size:14px;color:#5f5e5a;text-align:center">Order details unavailable</td></tr>`;

  const shippingBlock = address
    ? `<div style="margin-top:24px;background:#f9f8f6;border-radius:10px;padding:16px 20px">
        <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#E8A33D;margin-bottom:8px">Shipping to</div>
        <div style="font-size:14px;color:#1B130E;line-height:1.7">
          ${name ? `${name}<br>` : ""}
          ${address.line1 ?? ""}${address.line2 ? `, ${address.line2}` : ""}<br>
          ${address.city ?? ""}, ${address.state ?? ""} ${address.postal_code ?? ""}<br>
          ${address.country ?? ""}
        </div>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ede8;font-family:Georgia,serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede8;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:580px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,19,14,.1)">

        <!-- Header -->
        <tr>
          <td style="background:#1B130E;padding:28px 32px">
            <div style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#E8A33D;margin-bottom:6px">CAC Salvation Center</div>
            <div style="font-size:26px;font-weight:700;color:#fff;line-height:1.2">Your order is confirmed 🙏</div>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:28px 32px 0">
            <p style="margin:0;font-size:16px;color:#1B130E;line-height:1.7">${greeting}</p>
            <p style="margin:12px 0 0;font-size:15px;color:#5f5e5a;line-height:1.7">
              Thank you for your purchase — your support means everything to the ministry.
              Here's a summary of what you ordered.
            </p>
          </td>
        </tr>

        <!-- Items table -->
        <tr>
          <td style="padding:24px 32px 0">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #ede9e4;border-radius:10px;overflow:hidden">
              <thead>
                <tr style="background:#f9f8f6">
                  <th style="padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5f5e5a;text-align:left">Item</th>
                  <th style="padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5f5e5a;text-align:center">Qty</th>
                  <th style="padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5f5e5a;text-align:right">Price</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
            </table>
            <div style="margin-top:12px;text-align:right">
              <div style="background:#1B130E;display:inline-block;padding:12px 20px;border-radius:10px">
                <span style="font-size:12px;color:rgba(255,247,239,.6);letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:4px">Order total</span>
                <span style="font-size:24px;font-weight:700;color:#fff">${fmt(total)}</span>
              </div>
            </div>
          </td>
        </tr>

        <!-- Shipping -->
        <tr>
          <td style="padding:0 32px">${shippingBlock}</td>
        </tr>

        <!-- What happens next -->
        <tr>
          <td style="padding:28px 32px 0">
            <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D62828;margin-bottom:16px">What happens next</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #ede9e4;vertical-align:top;width:28px">
                  <div style="width:24px;height:24px;background:#f9f8f6;border-radius:50%;font-size:12px;font-weight:700;color:#D62828;text-align:center;line-height:24px">1</div>
                </td>
                <td style="padding:12px 0 12px 12px;border-bottom:1px solid #ede9e4;font-size:14px;color:#1B130E;line-height:1.6">
                  <strong>Physical items</strong> ship within 5 business days to the address you provided.
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;vertical-align:top;width:28px">
                  <div style="width:24px;height:24px;background:#f9f8f6;border-radius:50%;font-size:12px;font-weight:700;color:#D62828;text-align:center;line-height:24px">2</div>
                </td>
                <td style="padding:12px 0 12px 12px;font-size:14px;color:#1B130E;line-height:1.6">
                  <strong>Questions?</strong> Reach us on WhatsApp at
                  <a href="https://wa.me/14432726794" style="color:#25D366;font-weight:700;text-decoration:none"> +1 (443) 272-6794</a>
                  with your order details.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 32px;border-top:1px solid #ede9e4;margin-top:28px">
            <p style="margin:0;font-size:13px;color:#888;line-height:1.7">
              Every purchase supports the building project, outreach, and the ministry of CAC Salvation Center.
              We are grateful for you. 🙏
            </p>
            <p style="margin:12px 0 0;font-size:12px;color:#aaa">
              <a href="https://cacsalvationcenter.org" style="color:#D62828;text-decoration:none;font-weight:700">cacsalvationcenter.org</a>
              &nbsp;·&nbsp; Randallstown, Maryland
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendOrderEmail(session: Stripe.Checkout.Session): Promise<void> {
  const email = session.customer_details?.email;
  if (!email || !process.env.RESEND_API_KEY) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const name = session.customer_details?.name;
    const subject = name
      ? `Order confirmed, ${name.split(" ")[0]} — CAC Salvation Center`
      : "Order confirmed — CAC Salvation Center";
    await resend.emails.send({
      from: FROM,
      to: email,
      subject,
      html: buildOrderEmail(session),
    });
    console.log("[webhook] Order email sent to:", email);
  } catch (err) {
    console.error("[webhook] Failed to send order email:", err);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return Response.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const sessionId = (event.data.object as Stripe.Checkout.Session).id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        console.log("[webhook] Payment completed:", session.id, "amount:", session.amount_total, "email:", session.customer_details?.email);
        // Fire-and-forget — don't block webhook response
        sendOrderEmail(session).catch(() => {});
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log("[webhook] Refund issued:", charge.id, "amount:", charge.amount_refunded, "email:", charge.billing_details?.email);
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        console.log("[webhook] Payment failed:", intent.id, "reason:", intent.last_payment_error?.message);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[webhook] Handler error for", event.type, err);
    return Response.json({ error: "Handler error" }, { status: 500 });
  }

  return Response.json({ received: true });
}
