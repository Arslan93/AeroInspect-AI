import { motion } from "framer-motion";
import { Activity, AlertTriangle, ScanSearch, Zap } from "lucide-react";

const stats = [
  { label: "Inspections this week", value: "1,284", delta: "+18.4%", trend: "up", icon: ScanSearch, accent: "cyan" },
  { label: "Critical defects flagged", value: "37", delta: "-9.1%", trend: "down", icon: AlertTriangle, accent: "danger" },
  { label: "Avg. AI confidence", value: "97.6%", delta: "+0.8 pts", trend: "up", icon: Zap, accent: "electric" },
  { label: "Drone uptime", value: "99.92%", delta: "Operational", trend: "up", icon: Activity, accent: "success" },
];

function Sparkline({ color }: { color: string }) {
  const points = [12, 14, 10, 18, 16, 22, 19, 26, 24, 30, 28, 34];
  const max = Math.max(...points);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * 100} ${40 - (p / max) * 36}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 40" className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={`var(--${color})`} stopOpacity="0.4" />
          <stop offset="100%" stopColor={`var(--${color})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L 100 40 L 0 40 Z`} fill={`url(#sg-${color})`} />
      <path d={path} fill="none" stroke={`var(--${color})`} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StatsGrid() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-2xl p-5 glass gradient-border"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
              <div className="mt-2 text-3xl font-display font-bold tracking-tight">{s.value}</div>
            </div>
            <div className="h-9 w-9 rounded-lg flex items-center justify-center"
                 style={{ background: `color-mix(in oklab, var(--${s.accent}) 15%, transparent)`, color: `var(--${s.accent})` }}>
              <s.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className={`text-xs font-mono ${s.trend === "up" ? "text-success" : "text-danger"}`}>{s.delta}</div>
            <div className="flex-1 max-w-[60%]"><Sparkline color={s.accent} /></div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
