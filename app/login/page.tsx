"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Expanded SQLi regex matches for the CTF
    const sqliPatterns = [
      /('|").*\s*OR\s*.+(=|LIKE).+/i,                     // OR tautologies (e.g. ' OR 1=1, " OR "a"="a")
      /('|")\s*(--|#|\/\*)/i,                             // Comment injections (e.g. admin' --)
      /\bUNION\s+(ALL\s+)?SELECT\b/i,                     // UNION queries
      /;\s*(DROP|INSERT|UPDATE|DELETE|SLEEP|WAITFOR)\b/i, // Stacked queries & blind SQLi
      /('|")\s*OR\s+true\b/i                              // Boolean OR true
    ];

    const isSqli = sqliPatterns.some(pattern => pattern.test(username) || pattern.test(password));

    if (isSqli) {
      router.push("/dashboard");
    } else {
      setError("Access Denied: Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md border border-green-500 p-6 rounded-sm bg-black/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
        <div className="flex items-center gap-3 mb-8 border-b border-green-500/50 pb-4">
          <Terminal size={28} />
          <h1 className="text-2xl tracking-widest font-bold">SECURE_GATE_v2.1</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm">USER_ID:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-green-500/50 p-2 outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-green-400 transition-colors"
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">AUTH_KEY:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-green-500/50 p-2 outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-green-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full border border-green-500 hover:bg-green-500 hover:text-black py-2 font-bold transition-all duration-200"
          >
            [ EXECUTE LOGIN ]
          </button>

          {error && (
            <div className="mt-4 text-red-500 animate-pulse text-center">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Clue */}
      <div className="mt-12 text-green-400 text-sm md:text-base tracking-widest text-center max-w-md border border-dashed border-green-500/50 p-4 bg-green-900/10">
        [ SYSTEM_HINT ]<br />
        Use your knowledge of SQL injection.
      </div>
    </div>
  );
}
