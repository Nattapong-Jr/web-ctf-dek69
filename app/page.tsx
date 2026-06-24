"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);

  const fullText = "ขอต้อนรับสู่สายรหัส ผมซ่อนคำใบ้ดีๆ เอาไว้ในนี้แหละ\nพยายามเข้าล่ะ ลองใช้ความรู้ทางคอมพิวเตอร์หาให้เจอดูสิ";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const char = fullText.charAt(index);
        setDisplayedText((prev) => prev + char);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 1000); // fade in button after a short delay
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-2xl text-center flex flex-col items-center gap-12">
        <div className="text-lg md:text-2xl leading-relaxed tracking-wide min-h-[100px] text-green-500 whitespace-pre-line">
          {displayedText}
          <span className="animate-pulse">_</span>
        </div>

        <div className={`transition-opacity duration-1000 ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <button
            onClick={() => router.push("/login")}
            className="border border-green-500 bg-transparent text-green-500 hover:text-green-400 py-3 px-8 text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] focus:outline-none"
          >
            [ INITIATE_SYSTEM // ถัดไป ]
          </button>
        </div>
      </div>
    </div>
  );
}
