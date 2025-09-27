import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Browse all projects showcasing technical expertise, creativity, and innovation across various domains.',
};

export default function ProjectsPage() {
  // This page redirects to the main portfolio since projects are shown there
  // You can customize this to show a dedicated projects page if needed
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">Projects</h1>
        <p className="text-gray-300 mb-8">
          Visit the main portfolio page to see all projects
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-black rounded-lg font-medium hover:bg-orange-400 transition-colors"
        >
          Go to Portfolio
        </Link>
      </div>
    </div>
  );
}