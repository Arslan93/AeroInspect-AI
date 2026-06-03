import { useState } from "react";

export function Login({ setUser }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch(
      "http://127.0.0.1:8000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      setUser(data);
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817]">
      <div className="w-full max-w-md glass p-8 rounded-3xl space-y-5">
        <h1 className="text-3xl font-bold text-white">
          Login
        </h1>

        <input
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-black/30"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-black/30"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}