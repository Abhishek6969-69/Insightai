// pages/api/auth/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, email } = req.query;

  if (!token || !email) return res.status(400).send("Missing token or email");

  try {
    const raw = String(token);
    const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");

    const tokenRecord = await prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
      include: { user: true }
    });

    if (!tokenRecord) {
      // invalid token
      return res.redirect(`/auth/verify-failed?reason=invalid`);
    }

    if (tokenRecord.expiresAt < new Date()) {
      // expired — delete and redirect
      await prisma.emailVerificationToken.delete({ where: { id: tokenRecord.id } });
      return res.redirect(`/auth/verify-failed?reason=expired`);
    }

    // Mark user as verified
    await prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { emailVerified: true }
    });

    // Delete token (single-use)
    await prisma.emailVerificationToken.delete({ where: { id: tokenRecord.id } });

    // Redirect to a friendly page (you'll create these pages in /pages/auth/)
    return res.redirect(`/auth/verify-success`);
  } catch (err) {
    console.error(err);
    return res.redirect(`/auth/verify-failed?reason=error`);
  }
}
