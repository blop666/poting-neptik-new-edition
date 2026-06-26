import React from "react";
import { GrReturn } from "react-icons/gr";
import StarIcon from "@/components/ui/StarIcon";

const page = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-6 bg-[#FCFDFD]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-6xl w-full items-center justify-center">
        
        <div className="flex flex-col gap-6 max-w-md w-full">
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

        <div className="w-full max-w-lg bg-[#111111] rounded-[24px] p-12 min-h-[280px] shadow-sm flex flex-col items-center justify-center gap-4">
          <div className="flex flex-row gap-2 items-center justify-center w-full">
            <StarIcon className="w-4 h-4 text-white" />
            <span className="text-white text-2xl font-bold tracking-wide">Terimakasih</span>
            <StarIcon className="w-4 h-4 text-white" />
          </div>
          <p className="text-white text-center text-xl font-medium leading-relaxed max-w-xs">
            Telah menyelesaikan proses pemungutan suara.
          </p>
        </div>

      </div>
    </div>
  );
};

export default page;