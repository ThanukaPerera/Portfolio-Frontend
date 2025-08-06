'use client';

import ProtectedRoute from "@/component/ProtectedRoute";
import IntroAdmin from "@/component/admin/IntroAdmin";
import AboutMeAdmin from "@/component/admin/AboutMeAdmin";
import ProjectsAdmin from "@/component/admin/ProjectsAdmin";
import AchievementsAdmin from "@/component/admin/AchievementAdmin";
import ContactAdmin from "@/component/admin/ContactAdmin";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-10">
        {/* Admin Header */}
        <header className="bg-gray-50 border-b border-gray-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {admin?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                Role: <span className="text-blue-400 capitalize">{admin?.role}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Admin Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <IntroAdmin />
            <AboutMeAdmin />
            <ProjectsAdmin />
            <AchievementsAdmin />
            <ContactAdmin />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}