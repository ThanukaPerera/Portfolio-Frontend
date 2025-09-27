'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Award, Tag, Loader2 } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useState } from 'react';

interface Achievement {
  _id: string;
  achievementtitle: string;
  active: boolean;
  certification?: string;
  date?: string;
  description?: string;
  imgLink?: string[];
  updatedAt?: string;
  organization?: string;
  location?: string;
  category?: string;
  link?: string;
}

interface ProfessionalAchievementsProps {
  data: Achievement[];
}

export default function ProfessionalAchievements({ data }: ProfessionalAchievementsProps) {
  const [loadingCard, setLoadingCard] = useState<string | null>(null);

  // Process the data directly from props - no need for API calls
  const achievements = data
    .filter((achievement: Achievement) => achievement.active)
    .sort((a: Achievement, b: Achievement) => 
      new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
    );

  const handleCardClick = (achievementId: string) => {
    setLoadingCard(achievementId);
    // Loading will be cleared when the new page loads
  };

  const getCategoryColor = (category?: string) => {
    const colors: { [key: string]: string } = {
      'certification': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'award': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'volunteering': 'bg-green-500/10 text-green-400 border-green-500/20',
      'competition': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'default': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    };
    return colors[category?.toLowerCase() || 'default'] || colors.default;
  };

  // Fixed uniform card size - much smaller
  // const CARD_HEIGHT = 'h-64'; // Fixed height for all cards
  const IMAGE_HEIGHT = 'h-96'; // Fixed image height for all cards

  const getGradientPattern = (index: number) => {
    const patterns = [
      'from-orange-500/5 to-red-500/5',
      'from-red-500/5 to-orange-500/5', 
      'from-gray-500/5 to-orange-500/5',
      'from-orange-500/5 to-gray-500/5'
    ];
    return patterns[index % patterns.length];
  };



  return (
    <div className="min-h-screen text-white">
      {/* Header Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <SectionTitle title="Volunteering, Life Events & Achievements" description="A collection of milestones, certifications, and recognitions that showcase my professional journey and commitment to excellence." />
  
          
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-xl"
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
            className="absolute bottom-20 right-10 w-24 h-24 bg-red-500/5 rounded-full blur-xl"
            animate={{
              x: [0, -25, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 pb-20">
        {achievements.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No Achievements Yet</h3>
            <p className="text-gray-500">Check back later for updates on new achievements and milestones.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 lg:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement._id}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  scale: 0.9,
                  rotateX: 15
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: loadingCard === achievement._id ? 0.98 : 1,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: (index % 6) * 0.1, // Stagger animation per row
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: loadingCard === achievement._id ? 0 : -8, 
                  scale: loadingCard === achievement._id ? 0.98 : 1.01,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="group"
              >
                <Link 
                  href={`/achievements/${achievement._id}`} 
                  prefetch={true}
                  className="block h-full w-full"
                  onClick={() => handleCardClick(achievement._id)}
                >
                  <div className={`achievement-card relative  backdrop-blur-sm border  rounded-2xl bg-black/60   border-orange-500/50  shadow-lg overflow-hidden hover:border-orange-500/30 smooth-transition professional-shadow hover:shadow-2xl hover:shadow-orange-500/10 h-full w-full flex flex-col cursor-pointer transition-all duration-200 ${loadingCard === achievement._id ? 'pointer-events-none' : ''}`}>
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradientPattern(index)} opacity-20 pointer-events-none`} />
                    {/* Image Section */}
                    <div className={`relative ${IMAGE_HEIGHT} w-xs mx-auto overflow-hidden flex-shrink-0`}>
                      {achievement.imgLink && achievement.imgLink.length > 0 ? (
                        <Image
                          src={achievement.imgLink[0]}
                          alt={achievement.achievementtitle}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16vw, 12vw"
                          priority={index < 8}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <Award className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      {achievement.category && (
                        <div className="absolute top-2 left-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getCategoryColor(achievement.category)}`}>
                            <Tag className="w-2 h-2" />
                            {achievement.category.slice(0, 4)}
                          </span>
                        </div>
                      )}

                      {/* Date Badge - Show only year for small cards */}
                      {achievement.date && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-full text-xs font-medium text-gray-300">
                            <Calendar className="w-2 h-2" />
                            {new Date(achievement.date).getFullYear()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-orange-400 transition-colors duration-300 tracking-wide">
                          {achievement.achievementtitle}
                        </h3>
                        
                        {/* Professional divider */}
                        <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Achievement type indicator */}
                        {achievement.certification && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
                              Certified
                            </span>
                          </div>
                        )}
                      </div>
                      
                     
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-2xl pointer-events-none transition-all duration-500" />
                    
                    {/* Loading Overlay */}
                    {loadingCard === achievement._id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                          <span className="text-sm text-orange-300 font-medium">Loading...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
