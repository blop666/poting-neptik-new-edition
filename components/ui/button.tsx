"use client";

import React from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface CompType {
  name: string;
  logo: IconType;
  href: string;
}

export const ButtonDashboard = ({ name, logo: Logo, href }: CompType) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`w-full flex flex-row rounded-lg items-center  text-[#FEFEFE] py-2 gap-3 px-4 ${isActive ? "bg-red-500 text-white" : "bg-none text-[#FEFEFE]"}`}
    >
      <Logo className="w-4 h-4 text-[#FEFEFE]" />
      <span className="text-md font-medium text-[#FEFEFE]">{name}</span>
    </a>
  );
};
