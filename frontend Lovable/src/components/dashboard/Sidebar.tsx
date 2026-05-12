import { motion } from "framer-motion";
import {
  LayoutDashboard, Plane, ScanSearch, FileBarChart, History,
  Settings, ShieldCheck, Sparkles
} from "lucide-react";

const items = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    page: "overview",
  },

  {
    icon: Plane,
    label: "Fleet",
    page: "fleet",
  },

  {
    icon: ScanSearch,
    label: "Inspections",
    page: "inspections",
  },

  {
    icon: FileBarChart,
    label: "Reports",
    page: "reports",
  },

  {
    icon: History,
    label: "History",
    page: "history",
  },

  {
    icon: ShieldCheck,
    label: "Compliance",
    page: "compliance",
  },

  {
    icon: Settings,
    label: "Settings",
    page: "settings",
  },
];

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Sidebar({
  activePage,
  setActivePage,
}: Props) {
  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 flex-col p-5 gap-6 border-r border-border/40 glass">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-xl flex items-center justify-center overflow-hidden"
             style={{ background: "var(--gradient-primary)" }}>
          <Plane className="h-5 w-5 text-primary-foreground rotate-45" />
          <div className="absolute inset-0 animate-shimmer" />
        </div>
        <div>
          <div className="font-display font-bold text-base leading-none">AeroInspect</div>
          <div className="text-[10px] tracking-[0.25em] text-cyan font-mono mt-1">AI · v4.2</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((it, i) => (
          <motion.button
  key={it.label}
  onClick={() => setActivePage(it.page)}
  whileHover={{ x: 4 }}
  initial={{ opacity: 0, x: -8 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.05 * i }}
  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
    activePage === it.page
      ? "bg-gradient-to-r from-cyan/15 to-electric/10 text-foreground gradient-border"
      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
  }`}
>
  <it.icon
    className={`h-4 w-4 ${
      activePage === it.page ? "text-cyan" : ""
    }`}
  />

  <span className="font-medium">{it.label}</span>

  {activePage === it.page && (
    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
  )}
</motion.button>
        ))}
      </nav>

      <div className="rounded-2xl p-4 glass-strong gradient-border relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-electric/30 blur-3xl" />
        <div className="flex items-center gap-2 text-cyan mb-1.5">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-mono uppercase tracking-wider">Pro Tier</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Unlock multi-drone swarms, LiDAR fusion & priority GPU inference.
        </p>
        <button
          className={`mt-3 w-full py-2 rounded-lg text-xs font-semibold text-primary-foreground`}
          style={{ background: "var(--gradient-primary)" }}
        >
          Upgrade
        </button>
        
      </div>
    </aside>
  );
}
