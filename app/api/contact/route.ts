import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM = "CAC Salvation Center <noreply@cacsalvationcenter.org>";
const TO   = "info@cacsalvationcenter.org";

function buildHtml(rows: [string, string][]): string {
  const trs = rows
    .map(([k, v]) => `<tr><td style="padding:8px 14px;font-weight:600;color:#5f5e5a;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 14px;color:#1B130E">${v.replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:640px;margin:40px auto;background:#f9f8f6;border-radius:12px;overflow:hidden">
<div style="background:#1B130E;padding:24px 32px"><p style="margin:0;font-size:18px;font-weight:700;color:#fff">CAC Salvation Center</p></div>
<table style="width:100%;border-collapse:collapse;background:#fff">${trs}</table>
<p style="padding:16px 32px;font-size:12px;color:#888;margin:0">Sent via cacsalvationcenter.org</p>
</body></html>`;
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { formName, ...fields } = body;
  const subject = `${formName ?? "Form submission"} — CAC Salvation Center`;
  const rows = Object.entries(fields).filter(([, v]) => v?.trim()) as [string, string][];

  // Log to Google Sheets — fire-and-forget, always runs regardless of Resend status
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

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: fields.email || undefined,
      subject,
      html: buildHtml(rows),
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ method: "mailto" });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ method: "mailto" });
  }
}
