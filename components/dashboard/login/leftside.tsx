import React from "react";
import { GrReturn } from "react-icons/gr";


export const LeftSide = () => {
  return (
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
  );
};
