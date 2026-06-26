"use client";

import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import StarIcon from "@/components/ui/StarIcon";
import { useVoting } from "@/backend/hooks/useVoting";

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
    <div className=" min-h-screen absolute w-full mx-auto my-auto items-center justify-center flex flex-col gap-5 p-3">
      <span className="text-5xl font-bold text-black text-center">
        Pemilihan Calon <span className="text-[#ED1C24]">Ketua Nevtik</span>
        <br /> 2026/2027
      </span>

      {/* Card Section */}
      <div className="w-full justify-center items-center rounded-lg flex flex-row gap-12 max-w-7xl p-2 mt-5">
        {/* Candidate Card */}
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white flex flex-col gap-3">
            <div className="relative flex justify-center border border-red-400 rounded-xl p-3">
              {/* Gambar Kandidat */}
              <img
                className="w-full h-auto object-cover max-h-100"
                src={candidate.photoUrl || "/placeholdernew.png"}
                alt="tes"
              />

              {/* Box Nama Kandidat yang menimpa gambar (Absolute) */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg p-3 w-2/4 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <StarIcon className="w-4 h-4 text-[#ED1C24]" />
                  <span className="text-sm font-bold text-[#ED1C24]">
                    {candidate.name}
                  </span>
                </div>
                <span className="text-lg font-bold text-black"></span>
              </div>
            </div>

            <motion.button
              onClick={() => setSelectedCandidate(candidate)}
              className="w-full bg-red-400 text-center   hover:text-[#ED1C24] hover:bg-red-400/20 hover:border-red-500 duration-300 text-white py-2 rounded-lg shadow-md cursor-pointer"
              whileHover={{ scale: 1.06, borderColor: "ED1C24" }}
            >
              Vote
            </motion.button>
          </div>
        ))}

        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white border border-red-300 rounded-3xl p-10 max-w-xl w-full flex flex-col items-center gap-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-black text-center tracking-tight mt-4">
                Apakah anda yakin memilih <br />{" "}
                <span className="text-[#ED1C24] ">
                  {selectedCandidate.name}{" "}
                </span>
                ?
              </h2>

              <div className="flex w-full gap-4 mt-2">
                <button
                  // Contoh trigger untuk menutup pop-up
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 cursor-pointer bg-[#1A1A1A] text-white font-medium py-3.5 rounded-xl hover:bg-black transition duration-200 text-lg"
                >
                  Kembali
                </button>

                <button
                  onClick={handleVoteSubmit}
                  className="flex-1 cursor-pointer bg-[#ED1C24] text-white font-medium py-3.5 rounded-xl hover:bg-red-700 transition duration-200 text-lg"
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        )}

        {/* End Candidate Card */}
      </div>
      {/* End Card Section */}
    </div>
  );
};

export default page;
