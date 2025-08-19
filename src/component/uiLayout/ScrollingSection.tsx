"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/component/SectionTitle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Achievement {
  _id: string;
  achievementtitle: string;
  active: boolean;
  certification?: string;
  date?: string; // ISO date string
  description?: string;
  imgLink?: string[];
  updatedAt?: string;

  // optional extra fields your backend may return
  organization?: string;
  location?: string;
  category?: string;
  link?: string;
}


const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export default function ScrollingSection(): React.ReactElement {
  const lenisRef = useRef<Lenis | null>(null);
  const [achievementData, setAchievementData] = useState<Achievement[] | null>(
    null
  );
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const achievementRes = await axios.get(`${API_BASE}/achievements`, {
          headers: { "Cache-Control": "no-store" },
        });

        setAchievementData(achievementRes.data.response);
        console.log("Achievement Data:", achievementRes.data.response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Memoize split arrays for efficiency - MUST be before early return
  const { leftColumnAchievements, rightColumnAchievements } = useMemo(() => {
    if (!achievementData || achievementData.length === 0) {
      return { leftColumnAchievements: [], rightColumnAchievements: [] };
    }
    const midpoint = Math.ceil(achievementData.length / 2);
    return {
      leftColumnAchievements: achievementData.slice(midpoint),
      rightColumnAchievements: achievementData.slice(0, midpoint)
    };
  }, [achievementData]);

  // Memoize dialog handlers - MUST be before early return
  const openAchievementDialog = useCallback((achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsDialogOpen(true);
    lenisRef.current?.stop();
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedAchievement(null);
    lenisRef.current?.start();
  }, []);

  if (!achievementData) {
    return (
      <div className="text-white h-screen grid place-content-center">
        <motion.div
          className="text-2xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative">
      <div className="wrapper">{/* Your other sections would go here */}</div>

      <section className="text-white w-full relative overflow-hidden py-20">
        {/* Subtle floating elements with orange-red theme */}
        <motion.div
          className="absolute top-32 left-24 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-24 w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional subtle accents */}
        <motion.div
          className="absolute top-1/3 left-8 w-6 h-6 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-8 w-4 h-4 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-sm rotate-45"
          animate={{
            rotate: [45, 75, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="sm:grid grid-cols-1 relative z-10 sm:grid-cols-2 gap-8">
          <div className=" hidden sm:flex sticky top-0 h-screen  items-center justify-center my-auto max-lg:h-auto max-lg:relative max-lg:py-16">
            <div className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              <SectionTitle title="Life Events & Volunteering" description="" />
            </div>
          </div>

          <div className="mb-30 sm:hidden">
            <SectionTitle title="Life Events & Volunteering" description="" />
          </div>

          {/* Combined scrolling sections in left-right grid */}
          <div className="max-sm:hidden grid sm:grid-cols-2 px-4 ">
            {/* Left column - second half of achievements with offset */}
            <div className="grid gap-6 mt-[26rem] max-lg:mt-[20rem] max-md:mt-0">
              {leftColumnAchievements.map((achievement, index) => {
                const isEven = index % 2 === 0;
                const clipId = `skew-clip-2-${achievement._id}`;
                const overlayClipId = `overlay-clip-2-${achievement._id}`;
                return (
                  <motion.figure
                    key={achievement._id}
                    className="flex justify-center relative cursor-pointer group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openAchievementDialog(achievement)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay:
                        (index + leftColumnAchievements.length) * 0.1,
                    }}
                  >
                    <div className="relative w-80 h-96 max-w-full">
                      {/* Fixed: Neon glow effect with same clip path */}
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ clipPath: `url(#${clipId})` }}
                        animate={{
                          filter: [
                            "blur(8px) brightness(1)",
                            "blur(12px) brightness(1.2)",
                            "blur(8px) brightness(1)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Fixed: Enhanced border with same clip path */}
                      <div
                        className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                        style={{ clipPath: `url(#${clipId})` }}
                      />

                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <clipPath id={clipId}>
                            {isEven ? (
                              <polygon points="0,0 280,0 320,384 40,384" />
                            ) : (
                              <polygon points="40,0 320,0 280,384 0,384" />
                            )}
                          </clipPath>
                        </defs>
                      </svg>

                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <clipPath id={overlayClipId}>
                            {isEven ? (
                              <polygon points="0,0 280,0 320,384 40,384" />
                            ) : (
                              <polygon points="40,0 320,0 280,384 0,384" />
                            )}
                          </clipPath>
                        </defs>
                      </svg>

                      <motion.div
                        className="relative z-10"
                        whileHover={{
                          filter: "brightness(1.1) saturate(1.1)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={
                            achievement.imgLink?.[0] ||
                            "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop"
                          }
                          alt={achievement.achievementtitle || ""}
                          width={320}
                          height={384}
                          className="transition-all duration-300 w-full h-full align-bottom object-cover group-hover:brightness-110"
                          style={{ clipPath: `url(#${clipId})` }}
                        />
                      </motion.div>

                      {/* Fixed: Text overlay with proper clipping and skew transform */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                        style={{ clipPath: `url(#${overlayClipId})` }}
                      >
                        <div
                          className={`w-full ${
                            isEven
                              ? "transform skew-x-12  px-14 py-8"
                              : "transform -skew-x-12  py-8 px-6"
                          }`}
                        >
                          <h3
                            className={`text-md font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent leading-tight ${
                              isEven
                                ? "transform -skew-x-12"
                                : "transform skew-x-12"
                            }`}
                          >
                            {achievement.achievementtitle}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.figure>
                );
              })}
            </div>

            {/* Right column - first half of achievements */}
            <div className="grid gap-6">
              {rightColumnAchievements.map((achievement, index) => {
                const isEven = index % 2 === 0;
                const clipId = `skew-clip-1-${achievement._id}`;
                const overlayClipId = `overlay-clip-1-${achievement._id}`;
                return (
                  <motion.figure
                    key={achievement._id}
                    className="flex justify-center relative cursor-pointer group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openAchievementDialog(achievement)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative w-80 h-96 max-w-full">
                      {/* Fixed: Neon glow effect with same clip path */}
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ clipPath: `url(#${clipId})` }}
                        animate={{
                          filter: [
                            "blur(8px) brightness(1)",
                            "blur(12px) brightness(1.2)",
                            "blur(8px) brightness(1)"
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Fixed: Enhanced border with same clip path */}
                      <div
                        className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                        style={{ clipPath: `url(#${clipId})` }}
                      />

                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <clipPath id={clipId}>
                            {isEven ? (
                              <polygon points="40,0 320,0 280,384 0,384" />
                            ) : (
                              <polygon points="0,0 280,0 320,384 40,384" />
                            )}
                          </clipPath>
                        </defs>
                      </svg>

                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <clipPath id={overlayClipId}>
                            {isEven ? (
                              <polygon points="40,0 320,0 280,384 0,384" />
                            ) : (
                              <polygon points="0,0 280,0 320,384 40,384" />
                            )}
                          </clipPath>
                        </defs>
                      </svg>

                      <motion.div
                        className="relative z-10"
                        whileHover={{
                          filter: "brightness(1.1) saturate(1.1)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={
                            achievement.imgLink?.[0] ||
                            "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop"
                          }
                          alt={achievement.achievementtitle || ""}
                          width={320}
                          height={384}
                          className="transition-all duration-300 w-full h-full align-bottom object-cover group-hover:brightness-110"
                          style={{ clipPath: `url(#${clipId})` }}
                        />
                      </motion.div>

                      {/* Fixed: Text overlay with proper clipping and skew transform */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                        style={{ clipPath: `url(#${overlayClipId})` }}
                      >
                        <div
                          className={` w-full ${
                            isEven
                              ? "transform -skew-x-12 py-8 px-6 "
                              : "transform skew-x-12 px-14 py-8"
                          }`}
                        >
                          <h3
                            className={`text-md font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent leading-tight ${
                              isEven
                                ? "transform skew-x-12"
                                : "transform -skew-x-12"
                            }`}
                          >
                            {achievement.achievementtitle}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.figure>
                );
              })}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="sm:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
            {achievementData.map((achievement, index) => {
              const isEven = index % 2 === 0;
              const clipId = `skew-clip-${achievement._id}`;
              const overlayClipId = `overlay-clip-${achievement._id}`;

              return (
                <motion.figure
                  key={achievement._id}
                  className="flex justify-center relative cursor-pointer group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openAchievementDialog(achievement)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative w-80 h-96 max-w-full">
                    {/* Neon glow effect */}
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ clipPath: `url(#${clipId})` }}
                      animate={{
                        filter: [
                          "blur(8px) brightness(1)",
                          "blur(12px) brightness(1.2)",
                          "blur(8px) brightness(1)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Border */}
                    <div
                      className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                      style={{ clipPath: `url(#${clipId})` }}
                    />

                    {/* Clipping paths */}
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <clipPath id={clipId}>
                          {isEven ? (
                            <polygon points="0,0 280,0 320,384 40,384" />
                          ) : (
                            <polygon points="40,0 320,0 280,384 0,384" />
                          )}
                        </clipPath>
                      </defs>
                    </svg>

                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <clipPath id={overlayClipId}>
                          {isEven ? (
                            <polygon points="0,0 280,0 320,384 40,384" />
                          ) : (
                            <polygon points="40,0 320,0 280,384 0,384" />
                          )}
                        </clipPath>
                      </defs>
                    </svg>

                    {/* Image */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{
                        filter: "brightness(1.1) saturate(1.1)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={
                          achievement.imgLink?.[0] ||
                          "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop"
                        }
                        alt={achievement.achievementtitle || ""}
                        width={320}
                        height={384}
                        className="transition-all duration-300 w-full h-full object-cover group-hover:brightness-110"
                        style={{ clipPath: `url(#${clipId})` }}
                      />
                    </motion.div>

                    {/* Overlay text */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                      style={{ clipPath: `url(#${overlayClipId})` }}
                    >
                      <div
                        className={`w-full ${
                          isEven
                            ? "transform skew-x-12 px-14 py-8"
                            : "transform -skew-x-12 py-8 px-6"
                        }`}
                      >
                        <h3
                          className={`text-md font-bold text-white bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent leading-tight ${
                            isEven
                              ? "transform -skew-x-12"
                              : "transform skew-x-12"
                          }`}
                        >
                          {achievement.achievementtitle}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Dialog Implementation with neon theme */}
      <AnimatePresence>
        {isDialogOpen && selectedAchievement && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-50 cursor-pointer backdrop-blur-sm"
              onClick={closeDialog}
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-orange-500/30 rounded-xl shadow-2xl backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow:
                  "0 0 40px rgba(249, 115, 22, 0.3), 0 0 80px rgba(239, 68, 68, 0.2)",
              }}
            >
              {/* Enhanced border with gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-xl opacity-50" />
              <div className="relative bg-black/90 rounded-xl overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={
                      selectedAchievement.imgLink?.[0] ||
                      "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop"
                    }
                    alt={selectedAchievement.achievementtitle || ""}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-t-xl" />
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                      {selectedAchievement.achievementtitle}
                    </h2>
                    {selectedAchievement.date && (
                      <p className="text-gray-300 mt-1">
                        {new Date(
                          selectedAchievement.date
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    {selectedAchievement.description && (
                      <p className="text-gray-300 leading-relaxed">
                        {selectedAchievement.description}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {selectedAchievement.organization && (
                        <div className="border border-orange-500/20 rounded-lg p-3 hover:border-orange-500/40 transition-colors">
                          <p className="text-gray-400 text-sm">Organization</p>
                          <p className="text-white">
                            {selectedAchievement.organization}
                          </p>
                        </div>
                      )}

                      {selectedAchievement.location && (
                        <div className="border border-orange-500/20 rounded-lg p-3 hover:border-orange-500/40 transition-colors">
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white">
                            {selectedAchievement.location}
                          </p>
                        </div>
                      )}

                      {selectedAchievement.category && (
                        <div className="border border-orange-500/20 rounded-lg p-3 hover:border-orange-500/40 transition-colors">
                          <p className="text-gray-400 text-sm">Category</p>
                          <p className="text-white">
                            {selectedAchievement.category}
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedAchievement.link && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          asChild
                          className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-700 text-white border-0 w-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
                          style={{
                            boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)",
                          }}
                        >
                          <a
                            href={selectedAchievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Details
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>

                <motion.button
                  className="absolute top-4 right-4 border border-orange-500/30 hover:border-orange-500/50 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/10"
                  onClick={closeDialog}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
