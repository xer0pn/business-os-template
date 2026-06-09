import { createHmac, timingSafeEqual } from "crypto";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WhopWebhookEvent =
  | "membership.went_valid"
  | "membership.went_invalid"
  | "membership.cancelled"
  | "payment.succeeded"
  | "payment.failed";

export interface WhopWebhookPayload {
  action: WhopWebhookEvent;
  data: {
    id: string;
    object: string;
    [key: string]: unknown;
  };
}

// ─── Signature verification ───────────────────────────────────────────────────

export function verifyWhopWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (!secret) throw new Error("WHOP_WEBHOOK_SECRET is not set");
  if (!signature) return false;

  const expected = createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

// ─── Event handlers ───────────────────────────────────────────────────────────

export type WebhookHandler = (
  payload: WhopWebhookPayload
) => Promise<void> | void;

const handlers: Partial<Record<WhopWebhookEvent, WebhookHandler>> = {};

export function onWhopEvent(event: WhopWebhookEvent, handler: WebhookHandler) {
  handlers[event] = handler;
}

export async function processWhopWebhook(
  rawBody: string,
  signature: string | null
): Promise<{ processed: boolean; event?: WhopWebhookEvent }> {
  if (!verifyWhopWebhookSignature(rawBody, signature)) {
    throw new Error("Invalid webhook signature");
  }

  const payload = JSON.parse(rawBody) as WhopWebhookPayload;
  const handler = handlers[payload.action];

  if (handler) {
    await handler(payload);
  }

  return { processed: true, event: payload.action };
}
