'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { 
  Calendar, 
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
      

      <div className="container mx-auto px-4 py-8">
        {/* Achievement Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
              {achievement.achievementtitle}
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {achievement.category && (
              <span className={`inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white rounded-full text-sm font-medium`}>
                <Tag className="w-4 h-4" />
                {achievement.category}
              </span>
            )}
            {achievement.date && (
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{formatDate(achievement.date)}</span>
              </div>
            )}
            {achievement.organization && (
              <div className="flex items-center gap-2 text-gray-400">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{achievement.organization}</span>
              </div>
            )}
            {achievement.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{achievement.location}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Image Gallery - Before Description */}
        {achievement.imgLink && achievement.imgLink.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Achievement Gallery</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 max-w-4xl mx-auto">
              <div className="aspect-[16/10] relative">
                <Image
                  src={currentImage}
                  alt={achievement.achievementtitle}
                  fill
                  className={`transition-all duration-300 ${
                    imageViewMode === 'fit' ? 'object-contain' : 'object-cover'
                  }`}
                />
                
                {/* Navigation Controls */}
                {hasMultipleImages && (
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
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full">
                  <span className="text-sm text-white">
                    {currentImageIndex + 1} / {achievement.imgLink?.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {achievement.imgLink?.map((img, index) => (
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

        {/* Achievement Description */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">Achievement Description</h2>
          {achievement.description && (
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-base leading-relaxed">
                {achievement.description}
              </p>
            </div>
          )}
        </motion.div>

        {/* Certification Details */}
        {achievement.certification && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Certification Details</h2>
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6">
              <p className="text-gray-300 text-base leading-relaxed">
                {achievement.certification}
              </p>
            </div>
          </motion.div>
        )}

        {/* External Link */}
        {achievement.link && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Related Links</h2>
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-orange-500/50 transition-colors group"
            >
              <span className="text-gray-300 group-hover:text-white transition-colors">
                View Original Achievement
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </a>
          </motion.div>
        )}

        {/* Achievement Timeline */}
        {(achievement.date || achievement.updatedAt) && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Timeline</h2>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
             
              {achievement.updatedAt && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Last Updated: {new Date(achievement.updatedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}