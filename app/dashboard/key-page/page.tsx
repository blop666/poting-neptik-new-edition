"use client";

import React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TokenCard } from "@/components/dashboard/tokenCard";
import { FaUser } from "react-icons/fa";
import {
  FaSearch,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaPaperPlane,
  FaQuoteRight,
} from "react-icons/fa";
import { useTokenManagement } from "@/backend/hooks/useTokenManagement";
import { ConfirmModal } from "@/components/confirm-modal";
import { motion } from "framer-motion";

const keypage = () => {
  const ease = [0.22, 1, 0.36, 1] as const;

  const {
    isLoading,
    review,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    currentItems,
    filteredTokens,
    tokensData,
    fileName,
    imagePreview,
    handleFileChange,
    handleGenerateTokens,
    handleSendTokensToEmail,
    handleResetAll,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    confirmActionType,
    handleConfirmAction,
  } = useTokenManagement();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className="p-5 flex flex-col gap-7 w-full"
    >
      <span className="text-black font-bold text-4xl">Generate Token</span>

      <div className="grid grid-cols-3 gap-3">
        {/* LEFT SECTION (Upload File & Generate) */}
        <div className="col-span-2 px-6 py-4 flex flex-col gap-1 border border-gray-300 rounded-lg bg-white">
          <form onSubmit={handleGenerateTokens}>
            <div className="flex flex-col">
              <span className="text-black font-bold text-md">Upload File</span>
              <label
                className={`mt-3 border-2 border-dashed border-red-400 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[120px] cursor-pointer bg-white ${imagePreview ? "border-solid border-gray-300" : ""}`}
              >
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {imagePreview ? (
                  <div className="relative w-full flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Excel Logo"
                      className="max-h-[80px] object-contain rounded-lg mb-2"
                    />
                    <span className="text-sm font-semibold text-gray-700 text-center max-w-[80%] truncate">
                      {fileName}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <svg
                      className="w-14 h-14 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                    </svg>
                    <span className="text-black font-bold text-lg mt-2">
                      Drop CSV atau XLSX Disini
                    </span>
                    <span className="text-gray-400 font-medium text-sm mt-0.5">
                      Maksimal ukuran file 5MB
                    </span>
                  </div>
                )}
              </label>

              <div className="flex flex-row w-full mt-6 gap-4">
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="text-gray-500 py-2 flex flex-row border rounded-md px-3 items-center justify-center border-gray-200 bg-white w-1/6 gap-1 hover:bg-gray-50"
                >
                  <MdDelete className="w-5 h-5 text-gray-400" /> Hapus
                </button>
                {/* isLoading di bawah ini beneran state murni, bukan setter lagi */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`text-white flex py-2 border text-center justify-center rounded-md px-3 items-center w-full font-semibold transition-all ${isLoading ? "bg-red-400 cursor-not-allowed" : "bg-[#ED1C24] hover:bg-red-600"}`}
                >
                  {isLoading
                    ? "Memproses Pembuatan Token..."
                    : "Generate New Token"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT SECTION (Review Cards) */}
        <div className="w-full px-3 py-4 border border-gray-300 rounded-lg bg-white flex flex-col gap-5">
          <span className="text-black font-bold text-md">
            Review Pengiriman Token
          </span>
          <div className="flex-1 flex items-center w-full">
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Data review langsung kehitung otomatis lewat useMemo di hook */}
              <TokenCard
                name="Total Email"
                logo={FaUser}
                total={review.totalEmail}
              />
              <TokenCard
                name="Token Generate"
                logo={FaUser}
                total={review.tokenGenerate}
              />
              <TokenCard
                name="Email Sent"
                logo={FaUser}
                total={review.emailSent}
              />
              <TokenCard name="Failed" logo={FaUser} total={review.failed} />
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION (Tabel & Panel Kontrol) */}
      <div className="grid grid-cols-3 gap-4 w-full items-stretch">
        <div className="col-span-2 p-6 border border-gray-200 rounded-2xl bg-white flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-5">
              <span className="text-black font-bold text-xl tracking-tight">
                Daftar Token
              </span>
              <div className="relative w-52">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaSearch className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Cari Email/Token..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-1.5 text-xs border border-gray-200 rounded-full bg-white text-black focus:outline-none focus:border-red-400 placeholder-gray-300"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
                    <th className="py-2.5 px-4 rounded-l-lg w-12 text-center">
                      No
                    </th>
                    <th className="py-2.5 px-4">Email</th>
                    <th className="py-2.5 px-4">Token</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 rounded-r-lg w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={item.id} className="text-gray-800 align-middle">
                        <td className="py-3 px-4 text-center font-medium">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td className="py-3 px-4 font-normal text-gray-900">
                          {item.email}
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-600 tracking-wider text-xs">
                          {item.token}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full border ${item.status === "Sent" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
                            <FaEye className="w-3.5 h-3.5" /> Preview Email
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-gray-400 text-sm"
                      >
                        Data tidak ditemukan atau belum digenerate.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION PANEL */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <span className="text-gray-400 text-xs font-medium">
                Menampilkan {indexOfFirstItem + 1} sampai{" "}
                {Math.min(indexOfLastItem, filteredTokens.length)} dari{" "}
                {filteredTokens.length} data
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-40"
                >
                  <FaChevronLeft className="w-3 h-3" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 text-xs font-bold rounded-lg ${currentPage === page ? "bg-red-500 text-white" : "bg-white border text-gray-700"}`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-40"
                >
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIDE KONTROL PANEL */}
        <div className="col-span-1 p-6 border border-gray-200 rounded-2xl bg-white flex flex-col justify-between shadow-sm">
          <div className="bg-red-50/60 rounded-xl p-6 flex flex-col items-center text-center gap-4 border border-red-50">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full shadow-sm">
              <FaEnvelope className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-red-500 text-xs font-semibold leading-relaxed max-w-[90%]">
              Token akan dikirim ke email masing-masing. Pastikan semua data
              sudah benar sebelum mengirim.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              type="button"
              onClick={handleSendTokensToEmail}
              disabled={isLoading || tokensData.length === 0}
              className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
            >
              <FaPaperPlane className="w-4 h-4" />
              {isLoading ? "Mengirim Email..." : "Kirim Token ke Semua Pemilih"}
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-400 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <FaQuoteRight className="w-4 h-4 text-gray-300" /> Reset & Upload
              Ulang
            </button>
          </div>
        </div>

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmAction} // 👈 Panggil ini untuk eksekusi otomatis
          title={
            confirmActionType === "send" ? "Kirim Token Email" : "Reset Token"
          }
          message={
            confirmActionType === "send"
              ? `Apakah anda yakin ingin mengirim token ke ${tokensData.length} pemilih?`
              : `Yakin mau hapus ${tokensData.length} token ini dari database?`
          }
          confirmText={confirmActionType === "send" ? "Ya, Kirim" : "Ya, Hapus"}
          variant={confirmActionType === "send" ? "primary" : "danger"}
        />
      </div>
    </motion.div>
  );
};

export default keypage;
