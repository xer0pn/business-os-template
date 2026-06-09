const WHOP_API_BASE = "https://api.whop.com/api/v2";

function getHeaders() {
  const key = process.env.WHOP_API_KEY;
  if (!key) throw new Error("WHOP_API_KEY is not set");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WhopCheckoutSession {
  id: string;
  url: string;
  status: string;
}

export interface WhopSubscription {
  id: string;
  status: "active" | "cancelled" | "expired" | "trialing" | "past_due";
  product_id: string;
  plan_id: string;
  user_id: string;
  renewal_period_start: number;
  renewal_period_end: number;
  quantity: number;
}

export interface WhopMembership {
  id: string;
  product_id: string;
  user_id: string;
  status: string;
  valid: boolean;
  metadata: Record<string, string>;
}

// ─── API methods ──────────────────────────────────────────────────────────────

export async function createCheckoutSession(
  planId: string,
  redirectUrl: string,
  metadata?: Record<string, string>
): Promise<WhopCheckoutSession> {
  const res = await fetch(`${WHOP_API_BASE}/checkout/sessions`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ plan_id: planId, redirect_url: redirectUrl, metadata }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Whop createCheckoutSession failed: ${res.status} ${body}`);
  }

  return res.json() as Promise<WhopCheckoutSession>;
}

export async function getSubscription(
  subscriptionId: string
): Promise<WhopSubscription> {
  const res = await fetch(
    `${WHOP_API_BASE}/memberships/${subscriptionId}`,
    { headers: getHeaders() }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Whop getSubscription failed: ${res.status} ${body}`);
  }

  return res.json() as Promise<WhopSubscription>;
}

export async function cancelSubscription(
  membershipId: string
): Promise<{ success: boolean }> {
  const res = await fetch(
    `${WHOP_API_BASE}/memberships/${membershipId}/cancel`,
    { method: "POST", headers: getHeaders() }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Whop cancelSubscription failed: ${res.status} ${body}`);
  }

  return { success: true };
}

export async function getMembership(
  membershipId: string
): Promise<WhopMembership> {
  const res = await fetch(
    `${WHOP_API_BASE}/memberships/${membershipId}`,
    { headers: getHeaders() }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Whop getMembership failed: ${res.status} ${body}`);
  }

  return res.json() as Promise<WhopMembership>;
}

export async function validateMembership(
  membershipId: string
): Promise<boolean> {
  try {
    const membership = await getMembership(membershipId);
    return membership.valid && membership.status === "active";
  } catch {
    return false;
  }
}
