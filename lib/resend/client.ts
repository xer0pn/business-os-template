import { Resend } from "resend";

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@example.com";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SendResult {
  id: string;
}

interface WelcomeEmailParams {
  to: string;
  firstName: string;
  loginUrl: string;
}

interface PurchaseConfirmationParams {
  to: string;
  firstName: string;
  planName: string;
  amount: string;
  receiptUrl?: string;
}

// ─── Email senders ────────────────────────────────────────────────────────────

export async function sendWelcomeEmail({
  to,
  firstName,
  loginUrl,
}: WelcomeEmailParams): Promise<SendResult> {
  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `Welcome to Business OS, ${firstName}!`,
    html: `
      <h1>Welcome, ${firstName}!</h1>
      <p>Your account is ready. Click below to get started.</p>
      <a href="${loginUrl}" style="
        display:inline-block;
        padding:12px 24px;
        background:#6366f1;
        color:#fff;
        border-radius:8px;
        text-decoration:none;
        font-weight:600;
      ">Go to dashboard</a>
      <p style="color:#94a3b8;font-size:12px;margin-top:32px;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    `,
  });

  if (error) throw new Error(`Resend sendWelcomeEmail failed: ${error.message}`);
  if (!data) throw new Error("Resend returned no data");

  return { id: data.id };
}

export async function sendPurchaseConfirmation({
  to,
  firstName,
  planName,
  amount,
  receiptUrl,
}: PurchaseConfirmationParams): Promise<SendResult> {
  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `Your Business OS purchase — ${planName}`,
    html: `
      <h1>Thanks for your purchase, ${firstName}!</h1>
      <p>You're now on the <strong>${planName}</strong> plan.</p>
      <table style="border-collapse:collapse;width:100%;max-width:400px;">
        <tr>
          <td style="padding:8px 0;color:#64748b;">Plan</td>
          <td style="padding:8px 0;font-weight:600;">${planName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;">Amount charged</td>
          <td style="padding:8px 0;font-weight:600;">${amount}</td>
        </tr>
      </table>
      ${
        receiptUrl
          ? `<p><a href="${receiptUrl}" style="color:#6366f1;">View receipt</a></p>`
          : ""
      }
      <p style="color:#94a3b8;font-size:12px;margin-top:32px;">
        Questions? Reply to this email and our team will help.
      </p>
    `,
  });

  if (error) {
    throw new Error(`Resend sendPurchaseConfirmation failed: ${error.message}`);
  }
  if (!data) throw new Error("Resend returned no data");

  return { id: data.id };
}
