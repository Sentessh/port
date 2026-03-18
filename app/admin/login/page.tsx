"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ParticlesBackground from "@/app/components/Particles";

const inputClass = "bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none w-full mb-4 mt-4 focus:border-purple-500/80 focus:outline-none transition-colors duration-300 hover:border-purple-500/40";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
        <ParticlesBackground/>
      <form
        onSubmit={handleLogin}
        tabIndex={-1}
        className="flex flex-col bg-white/5 backdrop-blur-md border-2 border-purple-500/30 rounded-lg px-10 py-20 w-full max-w-[400] hover:scale-105 transition-transform duration-300"
        style={{ boxShadow: "0 0 10px #a855f7, 0 0 20px #a855f7" }}>
          <h1 className="text-center text-white text-2xl font-bold mb-6">Login</h1>
        <input
          autoComplete="off"
          className={inputClass}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          autoComplete="new-password"
          className={inputClass}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-purple-500 border border-purple-500/10 rounded-lg px-4 py-3 text-white mb-4 mt-10 hover:bg-transparent hover:text-purple-500 transition-colors duration-300 hover:border-purple-500/50"
        >
            Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </main>
  );
}