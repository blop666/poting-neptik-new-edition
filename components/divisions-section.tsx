"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import StarIcon from "./ui/StarIcon";

// easing biar transisinya halus
const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function DivisionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 px-12 md:px-20">
      {/* header: judul + deskripsi */}
      <div className="w-full flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
        {/* judul "Division" + icon bintng yg muter */}
        <div>
          <motion.h3
            className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 space-mono"
            style={{ fontFamily: '"Space Mono", monospace' }}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease }}
          >
            <motion.span
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={
                isInView
                  ? { opacity: 1, rotate: 0, scale: 1 }
                  : { opacity: 0, rotate: -180, scale: 0 }
              }
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <StarIcon className="w-6 h-6" />
            </motion.span>
            Division
          </motion.h3>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            Our Division
          </motion.h2>
        </div>

        {/* paragraf deskripsi singkat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <p className="text-base md:text-xl lg:mr-10">
            Discover the teams behind our growth and success.
            <br />
            Every division is built with passion, creativity, and a
            <br />
            clear mission to contribute meaningfully to our organization.
          </p>
        </motion.div>
      </div>

      {/* grid 3 kolom divisi2nya */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
        }}
      >
        {/* kolom 1: cyber security, paling gede */}
        <motion.div
          className="rounded-2xl overflow-hidden relative bg-cover bg-center h-64 lg:h-175 group cursor-pointer"
          style={{ backgroundImage: "url('/divisions/cyber-security.jpg')" }}
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.95 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.7, ease },
            },
          }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/20 transition-all duration-300 group-hover:from-black/60 group-hover:to-black/30" />
          <motion.h3
            className="relative text-white text-4xl md:text-5xl font-bold p-8 leading-tight"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            Cyber&rsquo;s
            <br />
            Security
          </motion.h3>
        </motion.div>

        {/* kolom 2: web dev + itnsa */}
        <motion.div
          className="flex flex-col gap-5 lg:h-175"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* web dev */}
          <motion.div
            className="rounded-2xl overflow-hidden relative bg-cover bg-center h-64 lg:h-auto lg:min-h-0 lg:flex-2 group cursor-pointer"
            style={{ backgroundImage: "url('/divisions/web-dev.jpg')" }}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, ease },
              },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/20 transition-all duration-300 group-hover:from-black/60 group-hover:to-black/30" />
            <motion.h3
              className="relative text-white text-3xl md:text-4xl font-bold p-8"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease }}
            >
              Web Dev
            </motion.h3>
          </motion.div>

          {/* ITNSA, blm ada gambarnya */}
          <motion.div
            className="rounded-2xl overflow-hidden relative bg-[#1a1a1a] h-64 lg:h-auto lg:min-h-0 lg:flex-3 group cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, ease },
              },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.h3
              className="relative text-white text-3xl md:text-4xl font-bold p-8"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease }}
            >
              ITNSA
            </motion.h3>
          </motion.div>
        </motion.div>

        {/* kolom 3: cabling + values */}
        <motion.div
          className="flex flex-col gap-5 lg:h-175"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* cabling */}
          <motion.div
            className="rounded-2xl overflow-hidden relative bg-cover bg-center h-64 lg:h-auto lg:min-h-0 lg:flex-3 group cursor-pointer"
            style={{ backgroundImage: "url('/divisions/cabling.jpg')" }}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, ease },
              },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/20 transition-all duration-300 group-hover:from-black/60 group-hover:to-black/30" />
            <motion.h3
              className="relative text-white text-3xl md:text-4xl font-bold p-8"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease }}
            >
              Cabling
            </motion.h3>
          </motion.div>

          {/* card merah buat values: skill, intergrity, passion */}
          <motion.div
            className="rounded-2xl overflow-hidden relative bg-red-600 flex flex-col justify-between p-8 h-64 lg:h-auto lg:min-h-0 lg:flex-2 group cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, ease },
              },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {(["SKILL", "INTERGRITY", "PASSION"] as const).map((text, i) => (
              <motion.h3
                key={text}
                className={`text-white text-3xl md:text-4xl font-bold underline underline-offset-8 ${i === 1 ? "text-center" : i === 2 ? "text-right" : ""
                  }`}
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.12, ease }}
              >
                {text}
              </motion.h3>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
