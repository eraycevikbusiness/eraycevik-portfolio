import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const COOKIE = "contact_sent";

export async function POST(req: NextRequest) {
  // Cookie-based rate limit — works across serverless restarts
  const lastSent = req.cookies.get(COOKIE)?.value;
  if (lastSent && Date.now() - Number(lastSent) < COOLDOWN_MS) {
    const retryAt = Number(lastSent) + COOLDOWN_MS;
    return NextResponse.json({ error: "rate_limited", retryAt }, { status: 429 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field, humans leave it empty
  if (body.website) {
    return NextResponse.json({ ok: true }); // silently discard
  }

  const { name, email, subject, message } = body;

  if (!name?.trim()) return NextResponse.json({ error: "missing_name" }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email ?? "")) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  if ((message ?? "").trim().length < 10) return NextResponse.json({ error: "message_too_short" }, { status: 400 });

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER / SMTP_PASS not configured");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${smtpUser}>`,
    to: "eray.cevik.business@gmail.com",
    replyTo: `"${name}" <${email}>`,
    subject: subject?.trim() || "Portfolio · Neue Anfrage",
    text: `${message}\n\n— ${name} <${email}>`,
    html: `<p>${message.replace(/\n/g, "<br>")}</p><hr><p><small>${name} &lt;${email}&gt;</small></p>`,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, String(Date.now()), {
    httpOnly: true,
    sameSite: "strict",
    maxAge: COOLDOWN_MS / 1000, // 1 hour in seconds
    path: "/",
  });
  return res;
}
