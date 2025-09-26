'use client';

import { createContext, useContext, ReactNode } from 'react';

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

interface AchievementContextType {
  achievements: Achievement[];
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ 
  children, 
  achievements 
}: { 
  children: ReactNode;
  achievements: Achievement[];
}) {
  return (
    <AchievementContext.Provider value={{ achievements }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
}

export type { Achievement };