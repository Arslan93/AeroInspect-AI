import { motion } from "framer-motion";

interface Props {
  history: any[];
}

export function HistoryPage({ history }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Inspection History
        </h1>

        <p className="text-muted-foreground mt-2">
          Previously analyzed infrastructure inspections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {history.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden glass border border-cyan-500/20"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-white truncate">
                  {item.name}
                </h2>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    item.severity === "HIGH"
                      ? "bg-red-500 text-white"
                      : item.severity === "MEDIUM"
                      ? "bg-yellow-500 text-black"
                      : "bg-cyan-500 text-black"
                  }`}
                >
                  {item.severity}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {item.defects?.[0]}
              </p>

              <div className="text-xs text-muted-foreground">
                {item.date}
              </div>

              <a
                href={item.report}
                target="_blank"
                className="inline-block w-full text-center rounded-xl bg-cyan-500 text-black font-semibold py-2 hover:opacity-90"
              >
                Open Report
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}