
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createAndSendVerificationEmail } from "@/lib/verification";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS ?? 12);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password, name } = req.body ?? {};

  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  try {
    // Normalize email
    const normalized = String(email).toLowerCase().trim();

    const exists = await prisma.user.findUnique({ where: { email: normalized } });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: normalized,
        name,
        passwordhashed: passwordHash
      }
    });

    
    try {
      await createAndSendVerificationEmail({ id: user.id, email: user.email, name: user.name ?? undefined });
    } catch (err) {
      
      console.error("Failed to send verification email", err);
    }

    return res.status(201).json({ ok: true, message: "User created. Check your email to verify your account." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
