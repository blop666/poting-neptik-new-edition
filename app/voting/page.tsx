"use client";

import { useEffect, useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarIcon from "@/components/ui/StarIcon";
import { useVoting } from "@/backend/hooks/useVoting";
import { Toaster } from "sonner";
import { GrReturn } from "react-icons/gr";

const page = () => {
  const {
    candidates,
    isFetching,
    selectedCandidate,
    setSelectedCandidate,
    isLoading,
    handleVoteSubmit,
  } = useVoting();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center gap-5 p-4 md:p-8 overflow-x-hidden">
      {/* Animasi Judul: Fade in & Slide down pelan */}
      <motion.span
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-black text-center leading-tight"
      >
        Pemilihan Calon <span className="text-[#ED1C24]">Ketua Nevtik</span>
        <br /> 2026/2027
      </motion.span>

      <div className="w-full flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-6 md:gap-10 max-w-7xl p-2 mt-5">
        {/* Candidate Card */}
        {candidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white flex flex-col gap-3 w-full max-w-[300px] sm:max-w-[280px] md:max-w-[320px]" // 👈 Batasi lebar card biar konsisten di semua device
          >
            <div className="relative flex justify-center border border-red-400 rounded-xl p-3 bg-white shadow-sm overflow-hidden group">
              {/* Gambar Kandidat */}
              <img
                className="w-full h-auto object-cover max-h-[350px] rounded-lg transition-transform duration-300 group-hover:scale-105"
                src={candidate.photoUrl || "/placeholdernew.png"}
                alt={candidate.name}
              />

              {/* Box Nama Kandidat (Dibuat lebar dinamis left-4 right-4 biar muat nama panjang di layar kecil) */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg p-3 shadow-md">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 text-[#ED1C24] flex-shrink-0" />
                  <span className="text-sm md:text-base font-bold text-[#ED1C24] truncate">
                    {candidate.name}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => setSelectedCandidate(candidate)}
              className="w-full bg-red-400 text-center text-white py-2.5 rounded-lg shadow-md cursor-pointer font-semibold"
              whileHover={{ scale: 1.03, backgroundColor: "#ED1C24" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Vote
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            {/* Efek Pop-up halus pada kotak modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-red-300 rounded-3xl p-6 sm:p-10 max-w-md w-full flex flex-col items-center gap-6 sm:gap-8 shadow-2xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-black text-center tracking-tight leading-snug">
                Apakah anda yakin memilih <br />{" "}
                <span className="text-[#ED1C24] block mt-1">
                  {selectedCandidate.name}{" "}
                </span>
                ?
              </h2>

              <div className="flex w-full gap-4 mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 cursor-pointer bg-[#1A1A1A] text-white font-medium py-3 rounded-xl hover:bg-black transition duration-200 text-base sm:text-lg text-center"
                >
                  Kembali
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVoteSubmit}
                  className="flex-1 cursor-pointer bg-[#ED1C24] text-white font-medium py-3 rounded-xl hover:bg-red-700 transition duration-200 text-base sm:text-lg text-center"
                >
                  Ya
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster richColors position="top-center" closeButton />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="absolute md:bottom-12 md:left-25 bottom-8 mt-12 left-4 flex gap-2 items-baseline justify-start md:justify-start"
      >
        <div className="bg-[#ED1C24] p-2 rounded-lg text-white flex items-center justify-center">
          <GrReturn size={14} />
        </div>
        <a
          href="/"
          className="text-[#ED1C24] font-semibold text-sm md:text-md hover:underline"
        >
          Kembali
        </a>
      </motion.div>
    </div>
  );
};

export default page;
