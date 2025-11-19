import { prisma } from "@/lib/prisma";
import { createAndSendVerificationEmail } from "@/lib/verification";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as Record<string, unknown>));
    const rawEmail = (body as Record<string, unknown>).email;
    const email = typeof rawEmail === "string" ? rawEmail : undefined;
    if (!email) return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });

    const normalized = String(email).toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalized } });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    if (user.emailVerified) return new Response(JSON.stringify({ ok: true, message: "Already verified" }));

    try {
      await createAndSendVerificationEmail({ id: user.id, email: user.email, name: user.name ?? undefined });
      return new Response(JSON.stringify({ ok: true, message: "Verification email sent" }));
    } catch (err) {
      console.error("Failed to send verification email", err);
      return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
