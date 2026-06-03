import { motion } from "framer-motion";

interface Props {
  stage: string;
  progress: number;
}

export function ProcessingOverlay({
  stage,
  progress,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-cyan-500/20 bg-black/30 backdrop-blur-xl p-6 mt-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">
            AI inference pipeline
          </h3>

          <p className="text-slate-400 mt-1">
            {stage}
          </p>
        </div>

        <div className="text-4xl font-bold text-cyan-400">
          {progress}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-3 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        />
      </div>

      {/* Animated processing dots */}
      <div className="flex gap-3 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-4 h-4 rounded-full bg-cyan-400"
          />
        ))}
      </div>
    </motion.div>
  );
}