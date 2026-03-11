"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import photo from "@/public/banner.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

//buat ngatur animasi biar gampang ngambilnya
const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-360 mx-auto px-6 md:px-12 py-8 md:py-12"
      id="about"
    >
      <motion.div
        className="bg-[#1A1D20] rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-10 lg:p-12"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease }}
        >
          {/* geser kanan coyyyy */}
        <motion.div
          className="flex items-center gap-2 mb-6 md:mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          >
          {/* icon bintang muter */}
          <motion.div
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={
              isInView
                ? { opacity: 1, rotate: 0, scale: 1 }
                : { opacity: 0, rotate: -180, scale: 0 }
            }
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-[#ED1C24] fill-[#ED1C24]" />
          </motion.div>
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
            About Us
          </h2>
        </motion.div>

        {/* fotonya nge-zoom anjirr */}
        <motion.div
          className="w-full aspect-16/7 bg-[#2A2D30] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden mb-6 md:mb-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <Image src={photo} alt="About Us" className="object-cover w-full h-full" />
        </motion.div>

        {/* instagramnya anjayyy */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12">
          <motion.div
            className="md:w-1/4 shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            <p className="text-white/70 text-base md:text-lg">Our Instagram:</p>
            <p className="text-white text-2xl md:text-3xl font-semibold">
              @nevtikacademy
            </p>
          </motion.div>

          {/* deskripsinya */}
          <motion.div
            className="md:flex-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
          >
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur{" "}
              <span className="bg-[#ED1C24] text-white px-1">
                voluptatum laborum
              </span>{" "}
              numquam blanditiis harum quisquam eius.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
