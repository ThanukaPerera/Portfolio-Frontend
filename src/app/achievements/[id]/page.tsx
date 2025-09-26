import AchievementDetail from '@/component/AchievementDetail';

interface AchievementPageProps {
  params: {
    id: string;
  };
}

export default function AchievementPage({ params }: AchievementPageProps) {
  return <AchievementDetail id={params.id} />;
}

export async function generateMetadata({ params }: AchievementPageProps) {
  // You could fetch the achievement data here to generate dynamic metadata
  return {
    title: `Achievement Details | Portfolio`,
    description: 'Detailed view of professional achievement with images, description, and relevant information.',
  };
}