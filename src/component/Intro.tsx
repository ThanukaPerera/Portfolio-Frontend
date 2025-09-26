"use client";

import React, { memo, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RotatingTextDemo from "./RotatingText";

// Font configuration
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

// Type definitions
interface IntroData {
  readonly _id: string;
  readonly welcomeText: string;
  readonly fname: string;
  readonly lname: string;
  readonly title: string;
  readonly tagline: string;
  readonly resumeLink: string;
  readonly imgLink: string;
}

interface IntroProps {
  readonly data: IntroData;
  readonly className?: string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
} as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
} as const;

const nameVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
} as const;

const imageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0, filter: "blur(8px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      duration: 1.2,
      delay: 0.4,
    },
  },
} as const;

const floatingVariants: Variants = {
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  },
} as const;

// Main Intro component
const Intro = memo<IntroProps>(({ data, className }) => {
  

  const { fname, lname, welcomeText, title, tagline, resumeLink, imgLink } =
    data;
  const fullName = useMemo(() => `${fname} ${lname}`, [fname, lname]);
  const imageAlt = useMemo(
    () => `${fullName} - Professional Portrait`,
    [fullName]
  );

  if (!data) {
    console.warn("Intro component: No data provided");
    return null;
  }

  return (
    <section
      className={cn(
        "relative min-h-screen overflow-hidden  mx-auto w-full",
        className
      )}
      aria-label="Professional Introduction"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-950/10 via-transparent to-transparent" />

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-between gap-8 max-w-5xl mx-auto px-8 lg:gap-16 max-sm:flex-col max-sm:justify-center max-sm:gap-12 max-sm:px-6 max-sm:py-16">
        {/* Text Content Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col flex-1 gap-6 max-w-5xl max-sm:w-full max-sm:items-center max-sm:text-center max-sm:order-2"
        >
          {/* Welcome Badge */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 max-sm:items-center"
          >
            <motion.div className="inline-flex items-center gap-3 px-0 py-2">
              <span className="text-gray-300 text-xl  ">{welcomeText}</span>
            </motion.div>

            {/* Name with Enhanced Gradient */}
            <motion.h1
              variants={nameVariants}
              className={cn(
                "text-6xl font-bold leading-[0.9] tracking-tight max-sm:text-4xl",
                montserrat.className
              )}
            >
              <span className="block text-white text-6xl bg-clip-text bg-size-200 animate-gradient-x">
                {fullName}
              </span>
            </motion.h1>
          </motion.div>

          {/* Professional Title */}
          <motion.div
            variants={itemVariants}
            className="text-xl font-medium leading-relaxed max-sm:text-lg"
          >
            <RotatingTextDemo data={title} />
          </motion.div>

          {/* Professional Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-400 leading-relaxed max-w-lg max-sm:text-sm max-sm:max-w-xl"
          >
            {tagline}
          </motion.p>

          {/* Call-to-Action */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-4 max-sm:flex-col max-sm:w-full"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold shadow-lg hover:shadow-orange-500/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-4 rounded-xl border border-orange-400/30 hover:border-orange-300/50"
            >
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${fullName}'s Resume`}
              >
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Professional Image Section */}

        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative flex-shrink-0 max-w-xl max-sm:w-full flex justify-center items-center max-sm:order-1 "
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative"
          >
            {/* Subtle Glow Effects */}
            <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/10 via-gray-500/15 to-orange-500/10 rounded-full blur-2xl opacity-70" />

            {/* Main Image Container */}
            <motion.div
              className="relative w-100 h-100 max-sm:w-80 max-sm:h-80"
              whileHover={{
                scale: 1.04,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Professional Border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full p-1 shadow-2xl shadow-orange-500/40"
                whileHover={{
                  background:
                    "linear-gradient(45deg, rgb(249 115 22), rgb(239 68 68), rgb(249 115 22))",
                  boxShadow:
                    "0 0 40px rgba(249, 115, 22, 0.8), 0 0 80px rgba(239, 68, 68, 0.5), 0 0 120px rgba(249, 115, 22, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full bg-black rounded-full p-1 overflow-hidden">
                  <motion.div
                    className="relative w-full h-full rounded-full overflow-hidden"
                    whileHover={{
                      scale: 1.08,
                      transition: { duration: 0.5, ease: "easeOut" },
                    }}
                  >
                    <Image
                      src={imgLink}
                      alt={imageAlt}
                      fill
                      className="rounded-full object-cover filter brightness-105 contrast-105"
                      sizes="(max-width: 640px) 256px, 320px"
                      priority
                      quality={95}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Minimal Decorative Elements */}
          <motion.div
            className="absolute top-8 right-2 w-10 h-10 z-[-2] bg-gradient-to-br from-orange-500/10 to-gray-500/10 rounded-md rotate-12 backdrop-blur-sm border border-white/5"
            animate={{
              rotate: [12, 20, 12],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
});

Intro.displayName = "Intro";

export default Intro;
