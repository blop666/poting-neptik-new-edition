"use client";

import React from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CompType {
  name: string;
  logo: IconType;
  href: string;
}

interface logOutType {
  name: string;
  logo: IconType;
}

const ButtonDashboard = ({ name, logo: Logo, href }: CompType) => {
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

const ButtonLogOut = ({ name, logo: Logo }: logOutType) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    try {
      localStorage.removeItem("admin_token");
      router.push("/login/admin");

      setIsConfirm(true);
      if (isConfirm) {
        toast.error("error, cant Log out");
      } else {
        toast.success("Successfull Log Out");
      }
    } catch (error) {
      console.error("Terjadi Error ketika logout: ", error);
    }
  };

  return (
    <motion.button
      onClick={handleSubmit}
      className="w-full cursor-pointer flex flex-row rounded-lg items-center  py-3 gap-3 px-4 transition-colors duration-200 bg-[#171B1A]/80 border border-white/50  text-white"
      initial={{
        x: 0,
        scale: 1,
      }}
      whileHover={{
        x: 6,
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
    </motion.button>
  );
};

export { ButtonDashboard, ButtonLogOut };
