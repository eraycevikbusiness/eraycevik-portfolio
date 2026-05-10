"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";

function AuroraBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <div className="absolute -top-40 left-1/2 h-150 w-250 -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "conic-gradient(from 90deg at 50% 50%, #6d28d9, #a78bfa, #e879f9, #67e8f9, #6d28d9)" }} />
      <div className="absolute -bottom-40 left-1/3 h-100 w-175 rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
    </div>
  );
}

export function ContactSection() {
  const t = useT().contact;
  const [data, setData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData(d => ({ ...d, [k]: e.target.value }));
  const touch = (k: string) => () => setTouched(x => ({ ...x, [k]: true }));

  const errors = {
    name:    !data.name.trim() ? t.err_name : "",
    email:   !/^\S+@\S+\.\S+$/.test(data.email) ? t.err_email : "",
    message: data.message.trim().length < 10 ? t.err_message : "",
  };
  const valid = !errors.name && !errors.email && !errors.message;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!valid) return;
    setStatus("sending");
    const to = "eray.cevik.business@gmail.com";
    const subj = encodeURIComponent(data.subject || "Portfolio · Anfrage");
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} <${data.email}>`);
    setTimeout(() => {
      window.location.href = `mailto:${to}?subject=${subj}&body=${body}`;
      setStatus("sent");
    }, 800);
  };

  const channels = [
    { label: t.labels.github,   value: "github.com/Eray594",       href: "https://github.com/Eray594" },
    { label: t.labels.linkedin, value: "linkedin.com/in/eraykaan", href: "https://linkedin.com/in/eraykaan" },
    { label: t.labels.twitter,  value: "@eraykaan_dev",            href: "https://x.com/eraykaan_dev" },
  ];

  const inputCls = "w-full rounded-xl border border-white/10 bg-ink-100/60 px-4 py-3.5 text-[15px] text-white placeholder:text-white/25 outline-none transition focus:border-accent-violet/50 focus:bg-ink-100";

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
      <div className="mb-14 md:mb-20 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-white/20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{t.eyebrow}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-4xl text-5xl font-medium tracking-tight text-white md:text-7xl"
        >
          {t.title1} <span className="font-serif italic text-white/70">{t.title2}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl text-base text-white/55 md:text-lg"
        >
          {t.sub}
        </motion.p>
      </div>

      <div className="grid gap-10 md:grid-cols-12">
        {/* Form */}
        <div className="md:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-50/60 p-6 md:p-8">
            <AuroraBg />
            <form onSubmit={submit} className="relative space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">{t.f_name}</span>
                    {touched.name && errors.name && <span className="font-mono text-[10px] text-white/30">· {errors.name}</span>}
                  </div>
                  <input value={data.name} onChange={set("name")} onBlur={touch("name")} placeholder={t.ph_name} className={inputCls} />
                </label>
                <label className="block">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">{t.f_email}</span>
                    {touched.email && errors.email && <span className="font-mono text-[10px] text-white/30">· {errors.email}</span>}
                  </div>
                  <input type="email" value={data.email} onChange={set("email")} onBlur={touch("email")} placeholder={t.ph_email} className={inputCls} />
                </label>
              </div>

              <label className="block">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">{t.f_subject}</span>
                  <span className="font-mono text-[10px] text-white/30">{t.hint_optional}</span>
                </div>
                <input value={data.subject} onChange={set("subject")} placeholder={t.ph_subject} className={inputCls} />
              </label>

              <label className="block">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">{t.f_message}</span>
                  <span className="font-mono text-[10px] text-white/30">
                    {touched.message && errors.message ? `· ${errors.message}` : data.message.length}
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={data.message}
                  onChange={set("message")}
                  onBlur={touch("message")}
                  placeholder={t.ph_message}
                  className={`${inputCls} resize-none`}
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="font-mono text-[11px] text-white/35">{t.reply}</div>
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition disabled:opacity-90"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "idle" && (
                      <motion.span key="i" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="flex items-center gap-2">
                        {t.send}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                          <path d="M2 7h10m0 0L8 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </motion.span>
                    )}
                    {status === "sending" && (
                      <motion.span key="s" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        {t.sending}
                      </motion.span>
                    )}
                    {status === "sent" && (
                      <motion.span key="d" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 text-emerald-700">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7.5L5.5 11L12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {t.sent}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Channels */}
        <div className="md:col-span-5 space-y-3">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-ink-100/40 p-5 transition hover:border-white/25 hover:bg-white/4"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{c.label}</div>
                <div className="mt-1.5 text-[15px] text-white/85">{c.value}</div>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/30 group-hover:text-white">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.a>
          ))}

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-100/30 p-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <div className="text-sm text-white/70">
              {t.avail[0]} <span className="text-white">{t.avail[1]}</span> {t.avail[2]} <span className="text-white">{t.avail[3]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
