import { motion } from "framer-motion";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";

const trend = [
  { d: "Mon", detected: 24, critical: 4 },
  { d: "Tue", detected: 31, critical: 6 },
  { d: "Wed", detected: 28, critical: 3 },
  { d: "Thu", detected: 42, critical: 8 },
  { d: "Fri", detected: 51, critical: 7 },
  { d: "Sat", detected: 38, critical: 5 },
  { d: "Sun", detected: 47, critical: 9 },
];

const confidence = [{ name: "conf", value: 97.6, fill: "var(--cyan)" }];

export function Charts() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl glass p-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-display font-semibold">Defect detections</h3>
            <p className="text-[11px] text-muted-foreground font-mono">last 7 days</p>
          </div>
          <div className="flex gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cyan" />ALL</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-danger" />CRIT</span>
          </div>
        </div>
        <div className="h-44">
          <ResponsiveContainer>
            <AreaChart data={trend} margin={{ top: 10, left: -20, right: 6, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                cursor={{ stroke: "var(--cyan)", strokeOpacity: 0.4 }}
              />
              <Area type="monotone" dataKey="detected" stroke="var(--cyan)" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="critical" stroke="var(--danger)" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl glass p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold">Model confidence</h3>
            <p className="text-[11px] text-muted-foreground font-mono">global avg · rolling</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-3xl font-display font-bold gradient-text"
          >
            97.6%
          </motion.div>
        </div>
        <div className="h-40 -mt-2">
          <ResponsiveContainer>
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={confidence} startAngle={210} endAngle={-30}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background={{ fill: "var(--muted)" }} dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center -mt-6">
          {[
            { l: "Precision", v: "0.984" },
            { l: "Recall", v: "0.961" },
            { l: "F1", v: "0.972" },
          ].map((m) => (
            <div key={m.l} className="rounded-lg bg-white/[0.03] py-2">
              <div className="text-[10px] text-muted-foreground font-mono uppercase">{m.l}</div>
              <div className="text-sm font-semibold text-cyan font-mono">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
