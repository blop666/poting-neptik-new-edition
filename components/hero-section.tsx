"use client";

import { Mouse } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// buat animasi ketik anjayyy, jadi nanti tinggal pake
function useTypingAnimation(text: string, speed = 120, startDelay = 800) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, showCursor };
}

export default function HeroSection() {

  //panggil fngsi yg tadi
  const { displayedText, showCursor } = useTypingAnimation("Academy", 140, 1000);

  return (
    <section className="flex flex-col items-center justify-center pt-8 md:pt-12 pb-6 md:pb-8 px-4 text-center w-full max-w-5xl mx-auto flex-1 h-full mt-4 md:mt-6">
      <h1 className="text-[clamp(3rem,10vw,9rem)] font-bold tracking-tight flex items-center justify-center gap-3 md:gap-4 flex-nowrap whitespace-nowrap leading-tight md:leading-none mb-4 md:mb-6">
        <span className="text-[#ED1C24]">Nevtik</span>
        <span className="text-[#1A1D20] relative">
          {/* tampilin teks academynya pake animasi ketik anjayyy */}
          {displayedText}
          {showCursor && (
            <motion.span
              className="inline-block w-[3px] h-[0.85em] bg-[#ED1C24] ml-1 align-middle rounded-full"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed font-medium mb-8 md:mb-12">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
        <br className="hidden md:block" />
        Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
        1500s, when an unknown
      </p>


      <button className="bg-[#ED1C24] text-white px-6 sm:px-8 py-3 md:py-3.5 rounded-full font-semibold hover:bg-red-700 transition-colors shadow-sm mb-12 sm:mb-16 text-sm md:text-base">
        Let&apos;s Start
      </button>

          {/* bagian logo2 */}
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-20 md:mb-28 h-20 md:h-32 relative">
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#1A1D20] rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-md translate-y-5 md:translate-y-8 shrink-0">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="React"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11"
          />
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#1A1D20] rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-md translate-y-2 md:translate-y-3 shrink-0">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
            alt="Figma"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11"
          />
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#1A1D20] rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-md -translate-y-1 md:-translate-y-2 relative z-10 scale-110 shrink-0">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg"
            alt="Arch Linux"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11"
          />
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#1A1D20] rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-md translate-y-2 md:translate-y-3 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 text-[#ED1C24]"><path fill="currentColor" d="M23.041 6.188a1.4 1.4 0 0 0-.218-.36c-.24-.296-.634-.586-1.14-.864l-4.052-2.22L13.576.519C13.074.243 12.61.065 12.22.013A2 2 0 0 0 12 0c-.432 0-.974.192-1.576.52L6.37 2.74L2.317 4.96c-.504.279-.9.569-1.14.867a2 2 0 0 0-.122.17a2 2 0 0 0-.096.19c-.15.348-.22.816-.22 1.368v8.887c0 .66.1 1.2.316 1.558c.216.356.66.706 1.262 1.036l4.054 2.22l4.053 2.223c.504.276.966.456 1.36.506q.218.03.436 0c.39-.05.852-.228 1.356-.506l8.107-4.443c.6-.33 1.046-.68 1.262-1.036q.054-.09.096-.188c.15-.348.22-.818.22-1.37V7.556c0-.552-.07-1.02-.22-1.368M7.233 16.618c0 .2-.218.33-.396.233l-1.45-.796a1.07 1.07 0 0 1-.552-.934v-4.296c0-.2.216-.33.394-.235l1.728.947a.53.53 0 0 1 .276.468v4.612zm11.934-1.497c0 .39-.213.748-.554.936l-1.45.794a.266.266 0 0 1-.394-.234v-5.692c0-.2-.217-.33-.395-.232l-2.62 1.434c-.34.187-.552.545-.552.934v5.646a.53.53 0 0 1-.278.468l-.41.224c-.32.176-.707.176-1.026 0l-.408-.224a.53.53 0 0 1-.278-.468v-5.646c0-.389-.212-.747-.552-.934L4.835 9.16v-.28c0-.388.212-.746.552-.934l.6-.328a1.06 1.06 0 0 1 1.022 0l4.48 2.452c.318.176.704.176 1.021 0l2.07-1.134a.266.266 0 0 0 0-.468L9.932 5.922a.266.266 0 0 1 0-.468l1.556-.852c.32-.176.707-.176 1.026 0l6.1 3.34c.342.188.554.547.553.936z" /></svg>
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#1A1D20] rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-md translate-y-5 md:translate-y-8 shrink-0">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
            alt="Linux"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#4A4A4A] font-medium">
        <Mouse className="w-5 h-5 stroke-[1.5]" />
        <span className="text-sm">Scroll Down</span>
      </div>
    </section>
  );
}
