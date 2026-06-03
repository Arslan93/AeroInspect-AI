import { motion } from "framer-motion";
import { FileText, Download, Share2, Sparkles } from "lucide-react";

interface Props {
  results: any[];
}

export function ReportPanel({ results }: Props){
  const latest = results?.[results.length - 1];
  return (
    <section className="relative overflow-hidden rounded-2xl glass-strong gradient-border p-5">
      <div className="absolute -top-20 -right-10 h-44 w-44 rounded-full bg-electric/30 blur-[100px]" />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan">Auto-generated</div>
          <h3 className="font-display text-lg font-semibold mt-1">Inspection report</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono text-success bg-success/10">
          <Sparkles className="h-3 w-3" /> READY
        </div>
      </div>

      {/* PDF preview mock */}
      <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 relative rounded-xl overflow-hidden border border-border/40 bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
      >
      {latest ? (
      <div className="relative">
        {latest.type === "video" ? (
  <video
    src={latest.original}
    controls
    className="w-full h-[420px] object-cover"
    />
    ) : (
  <img
    src={latest.image}
    alt=""
    className="w-full h-[420px] object-cover"
    />
  )}

      {/* Severity */}
      <div
        className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-bold ${
          latest.severity === "HIGH"
            ? "bg-red-500 text-white"
            : latest.severity === "MEDIUM"
            ? "bg-yellow-400 text-black"
            : "bg-green-500 text-black"
        }`}
      >
        {latest.severity}
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-md p-4">
        <div className="text-sm font-semibold">
          {latest.name}
        </div>

        <div className="text-xs text-slate-300 mt-1">
          {latest.defects?.length || 0} defects detected
        </div>
        </div>
      </div>
    ) : (
    <div className="h-[420px] flex items-center justify-center text-slate-500">
      No inspection uploaded
      </div>
     )}
      </motion.div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
disabled={latest?.type === "video"}
onClick={() => {
  if (
    latest?.type !== "video" &&
    latest?.report
  ) {
    window.open(latest.report, "_blank");
  }
}}
className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
  latest?.type === "video"
    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
    : "text-primary-foreground glow"
}`}
style={
  latest?.type !== "video"
    ? { background: "var(--gradient-primary)" }
    : {}
}
>
<Download className="h-3.5 w-3.5" />

{latest?.type === "video"
  ? "Video Report Soon"
  : "PDF"}

</button>
        <button
        onClick={() => {
        if (latest?.image) {
        navigator.clipboard.writeText(latest.image);
        alert("Image link copied!");
        }
        }}
        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold glass hover:bg-white/10 transition-colors"
        >
      <Share2 className="h-3.5 w-3.5 text-cyan" />
  Share
</button>
      </div>
    </section>
  );
}
