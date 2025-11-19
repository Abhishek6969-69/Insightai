import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/verification";
import { NextResponse } from "next/server";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");

    if (!token || !email) return new Response("Missing token or email", { status: 400 });

  const raw = String(token);
  const tokenHash = hashToken(raw);

  const tokenRecord = await prisma.emailVerificationToken.findUnique({ where: { tokenHash }, include: { user: true } });

    if (!tokenRecord) {
      return NextResponse.redirect(new URL(`/auth/verify-failed?reason=invalid`, APP_URL));
    }

    if (tokenRecord.expiresAt < new Date()) {
      await prisma.emailVerificationToken.delete({ where: { id: tokenRecord.id } });
      return NextResponse.redirect(new URL(`/auth/verify-failed?reason=expired`, APP_URL));
    }

    // Mark user verified and delete token in a transaction to avoid race conditions
    await prisma.$transaction([
      prisma.user.update({ where: { id: tokenRecord.userId }, data: { emailVerified: true } }),
      prisma.emailVerificationToken.delete({ where: { id: tokenRecord.id } })
    ]);

    return NextResponse.redirect(new URL(`/auth/verify-success`, APP_URL));
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL(`/auth/verify-failed?reason=error`, APP_URL));
  }
}
