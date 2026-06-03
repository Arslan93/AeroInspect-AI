import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  originalImage: string;
  detectedImage: string;
}

export default function ImageModal({
  open,
  onClose,
  originalImage,
  detectedImage,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="relative w-full max-w-6xl rounded-3xl border border-cyan-500/20 bg-[#07182c] p-6">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white"
        >
          <X size={28} />
        </button>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">
            AI Inspection Comparison
          </h2>

          <p className="text-cyan-300/70 mt-2">
            Original vs AI detected output
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
            <div className="px-4 py-3 border-b border-white/10">
              <h3 className="text-white font-semibold">
                Original Image
              </h3>
            </div>

            <img
              src={originalImage}
              alt="Original"
              className="w-full h-[500px] object-contain bg-black"
            />
          </div>

          <div className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/20">
            <div className="px-4 py-3 border-b border-cyan-500/20">
              <h3 className="text-cyan-300 font-semibold">
                AI Detection Output
              </h3>
            </div>

            <img
              src={detectedImage}
              alt="Detected"
              className="w-full h-[500px] object-contain bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}