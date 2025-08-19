
"use client";

import Lenis from "@studio-freight/lenis";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github } from "lucide-react";

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

interface Project {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectImgLink: string[];
  projectvideoLink: string[];
  gitHubRepoLink: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectProps {
  data: Project[];
}

// Project Dialog Component
interface ProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageFitMode, setImageFitMode] = useState<'contain' | 'cover'>('contain');

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll and save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll and position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.projectImgLink.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.projectImgLink.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTechnologies = (description: string) => {
    // Extract potential technologies from description
    const techKeywords = [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'MongoDB', 'Express',
      'Arduino', 'ESP8266', 'IoT', 'Python', 'Java', 'C++', 'HTML', 'CSS', 'Tailwind',
      'Framer Motion', 'API', 'REST', 'GraphQL', 'Firebase', 'AWS', 'Docker', 'Git'
    ];
    
    return techKeywords.filter(tech => 
      description.toLowerCase().includes(tech.toLowerCase())
    );
  };

  const technologies = getTechnologies(project.projectDescription);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-3xl xl:max-w-[90vw] 2xl:max-w-[85vw] max-h-[95vh] bg-black border-gray-800 shadow-2xl p-0 overflow-hidden">
        <div className="flex flex-col h-[90vh] max-h-[90vh]">
          <DialogHeader className="px-6 lg:px-8 pt-6 pb-4 border-b border-slate-700/50 shrink-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight break-words">
                  {project.projectTitle}
                </DialogTitle>
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-full">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                    <span className="text-orange-300 text-xs md:text-sm font-medium">Featured Project</span>
                  </div>
                  {project.active && (
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-green-300 text-xs md:text-sm font-medium">Active Development</span>
                    </div>
                  )}
                  {project.projectImgLink.length > 1 && (
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-full">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21,15 16,10 5,21"/>
                      </svg>
                      <span className="text-slate-300 text-xs md:text-sm">{project.projectImgLink.length} Images</span>
                    </div>
                  )}
                </div>
              </div>
             
            </div>
          </DialogHeader>
          
          <div 
            className="flex-1 overflow-y-scroll overscroll-contain custom-scrollbar" 
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarGutter: 'stable'
            }}
            onWheel={(e) => {
              // Ensure wheel scrolling works properly
              e.stopPropagation();
            }}
          >
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 p-4 md:p-6 lg:p-8">
              {/* Image Gallery - Takes more space on larger screens */}
              <div className="xl:col-span-8 space-y-4 lg:space-y-6">
                <div className="relative group">
                  <div className="relative h-64 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[600px] rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 shadow-xl">
                    <Image
                      src={project.projectImgLink[currentImageIndex]}
                      alt={`${project.projectTitle} - Image ${currentImageIndex + 1}`}
                      fill
                      className={`object-${imageFitMode} transition-all duration-500`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 60vw"
                      priority
                    />
                    
                    {/* Professional Navigation */}
                    {project.projectImgLink.length > 1 && (
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
                    <div className="absolute bottom-3 md:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm border border-white/10">
                      {currentImageIndex + 1} of {project.projectImgLink.length}
                    </div>

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
                      onClick={() => window.open(project.projectImgLink[currentImageIndex], '_blank')}
                      className="absolute top-3 md:top-4 lg:top-6 left-3 md:left-4 lg:left-6 bg-black/80 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10"
                      aria-label="View fullscreen"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Professional Thumbnail Strip */}
                  {project.projectImgLink.length > 1 && (
                    <div className="mt-4">
                      <div className="flex gap-2 md:gap-3 lg:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {project.projectImgLink.map((img, index) => (
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

              {/* Project Details - Responsive sidebar */}
              <div className="xl:col-span-4 space-y-4 lg:space-y-6">
                {/* Technology Stack */}
                {technologies.length > 0 && (
                  <div className="p-4 md:p-5 lg:p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400 md:w-5 md:h-5">
                        <polygon points="12,2 2,7 12,12 22,7 12,2"/>
                        <polyline points="2,17 12,22 22,17"/>
                        <polyline points="2,12 12,17 22,12"/>
                      </svg>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-1 bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-200 rounded-full text-xs md:text-sm font-medium border border-slate-600/50 hover:border-orange-500/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Description */}
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
                    {project.projectDescription}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.a
                    href={project.gitHubRepoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl border border-orange-500/20 text-sm md:text-base"
                  >
                    <Github size={18} className="md:w-5 md:h-5" />
                    View Source Code
                    <ExternalLink size={14} className="opacity-60 md:w-4 md:h-4" />
                  </motion.a>
                  
                  {project.projectvideoLink && project.projectvideoLink.length > 0 && (
                    <motion.a
                      href={project.projectvideoLink[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl border border-slate-600/50 text-sm md:text-base"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                        <polygon points="5,3 19,12 5,21 5,3"/>
                      </svg>
                      Watch Demo
                      <ExternalLink size={14} className="opacity-60 md:w-4 md:h-4" />
                    </motion.a>
                  )}
                </div>

                {/* Project Metadata */}
                {(project.createdAt || project.updatedAt) && (
                  <div className="p-4 md:p-5 lg:p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400 md:w-5 md:h-5">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      Timeline
                    </h4>
                    <div className="space-y-3">
                      {project.createdAt && (
                        <div className="flex items-center justify-between text-xs md:text-sm">
                          <span className="text-slate-400 font-medium">Created</span>
                          <span className="text-slate-200">{formatDate(project.createdAt)}</span>
                        </div>
                      )}
                      {project.updatedAt && (
                        <div className="flex items-center justify-between text-xs md:text-sm">
                          <span className="text-slate-400 font-medium">Last Updated</span>
                          <span className="text-slate-200">{formatDate(project.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 border border-orange-500/30 hover:border-orange-500/50 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/10 z-50"
          onClick={onClose}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)",
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close dialog"
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
      </DialogContent>
    </Dialog>
  );
};

// Theme card colors - Orange, Black, White, Gray
const cardColors = [
  "rgba(251, 146, 60, 0.08)", // Orange
  "rgba(31, 41, 55, 0.08)", // Dark Gray/Black
  "rgba(255, 255, 255, 0.02)", // White (very subtle)
  "rgba(107, 114, 128, 0.08)", // Gray
  "rgba(249, 115, 22, 0.08)", // Darker Orange
  "rgba(17, 24, 39, 0.08)", // Black
  "rgba(156, 163, 175, 0.08)", // Light Gray
];

// Theme border colors - Orange, Black, White, Gray
const borderColors = [
  "rgba(251, 146, 60, 0.3)", // Orange
  "rgba(31, 41, 55, 0.3)", // Dark Gray/Black
  "rgba(255, 255, 255, 0.2)", // White
  "rgba(107, 114, 128, 0.3)", // Gray
  "rgba(249, 115, 22, 0.3)", // Darker Orange
  "rgba(17, 24, 39, 0.3)", // Black
  "rgba(156, 163, 175, 0.3)", // Light Gray
];

// const headerVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

export default function Projects({
  data,
}: ProjectProps): React.ReactElement | null {
  const container = useRef(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  console.log("Project Data:", data);

  // Inject custom styles
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = dialogStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeProjectDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!data || data.length === 0) return null;

  // Split projects into two columns
  const leftProjects = data.filter((_, index) => index % 2 === 0);
  const rightProjects = data.filter((_, index) => index % 2 === 1);

  return (
    <>
      <main ref={container} className="max-w-4xl mx-auto">
        {/* Projects Section - Two Columns */}
        <section className="relative px-6 md:px-12 mb-30 ">
          <div className="w-full mx-auto">
            <div className="mb-16">
              <SectionTitle
                title="Featured Projects"
                description="Explore my carefully crafted projects that showcase creativity, 
                technical expertise, and attention to detail."
              />
            </div>
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="sm:hidden block mx-auto">
                {data.map((project, i) => {
                  const originalIndex = data.findIndex(
                    (p) => p._id === project._id
                  );
                  const targetScale = 1 - (data.length - i) * 0.02;
                  return (
                    <Card
                      key={project._id}
                      i={originalIndex}
                      project={project}
                      url={project.projectImgLink[0]}
                      src={project.gitHubRepoLink}
                      title={project.projectTitle}
                      cardColor={cardColors[originalIndex % cardColors.length]}
                      borderColor={
                        borderColors[originalIndex % borderColors.length]
                      }
                      description={project.projectDescription}
                      progress={scrollYProgress}
                      range={[i * 0.12, 1]}
                      targetScale={targetScale}
                      totalCards={rightProjects.length}
                      columnIndex={i}
                      onCardClick={openProjectDialog}
                    />
                  );
                })}
              </div>


              {/* Left Column */}
              <div className="sm:flex-1 hidden sm:block space-y-3">
                {leftProjects.map((project, i) => {
                  const originalIndex = data.findIndex(
                    (p) => p._id === project._id
                  );
                  const targetScale = 1 - (leftProjects.length - i) * 0.02;
                  return (
                    <Card
                      key={project._id}
                      i={originalIndex}
                      project={project}
                      url={project.projectImgLink[0]}
                      src={project.gitHubRepoLink}
                      title={project.projectTitle}
                      cardColor={cardColors[originalIndex % cardColors.length]}
                      borderColor={
                        borderColors[originalIndex % borderColors.length]
                      }
                      description={project.projectDescription}
                      progress={scrollYProgress}
                      range={[i * 0.12, 1]}
                      targetScale={targetScale}
                      totalCards={leftProjects.length}
                      columnIndex={i}
                      onCardClick={openProjectDialog}
                    />
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="sm:flex-1 hidden sm:block space-y-3" style={{ marginTop: "80px" }}>
                {rightProjects.map((project, i) => {
                  const originalIndex = data.findIndex(
                    (p) => p._id === project._id
                  );
                  const targetScale = 1 - (rightProjects.length - i) * 0.02;
                  return (
                    <Card
                      key={project._id}
                      i={originalIndex}
                      project={project}
                      url={project.projectImgLink[0]}
                      src={project.gitHubRepoLink}
                      title={project.projectTitle}
                      cardColor={cardColors[originalIndex % cardColors.length]}
                      borderColor={
                        borderColors[originalIndex % borderColors.length]
                      }
                      description={project.projectDescription}
                      progress={scrollYProgress}
                      range={[i * 0.12, 1]}
                      targetScale={targetScale}
                      totalCards={rightProjects.length}
                      columnIndex={i}
                      onCardClick={openProjectDialog}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Project Dialog */}
      <ProjectDialog
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={closeProjectDialog}
      />
    </>
  );
}

interface CardProps {
  i: number;
  project: Project;
  title: string;
  description: string;
  src: string;
  url: string;
  cardColor: string;
  borderColor: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  totalCards: number;
  columnIndex: number;
  onCardClick: (project: Project) => void;
}

export const Card: React.FC<CardProps> = ({
  i,
  project,
  title,
  description,
  url,
  cardColor,
  borderColor,
  progress,
  range,
  targetScale,
  columnIndex,
  onCardClick,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = 1;

  const handleCardClick = () => {
    onCardClick(project);
  };

  return (
    <div
      ref={container}
      className="sticky top-4 mb-6"
      style={{
        height: "auto",
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: `${columnIndex * 12}px`,
        }}
        className="relative w-full"
      >
        <motion.div 
          className="relative backdrop-blur-xl bg-white/[0.02] rounded-xl border border-white/[0.05] shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer max-w-xs sm:max-w-full"
          onClick={handleCardClick}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Subtle Card Background */}
          <div
            className="absolute inset-0 backdrop-blur-2xl rounded-xl max-w-xs sm:max-w-full"
            style={{
              backgroundColor: cardColor,
            }}
          />

          {/* Border effect */}
          <div
            className="absolute inset-0 rounded-xl border max-w-xs sm:max-w-full"
            style={{
              borderColor: borderColor,
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 sm:max-w-lg max-w-full mx-auto">
            {/* Project Image */}
            <div className="relative mb-6">
              <div className="relative h-64 md:h-72 rounded-lg overflow-hidden bg-slate-800/20 backdrop-blur-sm border border-slate-700/20">
                <motion.div
                  className="relative w-full h-full"
                  style={{ scale: imageScale }}
                >
                  <Image
                    src={url}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Click indicator */}
                <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4">
              {/* Project Number and Category */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{
                      backgroundColor: borderColor.replace("0.3", "0.8"),
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-400 text-sm uppercase tracking-wider font-medium">
                    Project
                  </span>
                </div>
                {project.projectImgLink.length > 1 && (
                  <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
                    +{project.projectImgLink.length - 1} more
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-tight group-hover:text-slate-100 transition-colors duration-300">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                {description}
              </p>

              {/* CTA */}
              <div className="pt-2">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm w-full justify-center"
                  style={{
                    backgroundColor: borderColor.replace("0.3", "0.7"),
                  }}
                >
                  View Details
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

          {/* Hover effect */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundColor: cardColor.replace("0.08", "0.12"),
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
