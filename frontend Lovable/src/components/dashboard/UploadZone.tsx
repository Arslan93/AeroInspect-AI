import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { UploadCloud, FileVideo, FileImage, MapPin, X } from "lucide-react";
import ImageModal from "./ImageModal";
import { ProcessingOverlay } from "./ProcessingOverlay";

interface Props {
  setResults: any;

  processing: boolean;

  setProcessing: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  progress: number;

  setProgress: React.Dispatch<
    React.SetStateAction<number>
  >;

  stage: string;

  setStage: React.Dispatch<
    React.SetStateAction<string>
  >;
}

export function UploadZone({
  setResults,
  processing,
  setProcessing,
  progress,
  setProgress,
  stage,
  setStage,
}: Props) {

  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedOriginal, setSelectedOriginal] = useState("");
  const handleUpload = async (files: FileList | null) => {

    setProcessing(true);

    setStage("Uploading inspection data...");
    setProgress(15);

    await new Promise((r) => setTimeout(r, 700));

    setStage("Running AI defect detection...");
    setProgress(45);

    await new Promise((r) => setTimeout(r, 900));

    setStage("Analyzing structural anomalies...");
    setProgress(72);

    await new Promise((r) => setTimeout(r, 800));

    setStage("Generating inspection report...");
    setProgress(90);
    if (!files) return;

    setUploading(true);

  const newFiles = [];

  for (const file of Array.from(files)) {
    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload?model=custom",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      newFiles.push({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        image: data.result?.image,
        original: URL.createObjectURL(file),
        defects: data.result?.defects,
        severity: data.result?.severity,
        report: data.report,
      });

    } catch (error) {
      console.error(error);
    }
  }

  setUploadedFiles(newFiles);

  setUploading(false);

  setResults(newFiles);

  setProgress(100);

  setStage("Inference completed");

  setTimeout(() => {
  setProcessing(false);
  }, 1200);
};



  return (
  <>  
    <section className="rounded-2xl glass p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-xl font-semibold">Mission ingest</h2>
          <p className="text-xs text-muted-foreground mt-1">Drop drone footage, thermal passes & flight paths.</p>
        </div>
        <div className="text-[10px] font-mono uppercase text-cyan tracking-[0.2em] flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> Encrypted
        </div>
      </div>

      <motion.label
        onDragOver={(e) => { e.preventDefault(); setHover(true); }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        handleUpload(e.dataTransfer.files);
        }}
        animate={{ borderColor: hover ? "var(--cyan)" : "color-mix(in oklab, var(--cyan) 25%, transparent)" }}
        className="relative block cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center overflow-hidden transition-colors"
        style={{ background: "color-mix(in oklab, var(--cyan) 4%, transparent)" }}
      >
        <input
          type="file"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
        />
        <motion.div
          animate={{ y: hover ? -6 : 0 }}
          className="relative inline-flex flex-col items-center gap-3"
        >
          <div className="relative h-16 w-16 rounded-2xl flex items-center justify-center animate-pulse-glow"
               style={{ background: "var(--gradient-primary)" }}>
            <UploadCloud className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <div className="text-base font-semibold">Drop files or <span className="gradient-text">browse</span></div>
            <div className="text-xs text-muted-foreground mt-1 font-mono">MP4 · MOV · TIF · DNG · KML · up to 8 GB</div>
          </div>
        </motion.div>

        {hover && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-x-0 top-0 h-px scan-line animate-scan"
          />
        )}
      </motion.label>

      <div className="mt-5 space-y-2">
        {uploadedFiles.map((it, i) => {
          const Icon = FileImage;
          return (
            <motion.div
              key={it.name + i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass group"
            >
              <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-cyan/10 text-cyan">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
              
                <button
                onClick={() => {
                setSelectedImage(it.image);
                setSelectedOriginal(it.original);
                setPreviewOpen(true);
                }}
                className="font-medium text-white hover:text-cyan-400 transition text-left"
                >
                {it.name}
                </button>
                <div className="text-[10px] font-mono text-muted-foreground">{it.size} · uploaded</div>
              </div>
      
              <button
                onClick={() =>
                setUploadedFiles((p) => p.filter((_, idx) => idx !== i))
                }
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-danger"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
  
    </section>
    <ImageModal
    open={previewOpen}
    onClose={() => setPreviewOpen(false)}
    originalImage={selectedOriginal}
    detectedImage={selectedImage}
    />
  </>  
  );
}
