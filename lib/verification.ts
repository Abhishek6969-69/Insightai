import crypto from "crypto";
import { prisma } from "./prisma";
import { Resend } from "resend";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
// Support multiple env var names for compatibility
const VERIFICATION_MINUTES = Number(
  process.env.VERIFICATION_TOKEN_EXPIRY_MINUTES ?? process.env.VERIFICATION_EXPIRY_MINUTES ?? 60
);

// Resolve sender email from env
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.APP_FROM_EMAIL || "noreply@yourdomain.com";

/**
 * Create a raw token and its SHA-256 hash.
 * Returns { token, tokenHash }
 */
export function createRawToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, tokenHash };
}

/**
 * Hash an existing token with SHA-256 and return hex digest.
 */
export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * createAndSendVerificationEmail:
 * - generates raw token
 * - stores hashed token in DB (EmailVerificationToken)
 * - sends email with raw token link
 */
export async function createAndSendVerificationEmail(user: { id: number; email: string; name?: string }): Promise<boolean> {
  const { token: rawToken, tokenHash } = createRawToken();
  const expiresAt = new Date(Date.now() + VERIFICATION_MINUTES * 60 * 1000);

  // Delete previous tokens for user (optional)
  await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });

  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt
    }
  });

  const verifyUrl = `${APP_URL}/api/auth/verify?token=${rawToken}&email=${encodeURIComponent(user.email)}`;
  // Log verification URL in development for developer convenience.
  if (process.env.NODE_ENV !== "production") {
    console.info("[DEV] Verification URL:", verifyUrl);
  }

  const html = `
    <p>Hi ${user.name ?? ""},</p>
    <p>Click the link below to verify your email address for InsightAI:</p>
    <p><a href="${verifyUrl}">Verify my email</a></p>
    <p>This link will expire in ${VERIFICATION_MINUTES} minutes.</p>
    <p>If you didn't create an account, you can ignore this email.</p>
  `;

  // Use only Resend for sending. If RESEND_API_KEY not provided, throw an error
  // so the caller knows the send failed due to configuration.
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }


  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: user.email,
    subject: "Verify your email for InsightAI",
    html
  });

  // Log Resend result (message id) in dev so you can inspect Resend dashboard if needed
  if (process.env.NODE_ENV !== "production") {
    console.info("[DEV] Resend send result:", result);
  }

  return true;
}

// For developer convenience: if emails are not configured or delivery fails,
// applications often need a way to retrieve the verification link. You can
// call createRawToken() and construct the verify URL from it, or observe logs
// (the signup/resend routes will log errors). For convenience during local
// development, log the verify URL when NODE_ENV !== 'production'.
// No dev logging helper in the clean version
