'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfessionalAchievements from '@/component/ProfessionalAchievements';
import { Achievement } from '@/contexts/AchievementContext';

import axios from 'axios';

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export default function AchievementsPageWrapper() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${API_BASE}/achievements`, {
          headers: { "Cache-Control": "no-store" },
        });
        setAchievements(response.data.response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements');
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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
          <p className="text-gray-400 text-lg">Loading achievements...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <ProfessionalAchievements data={achievements} />;
}