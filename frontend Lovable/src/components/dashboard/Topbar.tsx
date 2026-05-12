import { Bell, Search, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 px-6 lg:px-10 py-4 backdrop-blur-xl bg-background/40 border-b border-border/40">
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-3">
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium text-cyan-300 hover:text-white transition">
          Login
        </Link>

        <Link
          to="/signup"
          className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition">
          Sign Up
        </Link>
      </div>


        <div className="lg:hidden flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Plane className="h-4 w-4 text-primary-foreground rotate-45" />
          </div>
          <span className="font-display font-bold">AeroInspect</span>
        </div>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search inspections, drones, sites…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan/40"
          />
          <kbd className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-6 px-1.5 items-center text-[10px] font-mono text-muted-foreground rounded border border-border bg-muted/50">⌘K</kbd>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-xs font-mono text-muted-foreground">3 DRONES LIVE</span>
          </motion.div>

          <button className="relative h-10 w-10 rounded-xl glass flex items-center justify-center hover:text-cyan transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-border/40">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium leading-tight">Maya Chen</div>
              <div className="text-[10px] text-muted-foreground font-mono">FIELD ENGINEER</div>
            </div>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center font-display font-bold text-primary-foreground"
                 style={{ background: "var(--gradient-primary)" }}>
              MC
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
