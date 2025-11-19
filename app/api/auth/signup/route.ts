import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createAndSendVerificationEmail } from "@/lib/verification";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS ?? 12);

export async function POST(request: Request) {
  try {
    type SignupBody = { email?: string; password?: string; name?: string };
    const body = (await request.json().catch(() => ({}))) as SignupBody;
    const { email, password, name } = body ?? {};

    if (!email || !password) return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });

    const normalized = String(email).toLowerCase().trim();

    const exists = await prisma.user.findUnique({ where: { email: normalized } });
    if (exists) return new Response(JSON.stringify({ error: "Email already in use" }), { status: 409 });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({ data: { email: normalized, name: name ?? "", passwordhashed: passwordHash } });

    let emailSent = false;
    try {
      await createAndSendVerificationEmail({ id: user.id, email: user.email, name: user.name ?? undefined });
      emailSent = true;
    } catch (err) {
      console.error("Failed to send verification email", err);
    }

    return new Response(JSON.stringify({ ok: true, message: "User created.", emailSent }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
