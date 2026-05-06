"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

const socials = [
  { icon: <Mail size={18} />, label: "E-Mail", value: "eray.kaan.private07@gmail.com", href: "mailto:eray.kaan.private07@gmail.com" },
  { icon: <GithubIcon size={18} />, label: "GitHub", value: "github.com/eraykaan", href: "https://github.com" },
  { icon: <LinkedinIcon size={18} />, label: "LinkedIn", value: "linkedin.com/in/eraykaan", href: "https://linkedin.com" },
  { icon: <XIcon size={18} />, label: "Twitter / X", value: "@eraykaan_dev", href: "https://x.com" },
];

function GlowInput({ label, id, type = "text", placeholder, textarea = false }: {
  label: string; id: string; type?: string; placeholder: string; textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative group">
      <label htmlFor={id} className="block text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: focused
              ? "0 0 0 1px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.1)"
              : "0 0 0 1px rgba(255,255,255,0.08)",
          }}
          transition={{ duration: 0.2 }}
        />
        <Tag
          id={id}
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={textarea ? 5 : undefined}
          className={cn(
            "w-full bg-[#0a0a0a] rounded-xl px-4 py-3.5 text-white text-sm",
            "placeholder-neutral-600",
            "border border-transparent outline-none resize-none font-[inherit]",
            "transition-colors duration-200"
          )}
        />
      </div>
    </div>
  );
}

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-violet-600/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.p variants={itemVariants} className="font-mono text-violet-400 text-sm tracking-widest uppercase mb-4">
            {t.contact.label}
          </motion.p>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            {t.contact.title1}<br />
            <span className="bg-linear-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text" }}>
              {t.contact.title2}
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-neutral-500 text-lg mb-20 max-w-lg">
            {t.contact.subtitle}
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <GlowInput id="name" label={t.contact.name} placeholder={t.contact.namePlaceholder} />
                <GlowInput id="email" label={t.contact.email} type="email" placeholder={t.contact.emailPlaceholder} />
              </div>
              <GlowInput id="subject" label={t.contact.subject} placeholder={t.contact.subjectPlaceholder} />
              <GlowInput id="message" label={t.contact.message} placeholder={t.contact.messagePlaceholder} textarea />

              <motion.button
                type="submit"
                disabled={loading || sent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden",
                  sent
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                    : "bg-violet-600 hover:bg-violet-500 text-white"
                )}
              >
                {!sent && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                    animate={{ translateX: ["−100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                )}
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />
                ) : sent ? t.contact.sent : <>{t.contact.send} <Send size={15} /></>}
              </motion.button>
            </motion.form>

            <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-4">
              {socials.map(({ icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-[#080808] hover:border-violet-500/30 group transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors shrink-0">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-neutral-600 uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-neutral-300 group-hover:text-white transition-colors truncate">{value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
