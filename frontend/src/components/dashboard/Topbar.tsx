import { Bell, Search, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { AuthModal } from "./AuthModal";
import { useState } from "react";

export function Topbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const user =
  typeof window !== "undefined"
    ? JSON.parse(
        localStorage.getItem("user") || "null"
      )
    : null;

  return (
    <header className="sticky top-0 z-30 px-6 lg:px-10 py-4 backdrop-blur-xl bg-background/40 border-b border-border/40">
    
    <div className="flex items-center justify-end gap-4">

  {/* SEARCH */}
  <div className="relative hidden md:block">

    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

    <input
      placeholder="Search inspections, drones, sites..."
      className="w-[420px] h-11 rounded-2xl bg-card/60 border border-border/60 pl-11 pr-14 outline-none focus:border-cyan transition-all"
    />

    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
      ⌘K
    </div>

  </div>

  {/* RIGHT SECTION */}
  {!user ? (

    <div className="flex items-center gap-4">

      <button
        onClick={() => setLoginOpen(true)}
        className="text-white font-medium hover:text-cyan-400 transition"
      >
        Login
      </button>

      <button
        onClick={() => setSignupOpen(true)}
        className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
      >
        Sign Up
      </button>

    </div>

  ) : (

    <div className="flex items-center gap-5">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl glass"
      >

        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

        <span className="text-xs font-mono uppercase tracking-[0.2em]">
          0 DRONES LIVE
        </span>

      </motion.div>

      <button className="relative h-11 w-11 rounded-2xl glass flex items-center justify-center">

        <Bell className="h-5 w-5" />

        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />

      </button>

      <div className="text-right hidden sm:block">

        <div className="text-sm font-semibold text-white">
          {user.name}
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Field Engineer
        </div>

      </div>

      <div
        className="h-11 w-11 rounded-2xl flex items-center justify-center text-sm font-bold text-black"
        style={{
          background: "var(--gradient-primary)"
        }}
      >
        {user.name.charAt(0)}
      </div>

    </div>

  )}

</div>

<AuthModal
  open={loginOpen}
  onClose={() => setLoginOpen(false)}
  mode="login"
/>

<AuthModal
  open={signupOpen}
  onClose={() => setSignupOpen(false)}
  mode="signup"
/>
    </header>
  );
}
