'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Calendar, 
  ExternalLink, 
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Github,
  Play,
  User,
  Users,
  Home,
  Globe,
  GraduationCap,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle
} from 'lucide-react';

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
  type: 'Individual' | 'Team' | 'Client' | 'Open Source' | 'Academic' | 'Other';
  status: 'Completed' | 'In Progress' | 'On Hold';
  startDate?: string;
  endDate?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageViewMode, setImageViewMode] = useState<'fit' | 'fill'>('fit');

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  const getTypeIcon = (type: string) => {
    const iconClass = "w-6 h-6 text-orange-500";
    switch (type) {
      case 'Individual': return <User className={iconClass} />;
      case 'Team': return <Users className={iconClass} />;
      case 'Client': return <Home className={iconClass} />;
      case 'Open Source': return <Globe className={iconClass} />;
      case 'Academic': return <GraduationCap className={iconClass} />;
      default: return <FileText className={iconClass} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'On Hold': return <PauseCircle className="w-5 h-5 text-red-500" />;
      default: return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'In Progress': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'On Hold': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const nextImage = () => {
    if (project.projectImgLink && project.projectImgLink.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === project.projectImgLink.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project.projectImgLink && project.projectImgLink.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.projectImgLink.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-poppins">
      <div className="container mx-auto px-4 py-8">
       

        {/* Project Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {project.projectTitle}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {getTypeIcon(project.type)}
              <span className="text-orange-400 font-medium">{project.type}</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 border rounded-full ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span className="text-sm font-medium">{project.status}</span>
            </div>
            {/* Project Duration */}
            {project.startDate && (
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {(() => {
                    const startDate = new Date(project.startDate);
                    const endDate = project.endDate ? new Date(project.endDate) : null;
                    const startStr = `${startDate.toLocaleString('default', { month: 'short' })} ${startDate.getFullYear()}`;
                    const endStr = endDate ? `${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getFullYear()}` : 'Present';
                    return `${startStr} - ${endStr}`;
                  })()}
                </span>
              </div>
            )}
          </div>

          {/* Technologies Used */}
          {project.technologiesUsed && project.technologiesUsed.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-orange-400 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologiesUsed.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Image Gallery - Before Description */}
        {project.projectImgLink && project.projectImgLink.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Project Gallery</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 max-w-2xl mx-auto">
              <div className="aspect-[16/10] relative">
                <Image
                  src={project.projectImgLink[currentImageIndex]}
                  alt={`${project.projectTitle} - Image ${currentImageIndex + 1}`}
                  fill
                  className={`transition-all duration-300 ${
                    imageViewMode === 'fit' ? 'object-contain' : 'object-cover'
                  }`}
                />
                
                {/* Navigation Controls */}
                {project.projectImgLink.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
                
                {/* View Mode Toggle */}
                <button
                  onClick={() => setImageViewMode(imageViewMode === 'fit' ? 'fill' : 'fit')}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                >
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Image Counter */}
              {project.projectImgLink.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full">
                  <span className="text-sm text-white">
                    {currentImageIndex + 1} / {project.projectImgLink.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {project.projectImgLink.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {project.projectImgLink.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? 'border-orange-500'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Project Description */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">Project Description</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-base leading-relaxed">
              {project.projectDescription}
            </p>
          </div>
        </motion.div>

        {/* My Contribution */}
        {project.myContribution && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">My Contribution</h2>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-300 text-base leading-relaxed">
                {project.myContribution}
              </p>
            </div>
          </motion.div>
        )}

        {/* Project Videos */}
        {project.projectVideoLink && Object.keys(project.projectVideoLink).length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Project Videos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(project.projectVideoLink).map(([name, url]) => {
                const embedUrl = getYouTubeEmbedUrl(url as string);
                return (
                  <div key={name} className="space-y-3">
                    <h3 className="text-lg font-medium text-orange-400">{name}</h3>
                    {embedUrl ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
                        <iframe
                          src={embedUrl}
                          title={`${project.projectTitle} - ${name}`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <a
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-orange-500/50 transition-colors"
                      >
                        <Play className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-300">Watch Video</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Links Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">Project Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GitHub Repository Links */}
            {project.gitHubRepoLink && Object.keys(project.gitHubRepoLink).length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-orange-400 mb-4 flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub Repositories
                </h3>
                <div className="space-y-3">
                  {Object.entries(project.gitHubRepoLink).map(([name, url]) => (
                    <a
                      key={name}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-orange-500/50 transition-colors group"
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {name}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Other Links */}
            {project.otherLink && Object.keys(project.otherLink).length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-orange-400 mb-4 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Other Links
                </h3>
                <div className="space-y-3">
                  {Object.entries(project.otherLink).map(([name, url]) => (
                    <a
                      key={name}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-orange-500/50 transition-colors group"
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {name}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}