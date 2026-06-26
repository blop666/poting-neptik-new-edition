"use client";

import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useGetCandidate, useDeleteCandidate } from "@/backend/hooks/useCandidate";
import { FormCreate } from "@/components/dashboard/data-page-comp/formCreate";
import { FormUpdateSide } from "@/components/dashboard/data-page-comp/formUpdate";
import { ConfirmModal } from "@/components/confirm-modal";
import { CandidateListContent } from "@/components/dashboard/data-page-comp/candidate-list";

// 1. SUB-KOMPONEN BARU: Khusus untuk fetch dan merender list kandidat
// const CandidateListContent = ({ 
//   setEditingCandidate, 
//   triggerDelete 
// }: { 
//   setEditingCandidate: (item: any) => void; 
//   triggerDelete: (id: number, name: string) => void;
// }) => {
//   // Hook dipanggil di sini agar ikut ter-fetch ulang saat komponen ini di-remount
//   const { candidates } = useGetCandidate();

//   return (
//     <>
//       {candidates.map((item, index) => (
//         <div
//           key={item.id}
//           className="border mt-4 border-gray-200 rounded-lg p-4 gap-4 flex flex-row"
//         >
//           <div className="bg-white rounded-lg border-gray-300 border">
//             <img
//               src={item.photoUrl || "/placeholdernew.png"}
//               alt="candidate"
//               className="w-[160px] h-[206px] object-cover rounded-lg"
//             />
//           </div>

//           <div className="flex flex-row justify-between w-full">
//             <div className="flex flex-col gap-1 text-left">
//               <span className="text-black/80 font-bold text-lg">
//                 {index + 1} - {item.name}
//               </span>

//               <div className="flex flex-col">
//                 <span className="text-red-500 text-[12px] font-bold">Visi</span>
//                 <span className="text-gray-400 font-medium text-[10px]">
//                   {item.vision}
//                 </span>
//               </div>

//               <div className="flex flex-col">
//                 <span className="text-red-500 text-[12px] font-bold">Misi</span>
//                 <ul className="text-gray-400 font-medium text-[11px] list-disc list-inside space-y-0.5">
//                   {item.mission.split("\n").map((misiText, indexMisi) => (
//                     <li key={indexMisi}>{misiText}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className="flex flex-row gap-10 justify-center">
//               <div className="flex flex-col text-center">
//                 <span className="text-black text-3xl font-bold">
//                   {item.voteCount}
//                 </span>
//                 <span className="text-sm font-medium text-black">Suara</span>
//               </div>

//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={() => setEditingCandidate(item)}
//                   className="flex flex-row gap-3 cursor-pointer text-black font-bold hover:text-red-500 transition-colors"
//                 >
//                   <MdEdit className="w-5 h-5" />
//                   <span className="text-sm">Edit</span>
//                 </button>

//                 <button
//                   onClick={() => triggerDelete(item.id, item.name)}
//                   className="flex flex-row gap-1 text-black font-bold hover:text-red-700 transition-colors"
//                 >
//                   <MdDelete className="w-5 h-5 text-red-500" />
//                   <span className="text-red-500 text-sm">Hapus</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// 2. KOMPONEN UTAMA
const dataPage = () => {
  // State angka kunci untuk memicu remount komponen list
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingCandidate, setEditingCandidate] = useState<any | null>(null);

  const {
    triggerDelete,
    executeDelete,
    isModalOpen,
    setIsModalOpen,
    targetCandidate,
  } = useDeleteCandidate();

  // Fungsi sakti untuk memaksa list mengambil data baru
  const refreshData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleConfirmDelete = async () => {
    await executeDelete();
    refreshData();
  };

  const handleUpdateSuccess = () => {
    setEditingCandidate(null);
    refreshData();
  };

  return (
    <div className="flex flex-col gap-7 p-8 w-full h-full">
      <span className="text-black font-medium text-4xl">
        Kelola <span className="text-red-500">Kandidat</span>
      </span>

      <div className="grid grid-cols-3 gap-3">
        {/* Left Side Section */}
        <div className="p-5 flex flex-col border bg-white border-gray-200 rounded-lg col-span-2">
          <div className="flex flex-row justify-between">
            <span className="text-black font-medium text-xl">Kandidat</span>
            <div className="flex flex-row gap-14 px-8">
              <span className="text-gray-400 font-medium text-md">Suara</span>
              <span className="text-gray-400 font-medium text-md">Aksi</span>
            </div>
          </div>

          {/* 
            KUNCI UTAMA: Atribut key={refreshKey} dipasang di sini.
            Saat nilainya berubah, komponen CandidateListContent akan dipaksa melakukan fetch ulang.
          */}
          <div key={refreshKey}>
            <CandidateListContent
              setEditingCandidate={setEditingCandidate}
              triggerDelete={triggerDelete}
            />
          </div>
        </div>

        {/* Right Side Section */}
        <div className="col-span-1">
          {editingCandidate ? (
            <FormUpdateSide
              candidate={editingCandidate}
              onCancel={() => setEditingCandidate(null)}
              onSuccess={handleUpdateSuccess}
            />
          ) : (
            <FormCreate onSuccess={refreshData} />
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Kandidat"
        message={`Apakah Anda yakin ingin menghapus kandidat "${targetCandidate?.name}"?`}
        confirmText="Ya, Hapus Data"
        variant="danger"
      />
    </div>
  );
};

export default dataPage;