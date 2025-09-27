"use client";
import React, { useRef } from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Home,
  Globe,
  GraduationCap,
  FileText,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Project {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  myContribution?: string;
  technologiesUsed: string[];
  projectImgLink: string[];
  projectVideoLink?: { [key: string]: string };
  gitHubRepoLink?: { [key: string]: string };
  otherLink?: { [key: string]: string };
  type:
    | "Individual"
    | "Team"
    | "Client"
    | "Open Source"
    | "Academic"
    | "Other";
  status: "Completed" | "In Progress" | "On Hold";
  startDate?: string;
  endDate?: string;
  active?: boolean;
}

interface ProjectProps {
  data: Project[];
}

const isValidUrl = (url: string) => {
  if (!url || typeof url !== "string") return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.error("Invalid URL:", url, e);
    return false;
  }
};

// Consistent dark theme color palette
const generateCardColors = () => {
  return {
    cardColor: "rgba(20, 16, 14, 0.8)", // Very dark orange/brown (near black) with transparency
    borderColor: "rgba(249, 115, 22, 0.4)", // Orange accent border
    accentColor: "rgba(249, 115, 22, 1)", // Solid orange for buttons and numbers
  };
};

export default function Projects({ data }: ProjectProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleCardClick = (project: Project) => {
    // Navigate to project detail page
    window.location.href = `/projects/${project._id}`;
  };

  // const getYouTubeEmbedUrl = (url: string) => {
  //   const videoId = url.match(
  //     /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  //   );
  //   return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-emerald-400";
      case "In Progress":
        return "text-orange-400";
      case "On Hold":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  // const getTypeIcon = (type: string) => {
  //   switch (type) {
  //     case 'Individual': return '👤';
  //     case 'Group': return '👥';
  //     case 'Client': return '🏢';
  //     case 'Open Source': return '🌐';
  //     case 'Academic': return '🎓';
  //     default: return '📋';
  //   }
  // };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Individual":
        return <User className="w-5 h-5 text-orange-500" />;
      case "Group":
        return <Users className="w-5 h-5 text-orange-500" />;
      case "Client":
        return <Home className="w-5 h-5 text-orange-500" />;
      case "Open Source":
        return <Globe className="w-5 h-5 text-orange-500" />;
      case "Academic":
        return <GraduationCap className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-orange-500" />;
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mx-auto items-center min-h-screen max-w-7xl py-12 px-4 ">
      <div className="text-center mb-8">
        <SectionTitle
          title="Featured Projects"
          description="Explore my carefully crafted projects that showcase creativity, technical expertise, and attention to detail."
        />
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        {/* Custom Navigation Buttons */}
        <motion.button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm border border-orange-500/50 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500/20 transition-all duration-200 text-white"
          aria-label="Previous slide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm border border-orange-500/50 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500/20 transition-all duration-200 text-white"
          aria-label="Next slide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet !w-3 !h-3 !bg-gray-500 !opacity-50",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-orange-500 !opacity-100",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="!pb-12"
        >
          {data.map((project, index) => {
            const colors = generateCardColors();

            return (
              <SwiperSlide key={project._id}>
                <div className="h-full">
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="relative backdrop-blur-xl rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 h-[500px] flex flex-col"
                      whileTap={{ scale: 0.98 }}
                      style={{
                        backgroundColor: "rgba(20, 16, 14, 0.95)", // Very dark orange/brown near black
                        border: `1px solid ${colors.borderColor}`,
                      }}
                    >
                      {/* Subtle Card Background Overlay */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-30"
                        style={{
                          backgroundColor: colors.cardColor,
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 p-6 flex flex-col h-full ">
                        {/* Project Image */}
                        <div className="relative mb-4 flex-shrink-0">
                          <div className="relative h-48 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm border border-orange-500/20">
                            <motion.div
                              className="relative w-full h-full"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              {isValidUrl(project.projectImgLink[0]) ? (
                                <Image
                                  src={project.projectImgLink[0]}
                                  alt={project.projectTitle}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
                                  <span className="text-gray-400 text-sm">
                                    No image
                                  </span>
                                </div>
                              )}
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                            {/* Click indicator */}
                            <div className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15,3 21,3 21,9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="flex flex-col flex-1 space-y-3 min-h-0">
                          {/* Project Header with Type, Status, and Number */}
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center gap-2">
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-black text-sm font-bold"
                                style={{
                                  backgroundColor: colors.accentColor,
                                }}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                                Project
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* <span className="text-lg">{getTypeIcon(project.type)}</span> */}
                              {getTypeIcon(project.type)}
                              <span
                                className={`text-xs font-semibold ${getStatusColor(
                                  project.status
                                )}`}
                              >
                                {project.status}
                              </span>
                              
                            </div>
                          </div>

                          {/* Title and Type */}
                          <div>
                            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-gray-100 transition-colors duration-300">
                              {project.projectTitle}
                            </h3>
                            <p className="text-sm text-orange-400 mt-1">
                              {project.type} Project
                            </p>
                          </div>

                          {/* Technologies Used */}
                          {project.technologiesUsed &&
                            project.technologiesUsed.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {project.technologiesUsed
                                  .slice(0, 6)
                                  .map((tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded-md border border-orange-500/30"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                {project.technologiesUsed.length > 6 && (
                                  <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded-md">
                                    +{project.technologiesUsed.length - 6} more
                                  </span>
                                )}
                              </div>
                            )}



                          {/* Action Links */}
                          <div className="pt-4 space-y-2 flex-shrink-0 mt-auto">
                            
                            {/* Main CTA */}
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(project);
                              }}
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              className="inline-flex items-center gap-2 text-black px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm w-full justify-center cursor-pointer"
                              style={{
                                backgroundColor: colors.accentColor,
                              }}
                            >
                              View Project Details
                              <motion.svg
                                width="12"
                                height="12"
                                viewBox="0 0 22 12"
                                fill="none"
                                className="ml-1"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <path
                                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                                  fill="currentColor"
                                />
                              </motion.svg>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
