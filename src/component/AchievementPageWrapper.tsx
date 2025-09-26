'use client';

import { useEffect, useState } from 'react';
import AchievementDetail from '@/component/AchievementDetail';
import { AchievementProvider, Achievement } from '@/contexts/AchievementContext';
import axios from 'axios';

interface AchievementPageWrapperProps {
  id: string;
}

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export default function AchievementPageWrapper({ id }: AchievementPageWrapperProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-lg">Loading achievement...</p>
        </div>
      </div>
    );
  }

  return (
    <AchievementProvider achievements={achievements}>
      <AchievementDetail id={id} />
    </AchievementProvider>
  );
}