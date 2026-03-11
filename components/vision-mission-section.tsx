"use client";

import { Plus, Globe } from "lucide-react";
import { motion } from "framer-motion";

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const cardHover = {
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" as const },
};

export default function VisionMissionSection() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-5 md:gap-6 w-full">
        <motion.div
          className="flex-1 bg-[#1A1D20] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 xl:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8"
            variants={fadeInUp}
            custom={0}
          >
            <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-[#ED1C24]" />
            <h2
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              Our Motto
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3 sm:gap-5">
            <div className="flex flex-col sm:flex-row sm:gap-0 gap-3 relative overflow-visible">
              <motion.div
                className="flex-1 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:pb-8 sm:pr-10 md:pr-12 jigsaw-left overflow-visible"
                variants={fadeInLeft}
                custom={0.15}
                whileHover={cardHover}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <motion.div
                    className="w-7 h-7 sm:w-9 sm:h-9 border-2 border-[#ED1C24] rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#ED1C24]" />
                  </motion.div>
                  <span className="font-bold text-[#1A1D20] text-lg sm:text-xl md:text-2xl tracking-wider">
                    SKILL
                  </span>
                </div>
                <p className="text-[#1A1D20]/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambl.
                </p>
              </motion.div>

              <motion.div
                className="flex-1 bg-[#ED1C24] rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:pb-8 sm:pl-10 md:pl-12 jigsaw-right overflow-visible"
                variants={fadeInRight}
                custom={0.3}
                whileHover={cardHover}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <motion.div
                    className="w-7 h-7 sm:w-9 sm:h-9 border-2 border-white rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                  <span className="font-bold text-white text-lg sm:text-xl md:text-2xl tracking-wider">
                    INTERGRITY
                  </span>
                </div>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                </p>
              </motion.div>
            </div>

            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:pb-8"
              variants={fadeInUp}
              custom={0.45}
              whileHover={cardHover}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <motion.div
                  className="w-7 h-7 sm:w-9 sm:h-9 bg-[#ED1C24] rounded-full flex items-center justify-center shrink-0"
                  whileHover={{ rotate: 180, scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
                <span className="font-bold text-[#1A1D20] text-lg sm:text-xl md:text-2xl tracking-wider">
                  PASSION
                </span>
              </div>
              <p className="text-[#1A1D20]/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambl.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 bg-[#1A1D20] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="mb-8 sm:mb-10 md:mb-14" variants={fadeInUp} custom={0.1}>
            <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5">
              <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#ED1C24]" />
              <h2
                className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Vision
              </h2>
            </div>
            <motion.p
              className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify"
              variants={fadeInUp}
              custom={0.2}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambl.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} custom={0.3}>
            <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5">
              <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#ED1C24]" />
              <h2
                className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Mission
              </h2>
            </div>
            <ol className="list-decimal pl-5 sm:pl-6 space-y-3 sm:space-y-4 marker:text-white/60">
              {[0, 1, 2].map((i) => (
                <motion.li
                  key={i}
                  className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify"
                  variants={scaleIn}
                  custom={0.4 + i * 0.12}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
