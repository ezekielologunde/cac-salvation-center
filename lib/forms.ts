export type LeadData = Record<string, string>;

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Submit a lead/signup. Posts to a Formspree-compatible endpoint when
 * NEXT_PUBLIC_FORMSPREE_ENDPOINT is configured; otherwise hands off to the
 * visitor's email client so a submission is never silently dropped.
 *
 * Returns "sent" (delivered via fetch) or "mailto" (handed to email client)
 * so the caller can word the confirmation honestly.
 */
export async function submitLead(data: LeadData, formName: string): Promise<"sent" | "mailto"> {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _subject: `${formName} — CAC Salvation Center` }),
    });
    if (!res.ok) throw new Error(`Submission failed (${res.status})`);
    return "sent";
  }

  const subject = encodeURIComponent(`${formName} — CAC Salvation Center`);
  const body = encodeURIComponent(
    Object.entries(data)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")
  );
  window.location.href = `mailto:info@cacsalvationcenter.org?subject=${subject}&body=${body}`;
  return "mailto";
}
