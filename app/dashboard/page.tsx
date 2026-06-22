"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [logs, setLogs] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [successState, setSuccessState] = useState(false);

  useEffect(() => {
    // Fetch the payload on mount (User must check network tab)
    fetch("/api/sys-dump").catch(console.error);

    // Simulate hanging terminal logs
    const fakeLogs = [
      "Initializing secure connection...",
      "Bypassing firewall node 04...",
      "Memory leak detected at 0x0E19...",
      "Attempting to fetch payload sequence...",
      "ERROR: Decryption key not found.",
      "Retrying payload extraction (Attempt 1/3)...",
      "Retrying payload extraction (Attempt 2/3)...",
      "Retrying payload extraction (Attempt 3/3)...",
      "CRITICAL FAILURE: Pipeline disconnected.",
      "CHECK API Response in Network Tab.",
      "Fetching Payload Data... 99%"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < fakeLogs.length) {
        const currentLog = fakeLogs[i];
        setLogs((prev) => [...prev, currentLog]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim().toLowerCase() === "nattapong นัทธพงศ์") {
      setSuccessState(true);
    } else {
      setTerminalInput("");
      setLogs((prev) => [...prev, "ERROR: Invalid decryption string."]);
    }
  };

  if (successState) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6">
          <pre className="text-xs sm:text-sm md:text-base leading-tight font-bold animate-pulse text-green-400">
            {`
    ___  _  _  ___  ___  ___  ___  ___ 
   / __)( )( )/ __)/ __)( __)/ __)( __)
   \\__ \\ \\\\// \\__ \\\\__ \\ )_) \\__ \\ )_) 
   (___/ (__/  (__/(__/ (___)(__/(___)
`}
          </pre>
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            SYSTEM OVERRIDE SUCCESS.
          </h1>
          <h2 className="text-xl md:text-2xl text-green-300">
            WELCOME TO SIET.
          </h2>
          <div className="mt-8 border border-green-500 p-4 inline-block bg-black/80">
            <p>Admin Contact Info Unlocked.</p>
            <p>Instagram: pi__3.14285</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col relative overflow-hidden p-6">
      <div className="flex-1 space-y-2 opacity-80 pointer-events-none">
        {logs.map((log, index) => (
          <div key={index} className={log.includes("ERROR") || log.includes("FAILURE") || log.includes("CHECK") ? "text-red-500" : "text-green-500"}>
            &gt; {log}
          </div>
        ))}
        {logs.length >= 11 && (
          <div className="text-yellow-500 mt-4 animate-pulse">
            &gt; Process hanging...
          </div>
        )}
      </div>

      {/* Secret Terminal Input at the bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-black border-t border-green-900/50">
        <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
          <span className="text-green-600 select-none">root@sys:~$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-800 focus:ring-0"
            placeholder="[ enter decryption sequence ]"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
