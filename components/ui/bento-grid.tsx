"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BentoGrid({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({ className, title, description, header, icon }: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative rounded-2xl border border-white/8 bg-[#0a0a0a] p-6 flex flex-col space-y-4 overflow-hidden",
        "hover:border-violet-500/30 transition-colors duration-300",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(139,92,246,0.06), transparent 50%)" }}
      />
      {header}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-violet-400">{icon}</span>}
          <p className="font-semibold text-white text-sm">{title}</p>
        </div>
        <p className="text-neutral-400 text-xs leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
