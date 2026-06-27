"use client";

import React from "react";
import { GrReturn } from "react-icons/gr";
import { useAdminAuth } from "@/backend/hooks/useAdminAuth";

const LoginAdminPage = () => {
  const { loading, setIsLoading, errorMsg, setErrorMsg, handleLogin } =
    useAdminAuth();

  return (
    <div className="w-full min-h-screen flex justify-center items-center  p-6">
      <div className="flex flex-row md:flex-row gap-12 md:gap-24 max-w-6xl w-full items-center justify-center">
        {/* === LEFT SIDE SECTION (Informasi Teks) === */}
        <div className="flex flex-col gap-6  max-w-md w-full">
          {/* Title Nevtik */}
          <div className="flex flex-row gap-2 items-center">
            <img src="/Nevtik.png" alt="logo-nevtik" width={24} height={24} />
            <span className="text-lg font-semibold text-gray-800">
              Nevtik Academy
            </span>
          </div>

          <h1 className="text-5xl font-bold text-black leading-tight tracking-tight">
            Pemilihan Calon <br />
            <span className="text-[#ED1C24]">Ketua Nevtik</span> <br />
            2026/2027
          </h1>

          <div className="flex gap-2 items-center mt-2">
            <div className="bg-[#ED1C24] p-2 rounded-lg text-white flex items-center justify-center">
              <GrReturn size={14} />
            </div>
            <a
              href="/"
              className="text-[#ED1C24] cursor-pointer hover:bg-red-500 hover:text-white py-1 px-2 rounded-lg duration-300 ease-in-out font-semibold text-md hover:underline"
            >
              Kembali
            </a>
          </div>
        </div>
        {/* === END LEFT SECTION === */}

        {/* === RIGHT SIDE SECTION  === */}
        <div className="w-full max-w-md border border-red-200 rounded-[32px] p-10 bg-white shadow-sm flex flex-col items-center">
          {/* Header Card */}
          <div className="flex items-center gap-1 text-[#ED1C24] font-bold text-xl mb-1">
            <span>✦</span> Login <span>✦</span>
          </div>

          {errorMsg && (
            <div className="w-full my-2 bg-red-400 rounded--lg text-white text-md text-center">
              {errorMsg}
            </div>
          )}

          <p className="text-sm font-semibold text-[#ED1C24] mb-8 text-center">
            Masukkan nama dan kata sandi anda
          </p>

          {/* Form Input */}
          <form className="w-full flex flex-col gap-6" action={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#ED1C24]">
                Masukkan Nama anda
              </label>
              <input
                type="text"
                name="username"
                placeholder="Cth: Netik Academy"
                className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-300 text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#ED1C24]">
                Masukkan Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-300 text-gray-700"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3.5 rounded-xl transition duration-300 mt-2 ${
                loading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-[#ED1C24] hover:bg-red-700"
              }`}
            >
              {loading ? "Memproses..." : "Masuk Sekarang"}
            </button>
          </form>
        </div>
        {/* === END RIGHT SECTION === */}
      </div>
    </div>
  );
};

export default LoginAdminPage;
