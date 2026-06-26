"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const ElectionTimer = () => {
  const router = useRouter();
  
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Durasi default (Contoh: 2 jam)
  const DURATION_MS = 2 * 60 * 60 * 1000; 

  // 1. Cek status pas pertama kali load
  useEffect(() => {
    const savedEndTime = localStorage.getItem("election_end_time");
    const savedStatus = localStorage.getItem("election_status");

    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const now = Date.now();

      if (endTime > now) {
        setStatus("running");
        setTimeLeft(Math.floor((endTime - now) / 1000));
      } else {
        setStatus("finished");
        setTimeLeft(0);
      }
    } else if (savedStatus === "finished") {
      setStatus("finished");
    }
  }, []);

  // 2. Ticker hitung mundur per detik
  useEffect(() => {
    if (status !== "running") return;

    const timer = setInterval(() => {
      const savedEndTime = localStorage.getItem("election_end_time");
      if (!savedEndTime) return;

      const endTime = parseInt(savedEndTime, 10);
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        clearInterval(timer);
        setStatus("finished");
        setTimeLeft(0);
        localStorage.setItem("election_status", "finished");
        localStorage.removeItem("election_end_time");
      } else {
        setTimeLeft(Math.floor(difference / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // 3. Fungsi Mulai Pemilihan
  const handleStartElection = () => {
    const targetEndTime = Date.now() + DURATION_MS;
    localStorage.setItem("election_end_time", targetEndTime.toString());
    localStorage.setItem("election_status", "running");
    
    setStatus("running");
    setTimeLeft(Math.floor(DURATION_MS / 1000));
  };

  const handleEndElection = () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menyelesaikan pemilihan sekarang juga?");
    if (!konfirmasi) return; 

    setStatus("finished");
    setTimeLeft(0);
    
    // Paksa update localStorage agar permanen saat di-refresh
    localStorage.setItem("election_status", "finished");
    localStorage.removeItem("election_end_time"); 
  };

  // 5. Fungsi Navigasi ke Page Winner
  const handleNavigateToWinner = () => {
    router.push("/winner"); 
  };

  // Helper Format Jam
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00 : 00 : 00";
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${hrs} : ${mins} : ${secs}`;
  };

  return (
    <div className="border p-6 text-center bg-white border-gray-200 rounded-2xl flex flex-col justify-around min-h-[220px] max-w-sm w-full shadow-sm">
      
      {/* JUDUL DINAMIS */}
      <span className="text-black font-bold text-xl tracking-wide">
        {status === "idle" && "Pemilihan Belum Berlangsung"}
        {status === "running" && "Pemilihan Sedang Berlangsung"}
        {status === "finished" && "Pemilihan Telah Selesai"}
      </span>

      {/* TIMER */}
      <span className="text-black font-extrabold text-4xl font-mono my-4 tabular-nums">
        {status === "running" ? formatTime(timeLeft) : "00 : 00 : 00"}
      </span>

      {/* TOMBOL AKSI BERDASARKAN STATUS */}
      {status === "idle" && (
        <button
          onClick={handleStartElection}
          className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-lg transition-all"
        >
          Mulai Pemilihan
        </button>
      )}

      {/* 🛠️ PERUBAHAN DI SINI: Saat running, tombol berubah jadi 'Selesaikan Pemilihan' */}
      {status === "running" && (
        <button
          onClick={handleEndElection}
          className="w-full py-2.5 text-white bg-red-600 hover:bg-red-700 font-bold rounded-lg transition-all shadow-sm active:scale-[0.98]"
        >
          🛑 Selesaikan Pemilihan
        </button>
      )}

      {status === "finished" && (
        <button
          onClick={handleNavigateToWinner}
          className="w-full py-2.5 text-white bg-emerald-600 hover:bg-emerald-700 font-bold rounded-lg shadow-md transition-all animate-bounce"
        >
          Lihat Hasil Pemilihan ➔
        </button>
      )}
    </div>
  );
};