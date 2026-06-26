"use client"

import React from "react";
import { GrReturn } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [tokenInput, setTokenInput] = useState("");
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    // Langsung simpan token ke session browser tanpa nembak API
    sessionStorage.setItem("voter_token", tokenInput.trim());
    
    // Lempar ke bilik suara
    router.push("/voting");
  };

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
              className="text-[#ED1C24] font-semibold text-md hover:underline"
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
          <p className="text-sm font-semibold text-[#ED1C24] mb-8 text-center">
            Masukkan nama dan kata sandi anda
          </p>

          {/* Form Input */}
          <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#ED1C24]">
                Masukkan token
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => {setTokenInput(e.target.value)}}
                placeholder="Cth: 09K0VG"
                className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-300 text-gray-700"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-[#ED1C24] text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition duration-300 shadow-md shadow-red-100"
            >
              Masuk Sekarang
            </button>
          </form>
        </div>
        {/* === END RIGHT SECTION === */}
      </div>
    </div>
  );
};

export default LoginPage;
