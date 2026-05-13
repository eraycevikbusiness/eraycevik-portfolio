import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { isLocale, type Locale } from "@/lib/i18n/config";

const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const COOKIE = "contact_sent";

const subjectFallback: Record<Locale, string> = {
  de: "Portfolio · Neue Anfrage",
  en: "Portfolio · New inquiry",
  tr: "Portföy · Yeni talep",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHeader(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

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

  const { name, email, subject, message, lang } = body;

  if (!name?.trim()) return NextResponse.json({ error: "missing_name" }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email ?? "")) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  if ((message ?? "").trim().length < 10) return NextResponse.json({ error: "message_too_short" }, { status: 400 });

  const safeName = sanitizeHeader(name).slice(0, 120);
  const safeEmail = sanitizeHeader(email);
  const safeSubject = subject ? sanitizeHeader(subject).slice(0, 200) : "";
  const locale: Locale = isLocale(lang ?? "") ? (lang as Locale) : "de";
  const finalSubject = safeSubject || subjectFallback[locale];

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
    from: { name: "Portfolio Contact", address: smtpUser },
    to: "eray.cevik.business@gmail.com",
    replyTo: { name: safeName, address: safeEmail },
    subject: finalSubject,
    text: `${message}\n\n— ${safeName} <${safeEmail}>`,
    html: `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p><hr><p><small>${escapeHtml(safeName)} &lt;${escapeHtml(safeEmail)}&gt;</small></p>`,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, String(Date.now()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOLDOWN_MS / 1000, // 1 hour in seconds
    path: "/",
  });
  return res;
}
