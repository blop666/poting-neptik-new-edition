"use client";

import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  useGetCandidate,
  useDeleteCandidate,
} from "@/backend/hooks/useCandidate";
import { FormCreate } from "@/components/dashboard/data-page-comp/formCreate";
import { FormUpdateSide } from "@/components/dashboard/data-page-comp/formUpdate";
import { ConfirmModal } from "@/components/confirm-modal";
import { CandidateListContent } from "@/components/dashboard/data-page-comp/candidate-list";
import { motion } from "framer-motion";

// 2. KOMPONEN UTAMA
const dataPage = () => {
  const ease = [0.22, 1, 0.36, 1] as const;

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
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className="flex flex-col gap-7 p-8 w-full h-full"
    >
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
    </motion.div>
  );
};

export default dataPage;
