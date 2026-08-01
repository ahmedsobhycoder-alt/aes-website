import { SITE } from "@/data/site";

/**
 * Contact-form delivery.
 *
 * The site is a static export, so there is no server of ours to POST to. The
 * browser sends the enquiry to Web3Forms, which emails it to
 * SITE.contact.email. Nothing is stored on their side beyond delivery.
 *
 * MIGRATING TO OUR OWN BACKEND LATER
 * Only `postEnquiry` below changes: point it at `${API_URL}/api/contact` and
 * send the same `EnquiryPayload` as JSON. The component calling `sendEnquiry`
 * needs no edit, because the result shape is provider-independent.
 *
 * The access key is a publishable key — it is designed to sit in client code.
 * It identifies the destination inbox, it does not authorise reading anything.
 * Lock it to the production domain in the Web3Forms dashboard so it cannot be
 * reused from another site.
 */

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export type EnquiryPayload = {
  name: string;
  email: string;
  service: string;
  message: string;
  /** Honeypot. Real users never see this field, so any value means a bot. */
  botcheck?: string;
};

export type EnquiryResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "network" | "rejected"; detail?: string };

/** Subject line the studio sees in its inbox. */
function subjectFor(p: EnquiryPayload): string {
  return p.service
    ? `New enquiry from ${p.name} — ${p.service}`
    : `New enquiry from ${p.name}`;
}

/**
 * mailto: fallback, offered only when delivery fails. It is no longer the
 * primary path: it cannot confirm delivery and silently does nothing when the
 * visitor has no mail client configured.
 */
export function buildMailtoHref(p: EnquiryPayload): string {
  const body = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Service interest: ${p.service || "Not specified"}`,
    "",
    "Message:",
    p.message,
  ].join("\r\n");

  // Encoding is required: an unencoded & or # truncates the URL at that point.
  return `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
    subjectFor(p),
  )}&body=${encodeURIComponent(body)}`;
}

export async function sendEnquiry(p: EnquiryPayload): Promise<EnquiryResult> {
  // Silently dropping enquiries because an env var is unset is the worst
  // possible failure here, so it is reported as its own distinct reason.
  if (!ACCESS_KEY) {
    return { ok: false, reason: "unconfigured" };
  }

  // Bot filled the hidden field — pretend success so it does not retry, but
  // send nothing.
  if (p.botcheck) {
    return { ok: true };
  }

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: subjectFor(p),
        from_name: "AES Website",
        // Lets the studio hit reply and reach the visitor directly.
        replyto: p.email,
        name: p.name,
        email: p.email,
        service: p.service || "Not specified",
        message: p.message,
      }),
    });
  } catch (e) {
    return { ok: false, reason: "network", detail: e instanceof Error ? e.message : undefined };
  }

  if (!res.ok) {
    return { ok: false, reason: "rejected", detail: `HTTP ${res.status}` };
  }

  // Web3Forms returns 200 with { success: false } for a bad key, so the status
  // code alone is not enough.
  try {
    const data: unknown = await res.json();
    const success =
      typeof data === "object" && data !== null && (data as { success?: unknown }).success === true;
    if (!success) {
      const msg =
        typeof data === "object" && data !== null
          ? String((data as { message?: unknown }).message ?? "")
          : "";
      return { ok: false, reason: "rejected", detail: msg || undefined };
    }
  } catch {
    return { ok: false, reason: "rejected", detail: "malformed response" };
  }

  return { ok: true };
}
