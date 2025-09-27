import AchievementDetail from '@/component/AchievementDetail';
import { AchievementProvider } from '@/contexts/AchievementContext';
import axios from 'axios';
import { notFound } from 'next/navigation';

interface AchievementPageProps {
  params: Promise<{
    id: string;
  }>;
}

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

async function getAchievement(id: string) {
  try {
    const res = await axios.get(`${API_BASE}/achievement/${id}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function AchievementPage({ params }: AchievementPageProps) {
  const { id } = await params;
  const achievement = await getAchievement(id);
  
  if (!achievement) {
    notFound();
  }

  // Wrap single achievement in array for context compatibility
  const achievements = [achievement.response || achievement];
  
  return (
    <AchievementProvider achievements={achievements}>
      <AchievementDetail id={id} />
    </AchievementProvider>
  );
}

export async function generateMetadata({ params }: AchievementPageProps) {
  const { id } = await params;
  return {
    title: `Achievement ${id} | Portfolio`,
    description: 'Detailed view of professional achievement with images, description, and relevant information.',
  };
}