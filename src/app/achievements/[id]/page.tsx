import AchievementDetail from '@/component/AchievementDetail';

interface AchievementPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AchievementPage({ params }: AchievementPageProps) {
  const { id } = await params;
  return <AchievementDetail id={id} />;
}

export async function generateMetadata({ params }: AchievementPageProps) {
  const { id } = await params;
  return {
    title: `Achievement ${id} | Portfolio`,
    description: 'Detailed view of professional achievement with images, description, and relevant information.',
  };
}