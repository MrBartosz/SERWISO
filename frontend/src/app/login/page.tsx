"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setError("");
      router.push("/dashboard");
    } else {
      setError("Nieprawidłowy login lub hasło");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md p-8 border shadow-xl rounded-2xl bg-elevated border-border"
    >
      <h1 className="mb-6 text-center font-ethnocentric text-big text-accent">
        SERWISO
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <label className="block mb-1 text-sm font-medium text-muted">
            Nazwa użytkownika
          </label>
          <div className="relative">
            <User className="absolute w-5 h-5 left-3 top-3 text-muted" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Wprowadź login"
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-surface border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block mb-1 text-sm font-medium text-muted">
            Hasło
          </label>
          <div className="relative">
            <Lock className="absolute w-5 h-5 left-3 top-3 text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full py-2 pl-10 pr-10 text-sm border rounded-lg bg-surface border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted hover:text-foreground transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <motion.div
            className="text-sm text-center text-error"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-2 font-semibold text-white transition rounded-lg shadow-md bg-accent hover:bg-accentHover"
        >
          Zaloguj
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-muted">
        Dostęp tylko dla uprawnionych użytkowników systemu SERWISO
      </p>
    </motion.div>
  );
}
