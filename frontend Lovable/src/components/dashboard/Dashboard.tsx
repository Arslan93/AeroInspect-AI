import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Hero } from "./Hero";
import { StatsGrid } from "./StatsGrid";
import { UploadZone } from "./UploadZone";
import { AIProcessing } from "./AIProcessing";
import { InspectionResults } from "./InspectionResults";
import { Charts } from "./Charts";
import { Timeline } from "./Timeline";
import { ReportPanel } from "./ReportPanel";
import { HistoryPage } from "./HistoryPage";

import { useState } from "react";

export default function Dashboard() {
  const [results, setResults] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [activePage, setActivePage] = useState("overview");
  

  return (
    <div className="min-h-screen text-foreground">
      {/* Background */}
      <div
        className="pointer-events-none fixed inset-0 grid-bg"
        aria-hidden
      />

      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full bg-cyan/20 blur-[140px]"
        aria-hidden
      />

      <div
        className="pointer-events-none fixed top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-electric/20 blur-[160px]"
        aria-hidden
      />

      <div className="relative flex">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <div className="flex-1 min-w-0">
          <Topbar />

          <main className="px-6 lg:px-10 pb-20 space-y-10">
            {activePage === "overview" ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Hero />
                </motion.div>

                <StatsGrid />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    <UploadZone
                      setResults={setResults}
                      processing={processing}
                      setProcessing={setProcessing}
                      progress={progress}
                      setProgress={setProgress}
                      stage={stage}
                      setStage={setStage}
                    />

                    <AIProcessing
                      processing={processing}
                      progress={progress}
                      stage={stage}
                    />

                    <InspectionResults results={results} />
                  </div>

                  <div className="space-y-6">
                    <ReportPanel results={results} />
                    <Charts />
                  </div>
                </div>

                <Timeline />

                <footer className="pt-10 text-center text-xs text-muted-foreground">
                  <span className="font-mono">
                    AeroInspect AI
                  </span>{" "}
                  · Autonomous Infrastructure Intelligence ·
                  v4.2.0
                </footer>
              </>
            ) : (
              <HistoryPage history={results} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}