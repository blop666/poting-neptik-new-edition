"use client";

import React from "react";
import { FaInbox, FaUserClock } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import { CardStats } from "@/components/dashboard/card";
import dynamic from "next/dynamic";
import { useDashboardStats } from "@/backend/hooks/useDashboardStats";
import { ElectionTimer } from "@/components/dashboard/timer";
import { motion } from "framer-motion";

const Chart = dynamic(
  () => import("react-apexcharts" as any).then((mod) => mod.default || mod),
  {
    ssr: false,
    loading: () => (
      <div className="w-[240px] h-[240px] rounded-full bg-gray-100 animate-pulse" />
    ),
  },
) as any;

// Fallback jika import di atas terlalu ketat di beberapa versi, gunakan ini:
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CHART_COLORS = ["#ED1C24", "#171B1A", "#9CA3AF"];
const BORDER_COLORS = [
  "border-[#ED1C24]",
  "border-[#171B1A]",
  "border-[#9CA3AF]",
];
const BG_COLORS = ["bg-[#ED1C24]", "bg-[#171B1A]", "bg-[#9CA3AF]"];

const VotingStats = () => {
  const {
    candidates,
    totalvoters: Total_Votes,
    totalVotesCast,
    remainingVotes,
    isFetching,
  } = useDashboardStats();

  if (isFetching) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <span className="text-xl font-medium animate-pulse text-gray-500">
          Menghitung statistik pemilihan...
        </span>
      </div>
    );
  }

  // --- CONFIGURASI APEXCHARTS (MUI LOOKALIKE) ---
  const chartSeries = candidates.map((c) => c.voteCount); // Ambil angka vote [100, 30, 50]

  const chartOptions: any = {
    chart: {
      type: "donut",
    },
    // Set warna solid dan tegas mirip MUI
    colors: ["#ED1C24", "#171B1A", "#9CA3AF"],

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontWeight: "bold",
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: false,
      },
    },

    // Mengatur ketebalan donut (bolong tengahnya)
    plotOptions: {
      pie: {
        donut: {
          size: "40%",
        },
      },
    },

    labels: candidates.map((c) => c.name),

    // 🔴 KUNCI 3: Tooltip Interaktif yang mewah & dijamin gak ngerusak scrollbar Next.js
    tooltip: {
      enabled: true,
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      },
      y: {
        formatter: (val: number) => `${val} Suara`,
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9,
        },
      },
    },
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className=" p-8 flex flex-col gap-7 w-full "
    >
      <span
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        className="text-3xl font-semibold text-black"
      >
        Statistik Pemilihan <br /> Ketua{" "}
        <span className="text-[#ED1C24]">Nevtik 2026/2027</span>
      </span>

      {/* Grid Card - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStats
          name="Total Pemilih"
          total={Total_Votes}
          logo={FaInbox}
          endName="Pemilih"
        />
        <CardStats
          name="Total Suara Masuk"
          total={totalVotesCast}
          logo={MdOutlineHowToVote}
          endName="Suara"
        />
        <CardStats
          name="Sisa Pemilih"
          total={remainingVotes}
          logo={FaUserClock}
          endName="Pemilih"
        />
      </div>

      {/* Grid Card - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side */}
        <div className="md:col-span-2 flex flex-row  gap-7 border rounded-2xl border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <span className="text-black text-center text-2xl font-semibold block mb-6">
              Suara Kandidat
            </span>

            {/* Area Chart wrapper */}
            <div className="w-62.5 h-50 mx-auto lg:mx-0">
              <ApexChart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                width="100%"
                height="100%"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            {candidates.map((item, index) => {
              const colorIndex = index % CHART_COLORS.length;
              return (
                <div
                  key={item.id}
                  className={`flex ${BORDER_COLORS[colorIndex]} items-center border rounded-lg flex-row gap-3 px-2 py-3 w-full h-1/3`}
                >
                  <span
                    className={`${BG_COLORS[colorIndex]} w-3 h-full rounded-t-2xl rounded-b-2xl`}
                  ></span>

                  <img
                    src={item.photoUrl || "/placeholdernew.png"}
                    alt={item.name}
                    className="w-16 h-13 object-cover rounded-md"
                  />

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs font-medium">
                      Kandidat {index + 1}
                    </span>
                    <span className="text-black text-sm font-bold truncate max-w-[180px]">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">
                      {item.voteCount} Suara
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* End left side */}

        {/* Timer Section */}

        {/* <div className="border p-4 text-center bg-white border-gray-200 rounded-2xl flex flex-col justify-around">
          <span className="text-black font-bold text-xl">
            Pemilihan Belum Berlangsung
          </span>

          <span className="text-black font-bold text-5xl">00 : 00 : 00</span>

          <button className="w-full py-2 text-white bg-red-500 rounded-lg">
            Mulai Pemilihan
          </button>
        </div> */}

        <ElectionTimer />
        {/* End Timer Section */}
      </div>
    </motion.div>
  );
};

export default VotingStats;
