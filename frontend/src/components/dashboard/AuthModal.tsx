import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: "login" | "signup";
}

export function AuthModal({
  open,
  onClose,
  mode,
}: Props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {

    const endpoint =
      mode === "signup"
        ? "signup"
        : "login";

    const body =
      mode === "signup"
        ? { name, email, password }
        : { email, password };

    const response = await fetch(
      `http://127.0.0.1:8000/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/70 pt-32 px-4">

      <div className="relative overflow-hidden bg-[#07111f]/95 backdrop-blur-2xl p-8 rounded-[32px] w-[440px] border border-cyan-500/20 shadow-[0_0_80px_rgba(0,255,255,0.08)]">
        <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
        <span className="text-3xl text-cyan-300">
        ✦
        </span>
        </div>


        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">

          {mode === "signup"
            ? "Create Account"
            : "Login"}

        </h2>
        <p className="text-slate-400 text-sm mb-8">
        Access your AI drone inspection workspace
        </p>

        <div className="space-y-4">

          {mode === "signup" && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(0,255,255,0.12)]"
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(0,255,255,0.12)]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(0,255,255,0.12)]"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl text-black text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,255,255,0.35)]"
          >
            {mode === "signup"
              ? "Sign Up"
              : "Login"}
          </button>

          <button
            onClick={onClose}
            style={{
            background:
            "linear-gradient(135deg,#00e5ff,#00bfff)",
          }}
            className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}