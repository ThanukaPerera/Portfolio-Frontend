"use client";

import Lenis from "@studio-freight/lenis";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ExternalLink, Award, Calendar, MapPin, Building2 } from "lucide-react";

// Add custom styles for the dialog
const dialogStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.4) rgba(0, 0, 0, 0.2);
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.4);
    border-radius: 6px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.6);
    background-clip: content-box;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: rgba(156, 163, 175, 0.8);
    background-clip: content-box;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .dialog-backdrop {
    backdrop-filter: blur(20px);
  }
`;

// Achievement Dialog Component
interface AchievementDialogProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

const AchievementDialog: React.FC<AchievementDialogProps> = ({ achievement, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageFitMode, setImageFitMode] = useState<'contain' | 'cover'>('contain');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset image index when achievement changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [achievement]);

  // Focus scroll container when dialog opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      // Small delay to ensure the dialog is fully rendered
      setTimeout(() => {
        scrollContainerRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!achievement) return null;

  const nextImage = () => {
    if (achievement.imgLink && achievement.imgLink.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === achievement.imgLink!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (achievement.imgLink && achievement.imgLink.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? achievement.imgLink!.length - 1 : prev - 1
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentImage = achievement.imgLink?.[currentImageIndex] || "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop";
  const hasMultipleImages = achievement.imgLink && achievement.imgLink.length > 1;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/80 z-50 cursor-pointer backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[95vw] sm:max-w-3xl xl:max-w-[90vw] 2xl:max-w-[85vw] h-[90vh] border border-orange-500/30 rounded-xl shadow-2xl backdrop-blur-sm pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow:
            "0 0 40px rgba(249, 115, 22, 0.3), 0 0 80px rgba(239, 68, 68, 0.2)",
        }}
      >
        {/* Enhanced border with gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-xl opacity-50" />
        <div className="relative bg-black/90 rounded-xl overflow-hidden w-md">
          <div className="flex flex-col max-h-[90vh] w-full">
            <div className="px-6 lg:px-8 pt-6 pb-4 border-b border-slate-700/50 flex-shrink-0">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent mb-3 leading-tight break-words">
                    {achievement.achievementtitle}
                  </h2>
                  <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-full">
                      <Award className="w-3 h-3 text-orange-400" />
                      <span className="text-orange-300 text-xs md:text-sm font-medium">Achievement</span>
                    </div>
                    {achievement.active && (
                      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-green-300 text-xs md:text-sm font-medium">Active</span>
                      </div>
                    )}
                    {hasMultipleImages && (
                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-full">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21,15 16,10 5,21"/>
                        </svg>
                        <span className="text-slate-300 text-xs md:text-sm">{achievement.imgLink!.length} Images</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto custom-scrollbar focus:outline-none" 
              style={{ 
                maxHeight: 'calc(90vh - 120px)',
                scrollBehavior: 'smooth'
              }}
              tabIndex={0}
              onWheel={(e) => {
                // Ensure wheel events work within the dialog
                e.stopPropagation();
                const target = e.currentTarget;
                const { scrollTop, scrollHeight, clientHeight } = target;
                
                // Allow default scroll behavior within bounds
                if (
                  (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight) ||
                  (e.deltaY < 0 && scrollTop <= 0)
                ) {
                  // At scroll boundaries, prevent default to avoid page scroll
                  e.preventDefault();
                }
              }}
            >
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 p-4 md:p-6 lg:p-8">
                {/* Image Gallery - Takes more space on larger screens */}
                <div className="xl:col-span-8 space-y-4 lg:space-y-6">
                  <div className="relative group">
                    <div className="relative h-64 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[600px] rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 shadow-xl">
                      <Image
                        src={currentImage}
                        alt={`${achievement.achievementtitle} - Image ${currentImageIndex + 1}`}
                        fill
                        className={`object-${imageFitMode} transition-all duration-500`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 60vw"
                        priority
                      />
                      
                      {/* Professional Navigation */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 lg:p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
                            aria-label="Previous image"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                              <polyline points="15,18 9,12 15,6"/>
                            </svg>
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 lg:p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
                            aria-label="Next image"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                              <polyline points="9,18 15,12 9,6"/>
                            </svg>
                          </button>
                        </>
                      )}
                      
                      {/* Enhanced Image Counter */}
                      {hasMultipleImages && (
                        <div className="absolute bottom-3 md:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm border border-white/10">
                          {currentImageIndex + 1} of {achievement.imgLink!.length}
                        </div>
                      )}

                      {/* Image Quality Indicator */}
                      <div className="absolute top-3 md:top-4 lg:top-6 right-3 md:right-4 lg:right-6 bg-black/80 text-white px-2 md:px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                        HD
                      </div>

                      {/* Image fit mode toggle */}
                      <button
                        onClick={() => setImageFitMode(imageFitMode === 'contain' ? 'cover' : 'contain')}
                        className="absolute top-3 md:top-4 lg:top-6 left-12 md:left-16 lg:left-20 bg-black/80 hover:bg-black/90 text-white px-2 md:px-3 py-1 md:py-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10 text-xs font-medium"
                        aria-label="Toggle image fit mode"
                        title={`Switch to ${imageFitMode === 'contain' ? 'Fill' : 'Fit'} mode`}
                      >
                        {imageFitMode === 'contain' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 3H3v18h18V3z"/>
                            <path d="M8 12l3 3 6-6"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21,15 16,10 5,21"/>
                          </svg>
                        )}
                      </button>

                      {/* Fullscreen button */}
                      <button
                        onClick={() => window.open(currentImage, '_blank')}
                        className="absolute top-3 md:top-4 lg:top-6 left-3 md:left-4 lg:left-6 bg-black/80 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10"
                        aria-label="View fullscreen"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Professional Thumbnail Strip */}
                    {hasMultipleImages && (
                      <div className="mt-4">
                        <div className="flex gap-2 md:gap-3 lg:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                          {achievement.imgLink!.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`relative w-16 h-12 md:w-20 md:h-16 lg:w-24 lg:h-18 xl:w-28 xl:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-300 hover:scale-105 ${
                                index === currentImageIndex 
                                  ? 'border-orange-500 shadow-lg shadow-orange-500/25 ring-2 ring-orange-500/30' 
                                  : 'border-slate-600 hover:border-slate-500'
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 112px"
                              />
                              {index === currentImageIndex && (
                                <div className="absolute inset-0 bg-orange-500/20" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Achievement Details - Responsive sidebar */}
                <div className="xl:col-span-4 space-y-4 lg:space-y-6">
                  {/* Certification */}
                  {achievement.certification && (
                    <div className="p-4 md:p-5 lg:p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                        Certification
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        {achievement.certification}
                      </p>
                    </div>
                  )}

                  {/* Achievement Description */}
                  {achievement.description && (
                    <div className="p-4 md:p-5 lg:p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400 md:w-5 md:h-5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14,2 14,8 20,8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10,9 9,9 8,9"/>
                        </svg>
                        Description
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        {achievement.description}
                      </p>
                    </div>
                  )}

                  {/* Achievement Details Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {achievement.organization && (
                      <div className="p-4 md:p-5 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-orange-400" />
                          <span className="text-slate-400 text-sm font-medium">Organization</span>
                        </div>
                        <p className="text-white font-medium">
                          {achievement.organization}
                        </p>
                      </div>
                    )}

                    {achievement.location && (
                      <div className="p-4 md:p-5 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-orange-400" />
                          <span className="text-slate-400 text-sm font-medium">Location</span>
                        </div>
                        <p className="text-white font-medium">
                          {achievement.location}
                        </p>
                      </div>
                    )}

                    {achievement.category && (
                      <div className="p-4 md:p-5 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400">
                            <path d="M7 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                            <path d="M7 3v4"/>
                            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                            <path d="M17 13v4"/>
                            <path d="M21 7v10"/>
                            <path d="M3 7v10"/>
                          </svg>
                          <span className="text-slate-400 text-sm font-medium">Category</span>
                        </div>
                        <p className="text-white font-medium">
                          {achievement.category}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  {achievement.link && (
                    <div className="space-y-3">
                      <motion.a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl border border-orange-500/20 text-sm md:text-base"
                      >
                        <ExternalLink size={18} className="md:w-5 md:h-5" />
                        View Details
                        <ExternalLink size={14} className="opacity-60 md:w-4 md:h-4" />
                      </motion.a>
                    </div>
                  )}

                  {/* Achievement Timeline */}
                  {(achievement.date || achievement.updatedAt) && (
                    <div className="p-4 md:p-5 lg:p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                        Timeline
                      </h4>
                      <div className="space-y-3">
                        {achievement.date && (
                          <div className="flex items-center justify-between text-xs md:text-sm">
                            <span className="text-slate-400 font-medium">Achievement Date</span>
                            <span className="text-slate-200">{formatDate(achievement.date)}</span>
                          </div>
                        )}
                        {achievement.updatedAt && (
                          <div className="flex items-center justify-between text-xs md:text-sm">
                            <span className="text-slate-400 font-medium">Last Updated</span>
                            <span className="text-slate-200">{formatDate(achievement.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <motion.button
            className="absolute top-4 right-4 border border-orange-500/30 hover:border-orange-500/50 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/10"
            onClick={onClose}
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
  );
};

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
        console.log("Achievement Data",achievementRes.data.response)
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
      // Cleanup body scroll on unmount
      document.body.style.overflow = 'unset';
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
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedAchievement(null);
    lenisRef.current?.start();
    // Restore body scroll
    document.body.style.overflow = 'unset';
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
        </div>
      </section>

      {/* Achievement Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <AchievementDialog
            achievement={selectedAchievement}
            isOpen={isDialogOpen}
            onClose={closeDialog}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
