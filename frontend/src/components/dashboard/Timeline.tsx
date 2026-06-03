import { motion } from "framer-motion";
import { Plane, Brain, FileText, ShieldAlert, CheckCircle2 } from "lucide-react";

const events = [
  { time: "09:42", title: "Mission deployed", desc: "Drone Nexus-3 launched · Hoover Dam grid", icon: Plane, color: "cyan" },
  { time: "09:58", title: "Footage uplinked", desc: "184 GB · 4K + thermal · encrypted", icon: CheckCircle2, color: "success" },
  { time: "10:11", title: "AI inference complete", desc: "8,412 frames analyzed · 37 defects flagged", icon: Brain, color: "electric" },
  { time: "10:14", title: "Critical anomaly", desc: "Pylon 14 · longitudinal crack · severity 4.6", icon: ShieldAlert, color: "danger" },
  { time: "10:18", title: "Report generated", desc: "PDF · 42 pages · routed to ops & compliance", icon: FileText, color: "cyan" },
];

export function Timeline() {
  return (
    <section className="rounded-2xl glass-strong gradient-border p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute -top-20 left-1/3 h-48 w-48 rounded-full bg-cyan/15 blur-[100px]" />
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold">Mission timeline</h2>
          <p className="text-xs text-muted-foreground mt-1">Today · Hoover Dam Inspection · Op #2419</p>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan">live · auto-refresh 5s</div>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/40 via-electric/30 to-transparent hidden md:block" />
        <ul className="space-y-6">
          {events.map((e, i) => {
            const right = i % 2 === 1;
            return (
              <motion.li
                key={e.time}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="md:grid md:grid-cols-2 md:gap-10 relative"
              >
                <div className={`hidden md:block ${right ? "order-1" : ""}`} />
                <div className={`relative ${right ? "md:order-0" : ""}`}>
                  <div className={`md:absolute md:top-2 ${right ? "md:-left-[27px]" : "md:-right-[27px]"} hidden md:flex`}>
                    <div className="h-3.5 w-3.5 rounded-full ring-4 ring-background"
                         style={{ background: `var(--${e.color})`, boxShadow: `0 0 16px var(--${e.color})` }} />
                  </div>
                  <div className="rounded-xl glass p-4 hover:border-cyan/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg flex items-center justify-center"
                           style={{ background: `color-mix(in oklab, var(--${e.color}) 15%, transparent)`, color: `var(--${e.color})` }}>
                        <e.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{e.title}</div>
                        <div className="text-[11px] text-muted-foreground">{e.desc}</div>
                      </div>
                      <div className="text-[11px] font-mono text-cyan">{e.time}</div>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
