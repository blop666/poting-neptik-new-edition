"use client"

import React from 'react'
import { LeftSide } from '@/components/dashboard/login/leftside'
import { useDashboardStats } from '@/backend/hooks/useDashboardStats'

const WinnerPage = () => {
    const {candidates, isFetching, totalVotesCast} = useDashboardStats()

    const maxVotes = candidates.length > 0 
    ? Math.max(...candidates.map((c) => c.voteCount || 0)) 
    : 0;
  return (
    <div className="w-full min-h-screen flex justify-center items-center  p-6">
          <div className="flex flex-row md:flex-row gap-12 md:gap-24 max-w-6xl w-full items-center justify-center">
            {/* === LEFT SIDE SECTION (Informasi Teks) === */}
            <LeftSide />
            {/* === END LEFT SECTION === */}
    
            {/* === RIGHT SIDE SECTION  === */}
            <div className="w-full max-w-md border border-red-100 rounded-[32px] p-10 bg-white shadow-sm flex flex-col items-center">
          
          {/* Header Card Terima Kasih */}
          <div className="text-center mb-8">
            <span className="text-red-500 font-bold text-lg tracking-wide flex items-center justify-center gap-1">
              ✦ Terima kasih ✦
            </span>
            <p className="text-gray-500 text-xs font-semibold mt-1">
              Telah menyelesaikan proses pemungutan suara.
            </p>
          </div>

          {/* SINKRONISASI STATE LOADING */}
          {isFetching ? (
            <div className="text-sm text-gray-400 font-medium py-12 animate-pulse">
              Memuat hasil voting terbaru...
            </div>
          ) : (
            /* List Bar Suara Kandidat */
            <div className="w-full flex flex-col gap-4">
              {candidates.map((item, index) => {
                // 4. Hitung persentase berdasarkan total suara yang MASUK (totalVotesCast)
                const percentage = totalVotesCast > 0 
                  ? Math.round(((item.voteCount || 0) / totalVotesCast) * 100) 
                  : 0;
                
                // 5. Cek apakah kandidat ini yang suaranya tertinggi saat ini
                const isWinner = (item.voteCount || 0) === maxVotes && maxVotes > 0;

                return (
                  <div
                    key={item.id}
                    className={`flex flex-row items-center gap-4 p-3 rounded-2xl w-full border transition-all duration-500 ${
                      isWinner
                        ? "bg-[#111111] text-white border-neutral-950 shadow-md"
                        : "bg-white text-black border-gray-100 shadow-sm"
                    }`}
                  >
                    {/* Avatar Kandidat */}
                    <div className="w-[56px] h-[70px] rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-neutral-100">
                      <img
                        src={item.photoUrl || "/placeholdernew.png"} // Pakai fallback jika null
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Informasi Progress Bar */}
                    <div className="flex-1 flex flex-col gap-1">
                      <span className={`text-xs font-bold ${isWinner ? "text-white/90" : "text-black/80"}`}>
                        Kandidat {index + 1} – {item.name}
                      </span>
                      
                      <div className="flex flex-row items-center gap-3">
                        {/* Track Progress Bar */}
                        <div
                          className={`h-[22px] flex-1 rounded-full overflow-hidden p-[3px] ${
                            isWinner ? "bg-white" : "bg-[#1a1a1a]"
                          }`}
                        >
                          {/* Fill Progress Bar (Warna Merah Nevtik) */}
                          <div
                            className="bg-red-500 h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        {/* Teks Persentase */}
                        <span className="text-sm font-black min-w-[36px] text-right">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
            {/* === END RIGHT SECTION === */}
          </div>
        </div>
  )
}

export default WinnerPage