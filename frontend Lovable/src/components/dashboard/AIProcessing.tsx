import { motion } from "framer-motion";
import {
  Layers3,
  ScanSearch,
  ShieldAlert,
  Gauge,
  FileCheck,
} from "lucide-react";

interface Props {
  processing: boolean;
  progress: number;
  stage: string;
}

const pipeline = [
  {
    label: "Frame extraction",
    icon: Layers3,
  },
  {
    label: "Crack segmentation",
    icon: ScanSearch,
  },
  {
    label: "Severity scoring",
    icon: ShieldAlert,
  },
  {
    label: "Confidence calibration",
    icon: Gauge,
  },
  {
    label: "Report compilation",
    icon: FileCheck,
  },
];

export function AIProcessing({
  processing,
  progress,
  stage,
}: Props) {
  return (
    <section className="rounded-3xl border border-cyan-500/20 bg-white/[0.03] backdrop-blur-xl p-6 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            AI inference pipeline
          </h2>

          <p className="text-slate-400 mt-1">
            {processing
              ? stage
              : "System idle waiting for inspection"}
          </p>
        </div>

        <div className="text-5xl font-bold text-cyan-400">
          {progress}%
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6 h-3 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          className="h-full rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]"
        />
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mt-8">
        {pipeline.map((item, index) => {
          const Icon = item.icon;

          const active =
            progress >= (index + 1) * 20;

          return (
            <motion.div
              key={item.label}
              animate={{
                borderColor: active
                  ? "rgba(34,211,238,0.5)"
                  : "rgba(255,255,255,0.05)",
              }}
              className={`rounded-2xl p-5 border bg-white/[0.03] transition-all ${
                active
                  ? "shadow-[0_0_25px_rgba(34,211,238,0.15)]"
                  : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  active
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-white/5 text-slate-500"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="mt-4">
                <div className="font-semibold">
                  {item.label}
                </div>

                <div className="text-xs text-slate-400 mt-1">
                  {active
                    ? "Completed"
                    : "Waiting"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Logs */}
      <div className="mt-8 rounded-2xl bg-black/30 border border-white/5 p-5 font-mono text-sm text-cyan-300 space-y-2">
        <div>▶ Initializing AI inference engine...</div>
        <div>▶ GPU acceleration enabled</div>
        <div>▶ Model confidence threshold: 0.82</div>

        {processing && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            ▶ {stage}
          </motion.div>
        )}
      </div>
    </section>
  );
}