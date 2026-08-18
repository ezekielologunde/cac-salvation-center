import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rateLimit";
import { SITE_URL } from "@/lib/site";

const FROM = "CAC Salvation Center <noreply@cacsalvationcenter.org>";
const TO   = "info@cacsalvationcenter.org";

const ALLOWED_FORM_PREFIXES = ["Prayer request", "Testimony", "Contact —", "Contact Form", "Connect Card"];
const MAX_FIELD_LENGTH = 10_000;
const MAX_FIELDS = 20;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function buildHtml(rows: [string, string][]): string {
  const trs = rows
    .map(([k, v]) => `<tr><td style="padding:8px 14px;font-weight:600;color:#5f5e5a;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 14px;color:#1B130E">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:640px;margin:40px auto;background:#f9f8f6;border-radius:12px;overflow:hidden">
<div style="background:#1B130E;padding:24px 32px"><p style="margin:0;font-size:18px;font-weight:700;color:#fff">CAC Salvation Center</p></div>
<table style="width:100%;border-collapse:collapse;background:#fff">${trs}</table>
<p style="padding:16px 32px;font-size:12px;color:#888;margin:0">Sent via cacsalvationcenter.org</p>
</body></html>`;
}

/** Shared branded shell for submitter-facing acknowledgement emails. */
function brandedShell(headline: string, bodyHtml: string, sourceNote: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F9F8F6;font-family:Georgia,serif">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,19,14,.10)">
    <div style="background:#1B130E;padding:32px 40px 36px;text-align:center">
      <img src="${SITE_URL}/images/logo.png" width="64" height="64" alt="Christ Apostolic Church Salvation Center" style="display:block;margin:0 auto 14px;border-radius:50%;width:64px;height:64px">
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,247,239,.45)">CAC SALVATION CENTER</p>
      <h1 style="margin:0;font-size:32px;font-weight:800;color:#fff;letter-spacing:-0.5px;line-height:1.15">${headline}</h1>
    </div>
    <div style="padding:40px">
      ${bodyHtml}
      <hr style="border:none;border-top:1px solid rgba(27,19,14,.08);margin:24px 0">
      <p style="font-size:12px;color:rgba(27,19,14,.4);line-height:1.7;margin:0">
        You're receiving this because you ${sourceNote} at
        <a href="https://www.cacsalvationcenter.org" style="color:#D62828;text-decoration:none">cacsalvationcenter.org</a>.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function closingContactLine(): string {
  return `<p style="font-size:14px;color:#5f5e5a;line-height:1.7;margin:0 0 8px">
        Questions? Reach us on WhatsApp at
        <a href="https://wa.me/14432726794" style="color:#25D366;font-weight:700;text-decoration:none">+1 (443) 272-6794</a>
        or call <a href="tel:+14432726794" style="color:#D62828;text-decoration:none">(443) 272-6794</a>.
      </p>`;
}

function serviceScheduleBlock(): string {
  return `<div style="background:#F9F8F6;border-radius:12px;padding:24px;margin-bottom:32px">
        <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D62828;margin:0 0 12px">Sunday Service</p>
        <p style="font-size:14px;color:#1B130E;line-height:1.8;margin:0">
          🙏 <strong>Sunday School</strong> — 9:25 AM ET<br>
          🎶 <strong>Worship Service</strong> — 10:30 AM ET<br>
          📍 10710 Marriottsville Rd, Randallstown, MD 21133
        </p>
      </div>`;
}

function connectCardAckHtml(firstName: string, visitType: string): string {
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi there,";
  const personalLine =
    visitType === "New member"
      ? "We're so glad you're ready to join the family — someone from our team will personally reach out to walk you through next steps."
      : visitType === "Returning visitor"
      ? "So good to have you with us again — we can't wait to see you this Sunday."
      : "We can't wait to meet you in person — thank you for letting us know you're here.";

  return brandedShell("Great to connect with you.", `
      <p style="font-size:17px;color:#1B130E;line-height:1.75;margin:0 0 18px">${greeting}</p>
      <p style="font-size:16px;color:#1B130E;line-height:1.75;margin:0 0 36px">${personalLine}</p>
      <div style="text-align:center;margin-bottom:36px">
        <a href="https://maps.google.com/?q=10710+Marriottsville+Rd+Randallstown+MD+21133" style="display:inline-block;background:#D62828;color:#fff;font-weight:700;font-size:15px;padding:15px 36px;border-radius:999px;text-decoration:none;box-shadow:0 8px 20px rgba(214,40,40,.30)">
          Get Directions →
        </a>
      </div>
      ${serviceScheduleBlock()}
      ${closingContactLine()}`, "filled out a Connect Card");
}

function contactAckHtml(name: string, subject: string): string {
  const first = name.trim().split(" ")[0];
  const greeting = first ? `Hi ${escapeHtml(first)},` : "Hi there,";
  const subjLine = subject ? ` about "${escapeHtml(subject)}"` : "";

  return brandedShell("We got your message.", `
      <p style="font-size:17px;color:#1B130E;line-height:1.75;margin:0 0 18px">${greeting}</p>
      <p style="font-size:16px;color:#1B130E;line-height:1.75;margin:0 0 32px">
        Thank you for reaching out${subjLine} — your message has reached our team, and someone will follow up with you soon.
      </p>
      ${closingContactLine()}`, "sent us a message through the contact form");
}

function prayerAckHtml(name: string, pastorCall: boolean): string {
  const first = name.trim().split(" ")[0];
  const greeting = first && first !== "(anonymous)" ? `Hi ${escapeHtml(first)},` : "Hi there,";
  const callLine = pastorCall ? " A pastor will be in touch with you soon." : "";

  return brandedShell("We're praying with you.", `
      <p style="font-size:17px;color:#1B130E;line-height:1.75;margin:0 0 18px">${greeting}</p>
      <p style="font-size:16px;color:#1B130E;line-height:1.75;margin:0 0 24px">
        Your request has reached our prayer team.${callLine} You are not alone — and you are loved.
      </p>
      <p style="font-size:15px;color:#1B130E;line-height:1.75;font-style:italic;margin:0 0 32px">
        "Cast all your anxiety on Him because He cares for you." — 1 Peter 5:7
      </p>
      ${closingContactLine()}`, "submitted a prayer request");
}

function testimonyAckHtml(name: string): string {
  const first = name.trim().split(" ")[0];
  const greeting = first && first !== "(anonymous)" ? `Hi ${escapeHtml(first)},` : "Hi there,";

  return brandedShell("Praise God — thank you!", `
      <p style="font-size:17px;color:#1B130E;line-height:1.75;margin:0 0 18px">${greeting}</p>
      <p style="font-size:16px;color:#1B130E;line-height:1.75;margin:0 0 24px">
        Your testimony has reached us. Stories like yours build faith across the whole family.
      </p>
      <p style="font-size:15px;color:#1B130E;line-height:1.75;font-style:italic;margin:0 0 32px">
        "They triumphed over him by the blood of the Lamb and by the word of their testimony." — Revelation 12:11
      </p>
      ${closingContactLine()}`, "shared a testimony");
}

/** Returns the submitter-facing acknowledgement subject/html for a form, or
 *  null if that form type doesn't get one (nothing currently opts out, but
 *  this keeps the dispatch centralized as more form types are added). */
function getAckEmail(formName: string, fields: Record<string, string>): { subject: string; html: string } | null {
  if (formName === "Connect Card") {
    return {
      subject: "Great to connect with you — CAC Salvation Center",
      html: connectCardAckHtml(fields["First Name"] || "", fields["Visit Type"] || ""),
    };
  }
  if (formName.startsWith("Contact —") || formName.startsWith("Contact Form")) {
    return {
      subject: "We got your message — CAC Salvation Center",
      html: contactAckHtml(fields["Name"] || fields.name || "", fields["Subject"] || fields.subject || ""),
    };
  }
  if (formName === "Prayer request") {
    return {
      subject: "We're praying with you — CAC Salvation Center",
      html: prayerAckHtml(fields.name || "", fields.requestPastorCall?.startsWith("Yes") ?? false),
    };
  }
  if (formName === "Testimony") {
    return {
      subject: "Thank you for sharing — CAC Salvation Center",
      html: testimonyAckHtml(fields.name || ""),
    };
  }
  return null;
}

async function saveToSupabase(formName: string, fields: Record<string, string>): Promise<void> {
  const supabase = await createServiceClient();

  if (formName === "Prayer request") {
    await supabase.from("prayer_requests").insert({
      name: fields.name === "(anonymous)" ? null : (fields.name || null),
      email: fields.email === "(not provided)" ? null : (fields.email || null),
      request: fields.prayerRequest ?? "",
      urgent: fields.requestPastorCall?.startsWith("Yes") ?? false,
    });
  } else if (formName === "Testimony") {
    await supabase.from("testimonies").insert({
      name: fields.name === "(anonymous)" ? "Anonymous" : (fields.name || "Anonymous"),
      content: fields.testimony ?? "",
    });
  } else if (formName.startsWith("Contact —") || formName.startsWith("Contact Form")) {
    await supabase.from("contact_submissions").insert({
      name: fields["Name"] || fields.name || "Unknown",
      email: fields["Email"] || fields.email || "",
      subject: fields["Subject"] || fields.subject || null,
      message: fields["Message"] || fields.message || "",
    });
  } else if (formName === "Connect Card") {
    await supabase.from("connect_cards").insert({
      first_name: fields["First Name"] || "Unknown",
      last_name: fields["Last Name"] || null,
      email: fields["Email"] || "",
      phone: fields["Phone"] || null,
      visit_type: fields["Visit Type"] || null,
      address: fields["Address"] || null,
      city: fields["City/Town"] || null,
      state: fields["State/Province"] || null,
      zip: fields["Zip/Post Code"] || null,
      country: fields["Country"] || null,
      groups: fields["Groups"] || null,
    });
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { formName, ...rawFields } = body;

  // Validate formName
  if (typeof formName !== "string" || !ALLOWED_FORM_PREFIXES.some((p) => formName.startsWith(p))) {
    return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  }

  // Validate fields: all values must be strings within length limits
  if (Object.keys(rawFields).length > MAX_FIELDS) {
    return NextResponse.json({ error: "Too many fields" }, { status: 400 });
  }
  for (const [, v] of Object.entries(rawFields)) {
    if (typeof v !== "string" || v.length > MAX_FIELD_LENGTH) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }
  }
  const fields = rawFields as Record<string, string>;

  const subject = `${formName} — CAC Salvation Center`;
  const rows = Object.entries(fields).filter(([, v]) => v?.trim()) as [string, string][];

  // Save to Supabase — fire-and-forget
  saveToSupabase(formName, fields).catch((e) => console.error("[contact] Supabase save failed:", e));

  // Log to Google Sheets — fire-and-forget
  const hook = process.env.SHEETS_WEBHOOK;
  if (hook) {
    fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formName, ...fields }),
    }).catch((e) => console.error("[contact] Sheets webhook failed:", e));
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ method: "mailto" });
  }

  // Only use email as replyTo if it's a valid address
  const replyToRaw = fields.email || fields["Email"] || "";
  const replyTo = EMAIL_RE.test(replyToRaw.trim()) ? replyToRaw.trim() : undefined;

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo,
      subject,
      html: buildHtml(rows),
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ method: "mailto" });
    }

    // Submitter-facing acknowledgement — every form that collects an email
    // gets one, sent only when a valid address was actually provided (Prayer
    // request and Testimony allow leaving it blank). Fire-and-forget so a
    // failure here never blocks the response or the staff notification above.
    if (replyTo) {
      const ack = getAckEmail(formName, fields);
      if (ack) {
        resend.emails.send({
          from: FROM,
          to: replyTo,
          subject: ack.subject,
          html: ack.html,
        }).catch((e) => console.error(`[contact] ${formName} ack email failed:`, e));
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ method: "mailto" });
  }
}
