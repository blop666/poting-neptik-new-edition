"use client";

import React from "react";
import { ButtonDashboard } from "../ui/button";
import { IoIosStats } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ButtonLogOut } from "../ui/button";
import { CiLogout } from "react-icons/ci";

export const SidebarDashboard = () => {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className="w-1/4 px-4 py-10 bg-[#171B1A] backdrop-blur-2xl rounded-xl flex flex-col h-auto border "
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
        className="flex flex-row gap-4 items-center"
      >
        <img src="/Nevtik.png" alt="" className="w-12 h-12" />
        <span
          className="text-xl text-white"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Nevtik Academy
        </span>
      </motion.div>
      <motion.hr
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        className="text-white mt-4"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.8, ease }}
        className="flex flex-col justify-between  h-full w-full"
      >
        <div className="flex flex-col gap-4 py-4">
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

        <ButtonLogOut name="Log Out" logo={CiLogout} />
      </motion.div>
    </motion.div>
  );
};
