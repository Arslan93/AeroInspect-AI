import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, ShieldAlert, ShieldCheck, ShieldHalf } from "lucide-react";
import { useState } from "react";
import ImageModal from "./ImageModal";

type Result = {
  id: string;
  asset: string;
  location: string;
  defect: string;
  severity: "Critical" | "Moderate" | "Low";
  confidence: number;
  thumb: string;
};

const results: Result[] = [
  { id: "INS-2419", asset: "Pylon 14 — North Face", location: "Hoover Dam · NV", defect: "Longitudinal crack · 38cm", severity: "Critical", confidence: 98.7, thumb: "from-rose-500/40 to-amber-500/30" },
  { id: "INS-2418", asset: "Turbine #07 Blade B", location: "North Sea Array", defect: "Leading edge erosion", severity: "Moderate", confidence: 94.2, thumb: "from-cyan-400/40 to-blue-600/30" },
  { id: "INS-2417", asset: "Span 4 Underdeck", location: "Verrazzano Bridge", defect: "Spalling · 12cm²", severity: "Moderate", confidence: 91.8, thumb: "from-emerald-400/30 to-cyan-500/30" },
  { id: "INS-2416", asset: "Substation E-22", location: "Phoenix Grid · AZ", defect: "Surface oxidation", severity: "Low", confidence: 88.5, thumb: "from-violet-500/30 to-blue-500/30" },
];

const sevConfig = {
  Critical: { icon: ShieldAlert, color: "danger" },
  Moderate: { icon: ShieldHalf, color: "warning" },
  Low: { icon: ShieldCheck, color: "success" },
} as const;

interface Props {
  results: any[];
}

export function InspectionResults({ results }: Props) {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  return (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {results.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl border border-cyan-500/20 bg-white/5 p-4 backdrop-blur-xl"
        >
          <img
            src={item.image}
            alt=""
            className="rounded-2xl w-full"
          />

          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {item.name}
            </h2>

            <span
              className={`px-4 py-1 rounded-full text-sm ${
                item.severity === "HIGH"
                  ? "bg-red-500/20 text-red-400"
                  : item.severity === "MEDIUM"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {item.severity}
            </span>
          </div>

          <p className="text-slate-400 mt-2">
            {item.defects?.join(", ")}
          </p>

          <div className="mt-5 flex gap-3">

          <a
          href={item.report}
          target="_blank"
          className="rounded-xl bg-cyan-500 px-5 py-2 text-black font-semibold"
          >
          Download Report
          </a>

          <button
          onClick={() => {
          setSelectedImage(item.image);
          setPreviewOpen(true);
          }}
          className="rounded-xl border border-cyan-500/30 px-5 py-2 text-cyan-300"
          >
          View Details
    </button>

    </div>
        </div>
      ))}
    </div>
    <ImageModal
      open={previewOpen}
      onClose={() => setPreviewOpen(false)}
      originalImage={selectedImage}
      detectedImage={selectedImage}
    />
</>
);
}