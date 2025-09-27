'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { 
  Calendar, 
  Award, 
  ExternalLink, 
  MapPin, 
  Building2, 
  Tag, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useAchievements} from '@/contexts/AchievementContext';

interface AchievementDetailProps {
  id: string;
}

export default function AchievementDetail({ id }: AchievementDetailProps) {
  const { achievements } = useAchievements();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageViewMode, setImageViewMode] = useState<'fit' | 'fill'>('fit');

  // Find the achievement from the context data
  const achievement = achievements.find(achievement => achievement._id === id);
  const loading = false; // No loading since data comes from context
  const error = !achievement ? 'Achievement not found' : null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const nextImage = () => {
    if (achievement?.imgLink && achievement.imgLink.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === achievement.imgLink!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (achievement?.imgLink && achievement.imgLink.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? achievement.imgLink!.length - 1 : prev - 1
      );
    }
  };

  const getCategoryColor = (category?: string) => {
    const colors: { [key: string]: string } = {
      'certification': 'from-orange-500 to-red-500',
      'award': 'from-yellow-500 to-orange-500',
      'volunteering': 'from-green-500 to-emerald-500',
      'competition': 'from-blue-500 to-cyan-500',
      'default': 'from-gray-500 to-gray-600'
    };
    return colors[category?.toLowerCase() || 'default'] || colors.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-lg">Loading achievement...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !achievement) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-300 mb-4">Achievement Not Found</h1>
          <p className="text-gray-500 text-lg mb-8">{error}</p>
          
        </div>
      </div>
    );
  }

  const hasMultipleImages = achievement.imgLink && achievement.imgLink.length > 1;
  const currentImage = achievement.imgLink?.[currentImageIndex] || '/placeholder-achievement.jpg';

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mx-auto">
          {/* Image Gallery Section */}
          <div className="lg:col-span-4 w-lg h-full mx-auto flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 w-full h-full"
            >
              {/* Main Image */}
              <div className="relative group">
                <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
                  <Image
                    src={currentImage}
                    alt={achievement.achievementtitle}
                    fill
                    className={`transition-all duration-500 ${
                      imageViewMode === 'fit' ? 'object-contain' : 'object-cover'
                    }`}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                  
                  {/* Image Controls */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setImageViewMode(imageViewMode === 'fit' ? 'fill' : 'fit')}
                      className="p-2 bg-black/80 hover:bg-black/90 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-colors"
                      title={`Switch to ${imageViewMode === 'fit' ? 'Fill' : 'Fit'} mode`}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(currentImage, '_blank')}
                      className="p-2 bg-black/80 hover:bg-black/90 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-colors"
                      title="View fullscreen"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-black/90 text-white rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-black/90 text-white rounded-full backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 text-white text-sm rounded-full backdrop-blur-sm border border-white/10">
                      {currentImageIndex + 1} / {achievement.imgLink?.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {hasMultipleImages && (
                  <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide custom-scrollbar">
                    {achievement.imgLink?.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-orange-500 shadow-lg shadow-orange-500/25' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${achievement.achievementtitle} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Title and Category */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                      {achievement.achievementtitle}
                    </span>
                  </h1>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {achievement.category && (
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white rounded-full text-sm font-medium`}>
                      <Tag className="w-4 h-4" />
                      {achievement.category}
                    </span>
                  )}
                  
                </div>
              </div>

              {/* Description */}
              {achievement.description && (
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-400" />
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              )}

              {/* Achievement Details */}
              <div className="space-y-4">
                {achievement.date && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Achievement Date</p>
                        <p className="text-white font-medium">{formatDate(achievement.date)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {achievement.organization && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Organization</p>
                        <p className="text-white font-medium">{achievement.organization}</p>
                      </div>
                    </div>
                  </div>
                )}

                {achievement.location && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">{achievement.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {achievement.certification && (
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="text-sm text-orange-300">Certification</p>
                        <p className="text-white font-medium">{achievement.certification}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* External Link */}
              {achievement.link && (
                <motion.a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl border border-orange-500/20"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Original
                </motion.a>
              )}

              {/* Timeline */}
              {(achievement.date || achievement.updatedAt) && (
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Timeline
                  </h3>
                  <div className="space-y-3 text-sm">
                    {achievement.date && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Achieved on {formatDate(achievement.date)}</span>
                      </div>
                    )}
                    {achievement.updatedAt && (
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span>Last updated {formatDate(achievement.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}