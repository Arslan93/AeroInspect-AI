import { motion } from "framer-motion";
import { ArrowRight, Play, Radar } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl glass-strong gradient-border p-8 lg:p-12">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-electric/30 blur-[120px]" />
      <div className="absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-cyan/30 blur-[120px]" />

      <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-[0.2em] text-cyan"
          >
            <Radar className="h-3.5 w-3.5" /> Live Mission · Hoover Dam Pylon 14
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]"
          >
            See every <span className="gradient-text">crack</span> before<br />
            it becomes a <span className="gradient-text">catastrophe</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="mt-5 text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Autonomous drones. Vision-language AI. Sub-millimeter defect detection across bridges,
            wind turbines, pipelines and power grids — all in a single mission report.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-primary-foreground glow hover:glow-strong transition-all"
                    style={{ background: "var(--gradient-primary)" }}>
              Launch new inspection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium glass hover:bg-white/10 transition-colors">
              <Play className="h-4 w-4 text-cyan" />
              Watch live feed
            </button>
            <div className="flex items-center gap-3 ml-2 text-xs text-muted-foreground font-mono">
              <span>SOC2</span><span>·</span><span>FAA Part 107</span><span>·</span><span>ISO 27001</span>
            </div>
          </motion.div>
        </div>

        {/* Animated radar / drone visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="relative aspect-square max-w-sm mx-auto w-full"
        >
          <div className="absolute inset-0 rounded-full border border-cyan/30" />
          <div className="absolute inset-6 rounded-full border border-cyan/20" />
          <div className="absolute inset-12 rounded-full border border-cyan/15" />
          <div className="absolute inset-20 rounded-full border border-cyan/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{ background: "conic-gradient(from 0deg, transparent 0deg, var(--cyan-glow) 60deg, transparent 120deg)" , maskImage: "radial-gradient(circle, transparent 30%, black 70%)" }}
          />
          {/* center drone */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-24 w-24 rounded-2xl glass-strong gradient-border flex items-center justify-center animate-pulse-glow"
            >
              <svg viewBox="0 0 64 64" className="h-12 w-12 text-cyan">
                <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="14" cy="14" r="6" />
                  <circle cx="50" cy="14" r="6" />
                  <circle cx="14" cy="50" r="6" />
                  <circle cx="50" cy="50" r="6" />
                  <line x1="14" y1="14" x2="50" y2="50" />
                  <line x1="50" y1="14" x2="14" y2="50" />
                  <rect x="26" y="26" width="12" height="12" rx="3" fill="currentColor" opacity="0.3" />
                </g>
              </svg>
            </motion.div>
          </div>
          {/* dots */}
          {[
            { t: "12%", l: "70%", c: "danger" },
            { t: "70%", l: "20%", c: "warning" },
            { t: "55%", l: "78%", c: "cyan" },
            { t: "30%", l: "18%", c: "success" },
          ].map((d, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="absolute h-2.5 w-2.5 rounded-full"
              style={{ top: d.t, left: d.l, background: `var(--${d.c})`, boxShadow: `0 0 16px var(--${d.c})` }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
