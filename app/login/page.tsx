"use client";

import React from "react";
import { GrReturn } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [tokenInput, setTokenInput] = useState("");
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    sessionStorage.setItem("voter_token", tokenInput.trim());
    router.push("/voting");
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 sm:p-6 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-10 md:gap-24 max-w-6xl w-full items-center justify-center py-6">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col gap-4 md:gap-6 max-w-md w-full text-center md:text-left items-center md:items-start"
        >
          <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
            <img src="/Nevtik.png" alt="logo-nevtik" width={24} height={24} />
            <span className="text-base md:text-lg font-semibold text-gray-800">
              Nevtik Academy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight tracking-tight">
            Pemilihan Calon <br />
            <span className="text-[#ED1C24]">Ketua Nevtik</span> <br />
            2026/2027
          </h1>

          <div className="flex gap-2 items-center mt-2 justify-center md:justify-start">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="w-full max-w-md border border-red-200 rounded-2xl sm:rounded-[32px] p-6 sm:p-10 bg-white shadow-sm flex flex-col items-center"
        >
          <div className="flex items-center gap-1 text-[#ED1C24] font-bold text-lg sm:text-xl mb-1">
            <span>✦</span> Login <span>✦</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#ED1C24] mb-6 sm:mb-8 text-center">
            Masukkan nama dan kata sandi anda
          </p>

          <form
            onSubmit={handleLoginSubmit}
            className="w-full flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-[#ED1C24] text-left w-full">
                Masukkan token
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => {
                  setTokenInput(e.target.value);
                }}
                placeholder="Cth: 09K0VG"
                className="w-full border border-red-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-300 text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ED1C24] text-white font-bold py-3 sm:py-3.5 rounded-xl hover:bg-red-700 transition duration-300 shadow-md shadow-red-100 text-sm sm:text-base cursor-pointer"
            >
              Masuk Sekarang
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;