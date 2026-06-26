"use client";
import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import OurTeamsSection from "@/components/our-teams-section";
import VisionMissionSection from "@/components/vision-mission-section";
import DivisionsSection from "@/components/divisions-section";
import Achivement from "@/components/achivement";
import ContactUs from "@/components/contact-us";

import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import VotingSection from "@/components/voting-section";

export default function Home() {
  useEffect(()=>{
    emailjs.init({publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY})
  },[])
  return (
    <div className="pt-10">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <OurTeamsSection />
      <VisionMissionSection />
      <DivisionsSection />
      <Achivement />
      <VotingSection />
      <ContactUs />
    </div>
  );
}
