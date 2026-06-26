"use client";

import React from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface CompType {
  name: string;
  logo: IconType;
  href: string;
}

export const ButtonDashboard = ({ name, logo: Logo, href }: CompType) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <motion.a
      href={href}
      className={`w-full flex flex-row rounded-lg items-center text-[#FEFEFE] py-2 gap-3 px-4 transition-colors duration-200 ${
        isActive
          ? "bg-red-500 text-white"
          : "bg-none hover:bg-white/10 text-[#FEFEFE]"
      }`}
      whileHover={{
        x: isActive ? 0 : 6,
        scale: 1.01, 
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      <Logo className="w-4 h-4 text-[#FEFEFE]" />
      <span className="text-md font-medium text-[#FEFEFE]">{name}</span>
    </motion.a>
  );
};
