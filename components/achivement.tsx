"use client";

import { useState } from "react";
import StarIcon from "./ui/StarIcon";
import { ArrowIcon } from "./ui/ArrowIcon";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// tipe data buat card achivementnya

interface AchivementCard {
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
}

// datanya masih hardcode cok, nanti dibikin fetch lewat API
const achivements: AchivementCard[] = [
  {
    image: "/achivement-1.png",
    category: "Cyber Security",
    date: "9 Nov 2025",
    title: "Juara 1 Lomba Cyber Security",
    description:
      "Juara 1 Lomba Cyber Security di Binus dan berhasil mendapatkan beasiswa S1 di Binus!",
  },
  {
    image: "/achivement-2.png",
    category: "Cyber Security",
    date: "9 Nov 2025",
    title: "Juara 1 Lomba Cyber Security",
    description:
      "Juara 1 Lomba Cyber Security di Binus dan berhasil mendapatkan beasiswa S1 di Binus!",
  },
  {
    image: "/achivement-3.png",
    category: "Cyber Security",
    date: "9 Nov 2025",
    title: "Juara 1 Lomba Cyber Security",
    description:
      "Juara 1 Lomba Cyber Security di Binus dan berhasil mendapatkan beasiswa S1 di Binus!",
  },
  {
    image: "/achivement-3.png",
    category: "Cyber Security",
    date: "9 Nov 2025",
    title: "Juara 1 Lomba Cyber Security",
    description:
      "Juara 1 Lomba Cyber Security di Binus dan berhasil mendapatkan beasiswa S1 di Binus!",
  },
  {
    image: "/achivement-3.png",
    category: "Cyber Security",
    date: "9 Nov 2025",
    title: "Juara 1 Lomba Cyber Security",
    description:
      "Juara 1 Lomba Cyber Security di Binus dan berhasil mendapatkan beasiswa S1 di Binus!",
  },
  {
    image: "/achivement-3.png",
    category: "Cyber Security",
    date: "9 Nov 2025",
    title: "Juara 1 Lomba Cyber Security",
    description:
      "Juara 1 Lomba Cyber Security di Binus dan berhasil mendapatkan beasiswa S1 di Binus!",
  },
];

// easing biar animasinya smooth
const ease = [0.22, 1, 0.36, 1] as const;

// varian buat animasi tiap card
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease },
  }),
};

// nih buat animasi pas scroll
function AnimatedCard({
  children,
  index,
  isHidden,
}: {
  children: React.ReactNode;
  index: number;
  isHidden?: boolean;
}) {
  return (
    <motion.div
      className={isHidden ? "hidden" : "block"}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
    >
      {children}
    </motion.div>
  );
}

export default function Achivement() {
  const [showAll, setShowAll] = useState(false); // toggle buat nampilin semua card apa enggak
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full py-8 md:py-12 px-12 md:px-20">
      {/* header + tombol view all */}

      <motion.div
        className="w-full flex justify-between items-center"
        initial={{ opacity: 0, y: -24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.7, ease }}
      >
        <div>
          <h3
            className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 space-mono"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            {/* icon bintng yg muter2 */}

              <StarIcon className="w-6 h-6" />
            Achivement
          </h3>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            Our Achivement
          </h2>
        </div>
        {/* tombol view all cuma muncul klo cardnya lebih dri 3 */}
        {achivements.length > 3 && (
          <div>
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#ED1C24] p-3 md:p-5 rounded-2xl text-white text-lg font-semibold relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(237,28,36,.35)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {showAll ? "View Less" : "View All"}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* grid card2 achivementnya */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {achivements.map((item, index) => (
          <AnimatedCard key={index} index={index} isHidden={!showAll && index >= 3}>
            {/* card utamanya, ada hover efek jg */}
            <motion.div
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow:
                  "0 20px 40px rgba(237,28,36,.12), 0 8px 16px rgba(0,0,0,.06)",
              }}
              transition={{ duration: 0.35, ease }}
            >
              {/* gambar */}
              <div className="p-4 pb-0">
                <div className="rounded-xl overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-52 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
              </div>

              {/* kategori, judul, deskripsi, tgl */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-[#ED1C24] font-semibold text-sm px-2.5 py-1 rounded-full bg-red-50">
                    <StarIcon className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span
                    className="text-gray-400 text-sm tracking-wider"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    {item.date}
                  </span>
                </div>

                <h4
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {item.title}
                </h4>

                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* tombol panah kanan atas */}
                <div className="flex justify-end mt-4">
                  <motion.button
                    className="bg-[#ED1C24] p-2.5 rounded-lg text-white"
                    whileHover={{
                      backgroundColor: "#c0151b",
                      x: 3,
                      y: -3,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}
