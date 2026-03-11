"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/Nevtik.png";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[95%] max-w-400 mx-auto relative">
      <nav className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3 bg-[#1a1a1a] rounded-full shadow-md">
        <Link href="/" className="flex shrink-0">
          <Image
            src={logo}
            alt="Nevtik Logo"
            width={38}
            height={38}
            className="md:w-11.25 md:h-11.25"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-16 text-base lg:text-lg xl:text-xl font-medium text-gray-200">
          <Link
            href="/"
            className="text-white hover:text-red-400 transition-colors"
          >
            Home
          </Link>
          <Link href="#about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link
            href="#achievement"
            className="hover:text-white transition-colors"
          >
            Achievement
          </Link>
          <Link href="#team" className="hover:text-white transition-colors " >
            Team
          </Link>
        </div>

        <Link
          href="#contact"
          className="hidden lg:inline-block px-4 py-1.5 xl:px-5 xl:py-2 text-base lg:text-lg xl:text-xl font-semibold text-white bg-[#ef232f] hover:bg-[#d91f2a] rounded-full transition-colors"
        >
          Contact
        </Link>

        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 bg-[#1a1a1a] rounded-3xl px-6 py-4 text-lg font-medium text-gray-200">
          <Link
            href="/"
            className="py-2 text-white hover:text-red-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#about"
            className="py-2 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="#achievement"
            className="py-2 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Achievement
          </Link>
          <Link
            href="#team"
            className="py-2 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Team
          </Link>
          <Link
            href="#contact"
            className="mt-2 px-6 py-2.5 text-center font-semibold text-white bg-[#ef232f] hover:bg-[#d91f2a] rounded-full transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
