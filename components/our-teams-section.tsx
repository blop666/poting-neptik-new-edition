"use client";

import { Sparkle } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const statsData = [
  { value: 10, suffix: "+", label1: "Years", label2: "Experienced" },
  { value: 10, suffix: "+", label1: "Years", label2: "Experienced" },
  { value: 10, suffix: "+", label1: "Years", label2: "Experienced" },
];

export default function OurTeamsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-our-team.png')" }}
        initial={{ scale: 1.15 }}
        animate={isInView ? { scale: 1 } : { scale: 1.15 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <div className="absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 md:py-16">
        <motion.div
          className="flex items-center gap-2 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -180, scale: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Sparkle className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" />
          </motion.div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Teams
          </h2>
        </motion.div>

        <div className="flex items-center gap-6 sm:gap-10 md:gap-16">
          {statsData.map((stat, index) => (
            <div key={index} className="contents">
              {index > 0 && (
                <motion.div
                  className="w-px h-24 md:h-32 bg-white/60"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ transformOrigin: "top" }}
                />
              )}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <p className="text-white text-3xl md:text-5xl lg:text-6xl font-bold">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <motion.p
                  className="text-white text-lg md:text-2xl lg:text-3xl font-semibold mt-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                >
                  {stat.label1}
                </motion.p>
                <motion.p
                  className="text-white text-lg md:text-2xl lg:text-3xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
                >
                  {stat.label2}
                </motion.p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
