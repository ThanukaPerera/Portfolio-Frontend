'use client';

import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import axios from 'axios';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Achievement = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AboutData = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProjectData = any;

const API_BASE = 'http://localhost:8000/api';

export default function ScrollingSection(): React.ReactElement {
  const lenisRef = useRef<Lenis | null>(null);
  const [aboutData, setAboutData] = useState<AboutData[] | null>(null);
  const [projectData, setProjectData] = useState<ProjectData[] | null>(null);
  const [achievementData, setAchievementData] = useState<Achievement[] | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [aboutRes, projectRes, achievementRes] = await Promise.all([
          axios.get(`${API_BASE}/aboutMes`, { headers: { 'Cache-Control': 'no-store' } }),
          axios.get(`${API_BASE}/projects`, { headers: { 'Cache-Control': 'no-store' } }),
          axios.get(`${API_BASE}/achievements`, { headers: { 'Cache-Control': 'no-store' } }),
        ]);
        setAboutData(aboutRes.data.response[0]);
        setProjectData(projectRes.data.response);
        setAchievementData(achievementRes.data.response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openAchievementDialog = (achievement: any) => {
    setSelectedAchievement(achievement);
    setIsDialogOpen(true);
    lenisRef.current?.stop();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    lenisRef.current?.start();
  };

  if (!aboutData || !projectData || !achievementData) {
    return <div className="text-white h-screen grid place-content-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">Loading...</div>;
  }

  return (
    <main className=''>
      <div className='wrapper'>
        {/* Your other sections would go here */}
      </div>

      <section className='text-white w-full  relative overflow-hidden'>
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/30 to-purple-950/20" /> */}

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
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
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className='grid grid-cols-2 relative z-10'>
          <div className='sticky top-0 h-screen flex items-center justify-center my-auto'>
            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%] bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent'>
              Life Events <br />& <br />
              <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Volunteering
              </span>
            </h1>
          </div>
          <div className='grid gap-2'>
            {achievementData.map((achievement, index) => {
              const isEven = index % 2 === 0;
              const clipId = `skew-clip-${achievement._id}`;
              const overlayClipId = `overlay-clip-${achievement._id}`;

              return (
                <motion.figure
                  key={achievement._id}
                  className="flex justify-center relative cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openAchievementDialog(achievement)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative w-80 h-96 group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <clipPath id={clipId}>
                          {isEven ? (
                            <polygon points="40,0 320,0 280,384 0,384" />
                          ) : (
                            <polygon points="0,0 280,0 320,384 40,384" />
                          )}
                        </clipPath>
                      </defs>
                    </svg>

                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <clipPath id={overlayClipId}>
                          {isEven ? (
                            <polygon points="40,0 320,0 280,384 0,384" />
                          ) : (
                            <polygon points="0,0 280,0 320,384 40,384" />
                          )}
                        </clipPath>
                      </defs>
                    </svg>

                    <Image
                      src={achievement.imgLink?.[0] || 'https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop'}
                      alt={achievement.achievementtitle || ''}
                      width={320}
                      height={384}
                      className='transition-all duration-300 w-full h-full align-bottom object-cover group-hover:brightness-110'
                      style={{ clipPath: `url(#${clipId})` }}
                    />
                    
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ clipPath: `url(#${overlayClipId})` }}
                    >
                      <h3 className="text-xl font-bold text-white truncate">
                        {achievement.achievementtitle}
                      </h3>
                    </div>
                  </div>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Custom Dialog Implementation */}
      <AnimatePresence>
        {isDialogOpen && selectedAchievement && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-50 cursor-pointer backdrop-blur-sm"
              onClick={closeDialog}
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedAchievement.imgLink?.[0] || 'https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop'}
                  alt={selectedAchievement.achievementtitle || ''}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl" />
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent mb-2">
                    {selectedAchievement.achievementtitle}
                  </h2>
                  {selectedAchievement.date && (
                    <p className="text-slate-300 mt-1">
                      {new Date(selectedAchievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="space-y-4">
                  {selectedAchievement.description && (
                    <p className="text-slate-300 leading-relaxed">
                      {selectedAchievement.description}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {selectedAchievement.organization && (
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-sm">Organization</p>
                        <p className="text-white">{selectedAchievement.organization}</p>
                      </div>
                    )}
                    
                    {selectedAchievement.location && (
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-sm">Location</p>
                        <p className="text-white">{selectedAchievement.location}</p>
                      </div>
                    )}
                    
                    {selectedAchievement.category && (
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-sm">Category</p>
                        <p className="text-white">{selectedAchievement.category}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedAchievement.link && (
                    <Button 
                      asChild
                      className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 w-full"
                    >
                      <a 
                        href={selectedAchievement.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              <button
                className="absolute top-4 right-4 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                onClick={closeDialog}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

   
      
    </main>
  );
}










// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Montserrat } from 'next/font/google';
// import Image from 'next/image';
// import { X, ExternalLink, MapPin, Building, Calendar, Tag } from 'lucide-react';
// import Lenis from '@studio-freight/lenis';
// import axios from 'axios';

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
// });

// interface Achievement {
//   _id: string;
//   achievementtitle: string;
//   description?: string;
//   imgLink?: string[];
//   date?: string;
//   organization?: string;
//   location?: string;
//   category?: string;
//   link?: string;
// }

// interface IntroData {
//   fname: string;
//   lname: string;
// }

// const API_BASE = 'http://localhost:8000/api';

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// const titleVariants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// export default function ScrollingSection(): JSX.Element {
//   const lenisRef = useRef<Lenis | null>(null);
//   const [introData, setIntroData] = useState<IntroData | null>(null);
//   const [achievementData, setAchievementData] = useState<Achievement[]>([]);
//   const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [introRes, achievementRes] = await Promise.all([
//           axios.get(`${API_BASE}/intros`, { headers: { 'Cache-Control': 'no-store' } }),
//           axios.get(`${API_BASE}/achievements`, { headers: { 'Cache-Control': 'no-store' } }),
//         ]);
//         setIntroData(introRes.data.response[0]);
//         setAchievementData(achievementRes.data.response);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const lenis = new Lenis({
//         duration: 1.2,
//         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smooth: true,
//       });

//       lenisRef.current = lenis;

//       const raf = (time: number) => {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//       };

//       requestAnimationFrame(raf);

//       return () => {
//         lenis.destroy();
//       };
//     }
//   }, []);

//   const openAchievementDialog = (achievement: Achievement) => {
//     setSelectedAchievement(achievement);
//     setIsDialogOpen(true);
//     lenisRef.current?.stop();
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedAchievement(null);
//     lenisRef.current?.start();
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center">
//         <motion.div
//           className="text-white text-xl"
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           Loading...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <main className="bg-slate-950">
//       {/* Achievements Section */}
//       <section className="relative min-h-screen text-white">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
//           <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/20 to-purple-950/10" />
//         </div>

//         {/* Floating Elements */}
//         <motion.div
//           className="absolute top-40 left-20 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
//           animate={{
//             x: [0, 20, 0],
//             y: [0, -15, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />

//         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
//           {/* Sticky Title Section */}
//           <div className="sticky top-0 h-screen flex items-center justify-center p-8">
//             <motion.div
//               variants={titleVariants}
//               initial="hidden"
//               animate="visible"
//               className="text-center lg:text-left"
//             >
//               <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50 mb-6">
//                 <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
//                 <span className="text-slate-300 text-sm font-medium">
//                   Portfolio Highlights
//                 </span>
//               </motion.div>
              
//               <h1 className={`text-5xl lg:text-7xl font-bold leading-tight ${montserrat.className}`}>
//                 <span className="block bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
//                   Life Events
//                 </span>
//                 <span className="block text-slate-400 text-2xl lg:text-3xl font-normal mt-2">
//                   &
//                 </span>
//                 <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Volunteering
//                 </span>
//               </h1>
              
//               <motion.p
//                 className="text-slate-400 text-lg mt-6 max-w-md mx-auto lg:mx-0"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 Discover my journey through meaningful experiences and community contributions
//               </motion.p>
//             </motion.div>
//           </div>

//           {/* Achievement Cards Grid */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid gap-6 p-8 pt-20 lg:pt-8"
//           >
//             {achievementData.map((achievement, index) => {
//               const isEven = index % 2 === 0;
//               const clipId = `skew-clip-${achievement._id}`;
              
//               return (
//                 <motion.div
//                   key={achievement._id}
//                   variants={cardVariants}
//                   className="flex justify-center"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <div 
//                     className="relative w-80 h-96 cursor-pointer group"
//                     onClick={() => openAchievementDialog(achievement)}
//                   >
//                     {/* Custom clip path for alternating skew */}
//                     <svg width="0" height="0" className="absolute">
//                       <defs>
//                         <clipPath id={clipId}>
//                           {isEven ? (
//                             <polygon points="40,0 320,0 280,384 0,384" />
//                           ) : (
//                             <polygon points="0,0 280,0 320,384 40,384" />
//                           )}
//                         </clipPath>
//                       </defs>
//                     </svg>

//                     {/* Image with glow effect */}
//                     <div className="relative w-full h-full">
//                       <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       <Image
//                         src={achievement.imgLink?.[0] || '/api/placeholder/320/384'}
//                         alt={achievement.achievementtitle || 'Achievement'}
//                         width={320}
//                         height={384}
//                         className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
//                         style={{ clipPath: `url(#${clipId})` }}
//                       />
//                     </div>
                    
//                     {/* Overlay with gradient and title */}
//                     <div 
//                       className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
//                       style={{ clipPath: `url(#${clipId})` }}
//                     >
//                       <div className="text-white">
//                         <h3 className="text-xl font-bold mb-2 line-clamp-2">
//                           {achievement.achievementtitle}
//                         </h3>
//                         {achievement.organization && (
//                           <p className="text-slate-300 text-sm flex items-center gap-1">
//                             <Building className="w-3 h-3" />
//                             {achievement.organization}
//                           </p>
//                         )}
//                         {achievement.date && (
//                           <p className="text-slate-400 text-xs mt-1">
//                             {new Date(achievement.date).toLocaleDateString()}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Hover ring effect */}
//                     <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-300 rounded-lg" style={{ clipPath: `url(#${clipId})` }} />
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* Enhanced Dialog */}
//       <AnimatePresence>
//         {isDialogOpen && selectedAchievement && (
//           <>
//             {/* Backdrop with blur */}
//             <motion.div
//               initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
//               animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
//               exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black/60 z-50 cursor-pointer"
//               onClick={closeDialog}
//             />

//             {/* Dialog Content */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full max-h-[90vh] mx-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
//                 {/* Hero Image */}
//                 <div className="relative aspect-[16/9] overflow-hidden">
//                   <Image
//                     src={selectedAchievement.imgLink?.[0] || '/api/placeholder/800/450'}
//                     alt={selectedAchievement.achievementtitle || 'Achievement'}
//                     fill
//                     className="object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
//                   {/* Close button */}
//                   <button
//                     className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800/80 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
//                     onClick={closeDialog}
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
                
//                 {/* Content */}
//                 <div className="p-8">
//                   <div className="mb-6">
//                     <h2 className={`text-3xl font-bold text-white mb-3 ${montserrat.className}`}>
//                       {selectedAchievement.achievementtitle}
//                     </h2>
                    
//                     {/* Meta information */}
//                     <div className="flex flex-wrap gap-4 text-sm">
//                       {selectedAchievement.date && (
//                         <div className="flex items-center gap-2 text-slate-300">
//                           <Calendar className="w-4 h-4" />
//                           {new Date(selectedAchievement.date).toLocaleDateString()}
//                         </div>
//                       )}
//                       {selectedAchievement.organization && (
//                         <div className="flex items-center gap-2 text-slate-300">
//                           <Building className="w-4 h-4" />
//                           {selectedAchievement.organization}
//                         </div>
//                       )}
//                       {selectedAchievement.location && (
//                         <div className="flex items-center gap-2 text-slate-300">
//                           <MapPin className="w-4 h-4" />
//                           {selectedAchievement.location}
//                         </div>
//                       )}
//                       {selectedAchievement.category && (
//                         <div className="flex items-center gap-2 text-slate-300">
//                           <Tag className="w-4 h-4" />
//                           {selectedAchievement.category}
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Description */}
//                   {selectedAchievement.description && (
//                     <div className="mb-6">
//                       <p className="text-slate-300 leading-relaxed text-lg">
//                         {selectedAchievement.description}
//                       </p>
//                     </div>
//                   )}
                  
//                   {/* Action button */}
//                   {selectedAchievement.link && (
//                     <motion.a 
//                       href={selectedAchievement.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                       View Details
//                     </motion.a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Enhanced Footer */}
//       <footer className="relative bg-slate-950 overflow-hidden">
//         {/* Background pattern */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black to-slate-950">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
//         </div>
        
//         <div className="relative z-10 py-20">
//           <motion.h1 
//             className={`text-[7vw] max-w-[80%] mx-auto text-center leading-[100%] uppercase font-bold bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600 bg-clip-text text-transparent transition-all duration-700 ease-out hover:translate-y-2 ${montserrat.className}`}
//             whileHover={{ scale: 1.02 }}
//           >
//             {introData ? `${introData.fname} ${introData.lname}` : 'Portfolio'}
//           </motion.h1>
//         </div>
        
//         <motion.section 
//           className="bg-black h-40 relative z-20 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"
//           whileHover={{ scale: 1.01 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <div className="text-slate-600 text-center">
//             <p className="text-sm">Built with passion</p>
//           </div>
//         </motion.section>
//       </footer>
//     </main>
//   );
// }














// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Lenis from '@studio-freight/lenis';
// import axios from 'axios';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from "@/components/ui/button";

// const API_BASE = 'http://localhost:8000/api';

// export default function ScrollingSection(): JSX.Element {
//   const lenisRef = useRef<Lenis | null>(null);
//   const [introData, setIntroData] = useState(null);
//   const [aboutData, setAboutData] = useState(null);
//   const [projectData, setProjectData] = useState(null);
//   const [achievementData, setAchievementData] = useState(null);
//   const [selectedAchievement, setSelectedAchievement] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [introRes,aboutRes, projectRes, achievementRes] = await Promise.all([
//           axios.get(`${API_BASE}/intros`, { headers: { 'Cache-Control': 'no-store' } }),
//           axios.get(`${API_BASE}/aboutMes`, { headers: { 'Cache-Control': 'no-store' } }),
//           axios.get(`${API_BASE}/projects`, { headers: { 'Cache-Control': 'no-store' } }),
//           axios.get(`${API_BASE}/achievements`, { headers: { 'Cache-Control': 'no-store' } }),
//         ]);
//         setIntroData(introRes.data.response[0])
//         setAboutData(aboutRes.data.response[0]);
//         setProjectData(projectRes.data.response);
//         setAchievementData(achievementRes.data.response);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smooth: true,
//     });

//     lenisRef.current = lenis;

//     const raf = (time: number) => {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     };

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   const openAchievementDialog = (achievement) => {
//     setSelectedAchievement(achievement);
//     setIsDialogOpen(true);
//     lenisRef.current?.stop();
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     lenisRef.current?.start();
//   };

//   if (!aboutData || !projectData || !achievementData) {
//     return <div className="text-white h-screen grid place-content-center">Loading...</div>;
//   }

//   return (
//     <main className='bg-black'>
//       <div className='wrapper'>
//         {/* Your other sections would go here */}
//       </div>

//       <section className='text-white w-full bg-slate-950'>
//         <div className='grid grid-cols-2'>
//           <div className='sticky top-0 h-screen flex items-center justify-center'>
//             <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
//               Life Events <br />& <br />Volunteering
//             </h1>
//           </div>
//           <div className='grid gap-2'>
//             {achievementData.map((achievement, index) => {
//               const isEven = index % 2 === 0;
//               const clipId = `skew-clip-${achievement._id}`;
//               const overlayClipId = `overlay-clip-${achievement._id}`;

//               return (
//                 <motion.figure
//                   key={achievement._id}
//                   className="flex justify-center relative cursor-pointer"
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => openAchievementDialog(achievement)}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   <div className="relative w-80 h-96">
//                     <svg width="0" height="0" className="absolute">
//                       <defs>
//                         <clipPath id={clipId}>
//                           {isEven ? (
//                             <polygon points="40,0 320,0 280,384 0,384" />
//                           ) : (
//                             <polygon points="0,0 280,0 320,384 40,384" />
//                           )}
//                         </clipPath>
//                       </defs>
//                     </svg>

//                     <svg width="0" height="0" className="absolute">
//                       <defs>
//                         <clipPath id={overlayClipId}>
//                           {isEven ? (
//                             <polygon points="40,0 320,0 280,384 0,384" />
//                           ) : (
//                             <polygon points="0,0 280,0 320,384 40,384" />
//                           )}
//                         </clipPath>
//                       </defs>
//                     </svg>

//                     <Image
//                       src={achievement.imgLink?.[0] || 'https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop'}
//                       alt={achievement.achievementtitle || ''}
//                       width={320}
//                       height={384}
//                       className='transition-all duration-300 w-full h-full align-bottom object-cover'
//                       style={{ clipPath: `url(#${clipId})` }}
//                     />
                    
//                     <div 
//                       className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
//                       style={{ clipPath: `url(#${overlayClipId})` }}
//                     >
//                       <h3 className="text-xl font-bold text-white truncate">
//                         {achievement.achievementtitle}
//                       </h3>
//                     </div>
//                   </div>
//                 </motion.figure>
//               )
//             })}
//           </div>
//         </div>
//       </section>
      
//       {/* Custom Dialog Implementation */}
//       <AnimatePresence>
//         {isDialogOpen && selectedAchievement && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed inset-0 bg-black/80 z-50 cursor-pointer"
//               onClick={closeDialog}
//             />

//             {/* Dialog Content */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//               className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="relative aspect-video">
//                 <Image
//                   src={selectedAchievement.imgLink?.[0] || 'https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop'}
//                   alt={selectedAchievement.achievementtitle || ''}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-6">
//                   <h2 className="text-3xl font-bold text-white">
//                     {selectedAchievement.achievementtitle}
//                   </h2>
//                   {selectedAchievement.date && (
//                     <p className="text-slate-300 mt-1">
//                       {new Date(selectedAchievement.date).toLocaleDateString()}
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="space-y-4">
//                   {selectedAchievement.description && (
//                     <p className="text-slate-300 leading-relaxed">
//                       {selectedAchievement.description}
//                     </p>
//                   )}
                  
//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     {selectedAchievement.organization && (
//                       <div>
//                         <p className="text-slate-400 text-sm">Organization</p>
//                         <p className="text-white">{selectedAchievement.organization}</p>
//                       </div>
//                     )}
                    
//                     {selectedAchievement.location && (
//                       <div>
//                         <p className="text-slate-400 text-sm">Location</p>
//                         <p className="text-white">{selectedAchievement.location}</p>
//                       </div>
//                     )}
                    
//                     {selectedAchievement.category && (
//                       <div>
//                         <p className="text-slate-400 text-sm">Category</p>
//                         <p className="text-white">{selectedAchievement.category}</p>
//                       </div>
//                     )}
//                   </div>
                  
//                   {selectedAchievement.link && (
//                     <Button 
//                       asChild
//                       variant="outline"
//                       className="mt-4 border-slate-700 text-white hover:bg-slate-800 w-full"
//                     >
//                       <a 
//                         href={selectedAchievement.link} 
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Details
//                       </a>
//                     </Button>
//                   )}
//                 </div>
//               </div>
              
//               <button
//                 className="absolute top-4 right-4 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-full p-2 backdrop-blur-sm"
//                 onClick={closeDialog}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       <footer className='group bg-slate-950 '>
//         <h1 className='text-[7vw] w-[80%] m-auto group-hover:translate-y-4 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
//           {`${introData.fname} ${introData.lname}` }
//         </h1>
//         <section className='bg-black  h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'>
          
//         </section>
//       </footer>
//     </main>
//   );
// }