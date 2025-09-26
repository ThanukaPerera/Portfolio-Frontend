'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Award, ExternalLink, Tag } from 'lucide-react';
import SectionTitle from './SectionTitle';

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
  // Process the data directly from props - no need for API calls
  const achievements = data
    .filter((achievement: Achievement) => achievement.active)
    .sort((a: Achievement, b: Achievement) => 
      new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
    );

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
  const CARD_HEIGHT = 'h-64'; // Fixed height for all cards
  const IMAGE_HEIGHT = 'h-32'; // Fixed image height for all cards

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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 lg:gap-6"
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
                  scale: 1,
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
                  y: -12, 
                  scale: 1.02,
                  rotateY: index % 2 === 0 ? 2 : -2
                }}
                className="group"
              >
                <Link href={`/achievements/${achievement._id}`}>
                  <div className={`achievement-card relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/30 smooth-transition professional-shadow hover:shadow-2xl hover:shadow-orange-500/10 ${CARD_HEIGHT} w-full flex flex-col`}>
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradientPattern(index)} opacity-20 pointer-events-none`} />
                    {/* Image Section */}
                    <div className={`relative ${IMAGE_HEIGHT} overflow-hidden flex-shrink-0`}>
                      {achievement.imgLink && achievement.imgLink.length > 0 ? (
                        <Image
                          src={achievement.imgLink[0]}
                          alt={achievement.achievementtitle}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16vw, 12vw"
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
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-orange-400 smooth-transition">
                          {achievement.achievementtitle}
                        </h3>
                        
                        {achievement.description && (
                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-2">
                            {achievement.description}
                          </p>
                        )}

                        {/* Meta Information - Minimal for small cards */}
                        <div className="space-y-1 mb-2">
                          {achievement.certification && (
                            <div className="flex items-center justify-center">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
                                <Award className="w-2 h-2" />
                                Certified
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-center mt-auto pt-1">
                        <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-orange-400 smooth-transition" />
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-2xl pointer-events-none transition-all duration-500" />
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
