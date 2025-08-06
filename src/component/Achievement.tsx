'use client';

import SectionTitle from '../component/SectionTitle';
import Image from 'next/image';

interface Achievement {
  _id: string;
  achievementtitle: string;
  description: string;
  date: string;
  certification?: string;
  imgLink?: string[];
  active: boolean;
}

interface AchievementsProps {
  data: Achievement[];
}

export default function Achievements({ data }: AchievementsProps) {
  // Filter active achievements and sort by date (newest first)
  const activeAchievements = data
    .filter(achievement => achievement.active)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-start justify-center min-h-screen px-4 max-sm:px-8 max-w-7xl py-12">
      <SectionTitle title="Achievements" />
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {activeAchievements.map((achievement) => (
          <div
            key={achievement._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
          >
            {/* Image Section */}
            {achievement.imgLink && achievement.imgLink.length > 0 && (
              <div className="relative h-48 w-full">
                <Image
                  src={achievement.imgLink[1]}
                  alt={achievement.achievementtitle}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Content Section */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-primaryColor line-clamp-2">
                  {achievement.achievementtitle}
                </h3>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                  {formatDate(achievement.date)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {achievement.description}
              </p>
              
              {achievement.certification && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Certified
                  </span>
                  <span className="text-xs text-gray-500">
                    {achievement.certification}
                  </span>
                </div>
              )}
            </div>
            
            {/* Additional Images */}
            {achievement.imgLink && achievement.imgLink.length > 1 && (
              <div className="px-6 pb-4">
                <div className="flex gap-2 overflow-x-auto">
                  {achievement.imgLink.slice(1).map((img, index) => (
                    <div key={index} className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={img}
                        alt={`${achievement.achievementtitle} ${index + 2}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {activeAchievements.length === 0 && (
        <div className="w-full text-center py-12">
          <p className="text-gray-500 text-lg">No achievements to display yet.</p>
        </div>
      )}
    </div>
  );
}