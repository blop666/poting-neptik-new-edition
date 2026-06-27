"use client";

import React, { useState } from "react";
import { MdEdit, MdDelete, MdArrowBack } from "react-icons/md";
import { useGetCandidate, CandidateType } from "@/backend/hooks/useCandidate";
import { motion, AnimatePresence } from "framer-motion";

const CandidateRow = ({
  item,
  index,
  setEditingCandidate,
  triggerDelete,
}: {
  item: CandidateType;
  index: number;
  setEditingCandidate: (item: any) => void;
  triggerDelete: (id: number, name: string) => void;
}) => {
  const [showDetail, setShowDetail] = useState(false);
   const renderList = (text: string) => {
    if (!text) return [];
    return text.split("\n").filter((line) => line.trim() !== "");
  };

  return (
    <div className="relative border mt-4 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden min-h-[238px]">
      <AnimatePresence mode="wait">
        {!showDetail ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 flex flex-col md:flex-row gap-5 h-full"
          >
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <img
                src={item.photoUrl || "/placeholdernew.png"}
                alt={item.name}
                className="w-[160px] h-[206px] object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full gap-6 items-start">
              <div className="flex flex-col gap-2 text-left flex-1 min-w-0 w-full">
                <span className="text-black font-bold text-lg block truncate">
                  {index + 1} – {item.name}
                </span>

                <div className="flex flex-col">
                  <span className="text-[#ED1C24] text-xs font-bold">Visi</span>
                  <p className="text-gray-500 font-medium text-xs line-clamp-2 text-justify">
                    {item.vision}
                  </p>
                </div>

                <div className="flex flex-col">
                  <span className="text-[#ED1C24] text-xs font-bold">Misi</span>
                  <div className="text-gray-500 font-medium text-xs line-clamp-2 text-justify">
                    {renderList(item.mission).map((misiText, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {misiText}
                        </li>
                      ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowDetail(true)}
                  className="text-[#ED1C24] font-bold text-xs text-left mt-2 hover:underline cursor-pointer w-fit block"
                >
                  Lihat Selengkapnya
                </button>
              </div>

              <div className="flex flex-row md:flex-row gap-8 justify-between md:justify-end items-center md:items-start w-full md:w-auto flex-shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                <div className="flex flex-col text-center min-w-[70px]">
                  <span className="text-black text-3xl font-extrabold leading-none">
                    {item.voteCount}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 mt-1">
                    Suara
                  </span>
                </div>

                <div className="flex flex-row md:flex-col gap-2 min-w-[100px]">
                  <button
                    onClick={() => setEditingCandidate(item)}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-bold hover:text-[#ED1C24] hover:border-[#ED1C24] transition-colors text-xs bg-white shadow-sm cursor-pointer w-full whitespace-nowrap"
                  >
                    <MdEdit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => triggerDelete(item.id, item.name)}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-100 text-[#ED1C24] font-bold hover:bg-red-50 transition-colors text-xs bg-white shadow-sm cursor-pointer w-full whitespace-nowrap"
                  >
                    <MdDelete className="w-4 h-4" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0 bg-white p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-black font-bold text-xl">
                  {index + 1} – {item.name}
                </span>
                <button
                  onClick={() => setShowDetail(false)}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-black font-bold text-xs border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm cursor-pointer bg-white transition-colors"
                >
                  <MdArrowBack className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[#ED1C24] text-sm font-bold">Visi</span>
                  <p className="text-gray-700 text-xs font-medium leading-relaxed text-justify bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {item.vision}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[#ED1C24] text-sm font-bold">Misi</span>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 h-full">
                    <ol className="text-gray-700 text-xs font-medium list-decimal pl-4 space-y-1.5 text-justify">
                      {renderList(item.mission).map((misiText, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {misiText}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[#ED1C24] text-sm font-bold">
                    Program Kerja
                  </span>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 h-full">
                    <ol className="text-gray-700 text-xs font-medium list-decimal pl-4 space-y-1.5 text-justify">
                      {(item.program || []).map((prokerText, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {prokerText}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CandidateListContent = ({
  setEditingCandidate,
  triggerDelete,
}: {
  setEditingCandidate: (item: any) => void;
  triggerDelete: (id: number, name: string) => void;
}) => {
  const { candidates = [], isFetching } = useGetCandidate();

  if (isFetching && candidates.length === 0) {
    return (
      <>
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="border mt-4 border-gray-200 rounded-xl p-4 gap-4 flex flex-col md:flex-row animate-pulse bg-white"
          >
            <div className="w-[160px] h-[206px] bg-gray-200 rounded-lg mx-auto md:mx-0" />
            <div className="flex flex-col md:flex-row justify-between w-full gap-4">
              <div className="flex flex-col gap-4 text-left w-full md:w-2/3">
                <div className="h-6 bg-gray-200 rounded-md w-3/4" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 bg-gray-200 rounded-md w-12" />
                  <div className="h-3 bg-gray-200 rounded-md w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 bg-gray-200 rounded-md w-12" />
                  <div className="h-3 bg-gray-200 rounded-md w-5/6" />
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-4 justify-between md:justify-start items-center md:items-end w-full md:w-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 bg-gray-200 rounded-md w-12" />
                  <div className="h-4 bg-gray-200 rounded-md w-10" />
                </div>
                <div className="flex gap-2 md:flex-col w-full md:w-20">
                  <div className="h-8 bg-gray-200 rounded-md w-full" />
                  <div className="h-8 bg-gray-200 rounded-md w-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-gray-300 rounded-xl mt-4 text-gray-400 font-medium bg-white">
        Belum ada data kandidat.
      </div>
    );
  }

  return (
    <>
      {candidates.map((item, index) => (
        <CandidateRow
          key={item.id}
          item={item}
          index={index}
          setEditingCandidate={setEditingCandidate}
          triggerDelete={triggerDelete}
        />
      ))}
    </>
  );
};