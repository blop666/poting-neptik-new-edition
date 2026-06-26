"use client";

import React from "react";
import { ButtonDashboard } from "../ui/button";
import { IoIosStats } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";

export const SidebarDashboard = () => {
  return (
    <div className="w-1/4 px-4 py-10 bg-[#171B1A] backdrop-blur-2xl rounded-xl flex flex-col h-auto border ">
      <div className="flex flex-row gap-4 items-center">
        <img src="/Nevtik.png" alt="" className="w-12 h-12" />
        <span
          className="text-xl text-white"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Nevtik Academy
        </span>
      </div>
      <hr className="text-white mt-4" />

      <div className="flex flex-col py-4 gap-4 w-full">
        <ButtonDashboard
          name="Statistik Voting"
          logo={IoIosStats}
          href="/dashboard"
        />
        <ButtonDashboard
          name="Data Voting"
          logo={FaUser}
          href="/dashboard/data-page"
        />
        <ButtonDashboard
          name="Generate Token"
          logo={FaKey}
          href="/dashboard/key-page"
        />
      </div>
    </div>
  );
};
