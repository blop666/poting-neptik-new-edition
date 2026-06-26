"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion"; // 1. Import Framer Motion di sini
import StarIcon from "./ui/StarIcon";
import { useGetCandidate } from "@/backend/hooks/useCandidate";

interface CandidateType {
  id: number;
  name: string;
  photoUrl: string | null;
  program: string[];
  vision: string;
  mission: string;
  voteCount: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

// Tambahkan prop 'index' di sini untuk menghitung delay animasi secara berurutan
const CandidateCard = ({
  candidate,
  index,
}: {
  candidate: CandidateType;
  index: number;
}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Posisi awal: transparan dan agak ke bawah (efek slide up)
      whileInView={{ opacity: 1, y: 0 }} // Posisi pas masuk layar: muncul penuh dan naik ke posisi asli
      viewport={{ once: true, amount: 0.1 }} // 'once: true' bikin animasi cuma jalan sekali pas pertama di-scroll. 'amount: 0.1' artinya animasi jalan saat 10% card masuk layar.
      transition={{ duration: 0.6, delay: 0.2, ease }} // Delay dihitung dari index (Card 1: 0s, Card 2: 0.2s, Card 3: 0.4s)
      className="flex flex-col border border-red-300 rounded-2xl overflow-hidden bg-white shadow-sm"
    >
      {/* Foto dan Tag Nama (Relative untuk Overlap) */}
      <div className="relative flex justify-center">
        {/* Gambar Kandidat */}
        <img
          className="w-full h-auto object-cover max-h-150"
          src={candidate.photoUrl || "/placeholdernew.png"}
          alt={`Kandidat ${candidate.id}`}
        />

        {/* Box Nama Kandidat yang menimpa gambar (Absolute) */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg p-3 w-2/4 shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <StarIcon className="w-4 h-4 text-[#ED1C24]" />
            <span className="text-sm font-bold text-[#ED1C24]">
              Kandidat {candidate.id}
            </span>
          </div>
          <span className="text-lg font-bold text-black">{candidate.name}</span>
        </div>
      </div>

      <div className="p-4 border-b border-gray-100 flex justify-center">
        <button
          className="w-full cursor-pointer py-2 bg-red-500/80 text-white font-semibold rounded-lg hover:bg-red-200 hover:text-[#ED1C24]/70 transition ease-in-out duration-150"
          onClick={() => setShowDetail(!showDetail)}
        >
          {showDetail ? "Sembunyikan Detail" : "See Detail"}
        </button>
      </div>

      {showDetail && (
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Posisi awal: transparan dan agak ke bawah (efek slide up)
          whileInView={{ opacity: 1, y: 0 }} // Posisi pas masuk layar: muncul penuh dan naik ke posisi asli
          viewport={{ once: true, amount: 0.1 }} // 'once: true' bikin animasi cuma jalan sekali pas pertama di-scroll. 'amount: 0.1' artinya animasi jalan saat 10% card masuk layar.
          transition={{ duration: 0.6, delay: index * 0.2, ease }}
          className="flex flex-col gap-5 p-6"
        >
          {/* Visi */}
          <div className="">
            <div className="flex items-center gap-2 mb-2">
              <StarIcon className="w-4 h-4 text-[#ED1C24]" />
              <h3 className="text-md font-bold text-[#ED1C24]">Visi</h3>
            </div>
            <p className="text-sm text-gray-700 text-justify leading-relaxed">
              {candidate.vision}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <StarIcon className="w-4 h-4 text-[#ED1C24]" />
              <h3 className="text-md font-bold text-[#ED1C24]">Misi</h3>
            </div>
            <ol className="text-sm text-gray-700 list-decimal pl-4 leading-relaxed space-y-1">
              {candidate.mission
                .split("\n")
                .filter((misiText) => misiText.trim() !== "")
                .map((misiText, indexMisi) => (
                  <li key={indexMisi} className="text-justify">
                    {misiText}
                  </li>
                ))}
            </ol>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 ">
              <StarIcon className="w-4 h-4 text-[#ED1C24] " />
              <h3 className="text-md font-bold text-[#ED1C24]">
                Program Kerja
              </h3>
            </div>
            <ol className="text-sm text-gray-700 list-decimal pl-4 leading-relaxed space-y-1">
              {candidate.program.map((item, index) => (
                <li key={index} className="text-justify">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const VotingSection = () => {
  const { candidates } = useGetCandidate();

  return (
    <div className="flex flex-col p-8 max-w-8xl mx-12 mt-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease }}
        className="flex items-center gap-2 mb-2"
      >
        <StarIcon className="w-6 h-6 text-[#ED1C24]" />
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ED1C24]">
          Voting Nevtik 2026/2027
        </span>
      </motion.div>
      <motion.h1
        className="text-4xl font-semibold text-black mb-10"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease }}
      >
        Voting your future leader
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
        {candidates.map((candidate, index) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            index={index}
          />
        ))}
      </div>

      <motion.a
        href="/voting"
        className=" w-full bg-[#ED1C24] text-center text-white text-2xl font-bold py-4 rounded-xl hover:bg-red-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
      >
        Vote Now
      </motion.a>
    </div>
  );
};

export default VotingSection;
