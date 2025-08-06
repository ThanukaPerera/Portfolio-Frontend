// 'use client';

// import Lenis from '@studio-freight/lenis';
// import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
// import { useRef, useEffect } from 'react';
// import Image from 'next/image';



// interface Project {
//   _id: string;
//   projectTitle: string;
//   projectDescription: string;
//   projectImgLink: string[];
//   projectvideoLink: string[];
//   gitHubRepoLink: string;
//   active?: boolean;
// }

// interface ProjectProps {
//   data: Project[];
// }

// const isValidUrl = (url: string) => {
//   try {
//     new URL(url);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

// // Subtle gradient colors for cards
// const cardColors = [
//   'rgba(102, 126, 234, 0.15)', // Purple-blue
//   'rgba(240, 147, 251, 0.15)', // Pink-red
//   'rgba(79, 172, 254, 0.15)', // Blue-cyan
//   'rgba(67, 233, 123, 0.15)', // Green-teal
//   'rgba(250, 112, 154, 0.15)', // Pink-yellow
//   'rgba(168, 237, 234, 0.15)', // Mint-pink
//   'rgba(255, 236, 210, 0.15)', // Peach
// ];

// // Professional border colors
// const borderColors = [
//   'rgba(30, 64, 175, 0.3)', // Professional Blue
//   'rgba(124, 58, 237, 0.3)', // Professional Purple
//   'rgba(5, 150, 105, 0.3)', // Professional Green
//   'rgba(220, 38, 38, 0.3)', // Professional Red
//   'rgba(234, 88, 12, 0.3)', // Professional Orange
//   'rgba(8, 145, 178, 0.3)', // Professional Cyan
//   'rgba(67, 56, 202, 0.3)', // Professional Indigo
// ];

// const headerVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// export default function Projects({ data }: ProjectProps): JSX.Element {
//   const container = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ['start start', 'end end'],
//   });

//   useEffect(() => {
//     const lenis = new Lenis({
//       smooth: true,
//       lerp: 0.1,
//     });

//     const raf = (time: number) => {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     };

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   if (!data || data.length === 0) return null;

//   return (
//     <main ref={container} >
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Enhanced Background */}
//         {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
//           <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/20 to-purple-950/20" />
//         </div> */}

//         {/* Floating Elements */}
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
//           animate={{
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
//           animate={{
//             x: [0, -40, 0],
//             y: [0, 25, 0],
//             scale: [1, 0.9, 1],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Content */}
//         <div className="relative z-10 text-center px-8">
//           <motion.div
//             variants={headerVariants}
//             initial="hidden"
//             animate="visible"
//             className="space-y-6"
//           >
//             {/* Subtitle */}
//             <motion.div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50">
//               <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
//               <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">
//                 Portfolio
//               </span>
//             </motion.div>

//             {/* Main Title */}
//             <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent leading-tight">
//               Featured
//             </h1>
//             <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight -mt-4">
//               Projects
//             </h2>

//             {/* Description */}
//             <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mt-8">
//               Explore my carefully crafted projects that showcase creativity, 
//               technical expertise, and attention to detail.
//             </p>

//             {/* Stats */}
//             <div className="flex items-center justify-center gap-8 mt-12">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">{data.length}</div>
//                 <div className="text-sm text-slate-400">Projects</div>
//               </div>
//               <div className="h-8 w-px bg-slate-600" />
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">100%</div>
//                 <div className="text-sm text-slate-400">Custom Built</div>
//               </div>
//               <div className="h-8 w-px bg-slate-600" />
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">2024</div>
//                 <div className="text-sm text-slate-400">Latest Work</div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse" />
//           </div>
//         </motion.div>
//       </section>

//       {/* Projects Section */}
//       <section className="relative">
//         {data.map((project, i) => {
//           const targetScale = 1 - (data.length - i) * 0.05;
//           return (
//             <Card
//               key={project._id}
//               i={i}
//               url={project.projectImgLink[0]}
//               src={project.gitHubRepoLink}
//               title={project.projectTitle}
//               cardColor={cardColors[i % cardColors.length]}
//               borderColor={borderColors[i % borderColors.length]}
//               description={project.projectDescription}
//               progress={scrollYProgress}
//               range={[i * 0.25, 1]}
//               targetScale={targetScale}
//               totalCards={data.length}
//             />
//           );
//         })}
//       </section>
//     </main>
//   );
// }

// interface CardProps {
//   i: number;
//   title: string;
//   description: string;
//   src: string;
//   url: string;
//   cardColor: string;
//   borderColor: string;
//   progress: MotionValue<number>;
//   range: [number, number];
//   targetScale: number;
//   totalCards: number;
// }

// export const Card: React.FC<CardProps> = ({
//   i,
//   title,
//   description,
//   src,
//   url,
//   cardColor,
//   borderColor,
//   progress,
//   range,
//   targetScale,
//   totalCards,
// }) => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ['start end', 'start start'],
//   });

//   const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
//   const scale = useTransform(progress, range, [1, targetScale]);
//   // const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
//   const opacity = 1;

  
//   return (
//     <div
//       ref={container}
//       className="h-screen flex items-center justify-center sticky top-0 px-8"
//     >
//       <motion.div
//         style={{
//           scale,
//           opacity,
//         }}
//         className="relative w-full max-w-6xl mx-auto"
//       >
//         <motion.div
//           style={{
//             top: `calc(-5vh + ${i * 25}px)`,
//           }}
//           className="relative backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group"
//         >
//           {/* Subtle Card Background - Always Blurred */}
//           <div 
//             className="absolute inset-0 backdrop-blur-3xl rounded-3xl"
//             style={{ 
//               backgroundColor: cardColor,
//             }}
//           />
          
//           {/* Subtle border effect */}
//           <div
//             className="absolute inset-0 rounded-3xl border-2"
//             style={{
//               borderColor: borderColor,
//             }}
//           />
          
//           {/* Content - NO HIDING */}
//           <div className="relative z-10 p-8 md:p-12">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
//               {/* Text Content */}
//               <div className="space-y-6">
//                 {/* Project Number */}
//                 <div className="inline-flex items-center gap-3">
//                   <span 
//                     className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
//                     style={{
//                       backgroundColor: borderColor.replace('0.3', '0.8'),
//                     }}
//                   >
//                     {String(i + 1).padStart(2, '0')}
//                   </span>
//                   <span className="text-slate-400 text-sm uppercase tracking-wider">
//                     Project
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
//                   {title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-lg text-slate-300 leading-relaxed">
//                   {description}
//                 </p>

//                 {/* CTA */}
//                 <div className="flex items-center gap-4 pt-4">
//                   <motion.a
//                     href={src}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.05, x: 5 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//                     style={{
//                       backgroundColor: borderColor.replace('0.3', '0.8'),
//                     }}
//                   >
//                     View Project
//                     <motion.svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 22 12"
//                       fill="none"
//                       className="ml-1"
//                       whileHover={{ x: 3 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <path
//                         d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
//                         fill="currentColor"
//                       />
//                     </motion.svg>
//                   </motion.a>
//                 </div>
//               </div>

//               {/* Image */}
//               <div className="relative group">
//                 <div className="relative h-[400px] rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
//                   <motion.div
//                     className="relative w-full h-full z-10"
//                     style={{ scale: imageScale }}
//                   >
//                     <Image
//                       src={url}
//                       alt={title}
//                       fill
//                       className="object-cover transition-transform duration-500 group-hover:scale-105"
//                       sizes="(max-width: 768px) 100vw, 50vw"
//                     />
//                   </motion.div>

//                   {/* Subtle Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent  group-hover:opacity-100 transition-opacity duration-500" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Subtle hover effect */}
//           <div 
//             className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//             style={{
//               backgroundColor: cardColor.replace('0.15', '0.25'),
//             }}
//           />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };





// 'use client';

// import Lenis from '@studio-freight/lenis';
// import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
// import { useRef, useEffect } from 'react';
// import Image from 'next/image';

// interface Project {
//   _id: string;
//   projectTitle: string;
//   projectDescription: string;
//   projectImgLink: string[];
//   projectvideoLink: string[];
//   gitHubRepoLink: string;
//   active?: boolean;
// }

// interface ProjectProps {
//   data: Project[];
// }

// const isValidUrl = (url: string) => {
//   try {
//     new URL(url);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

// // Professional card colors
// const cardColors = [
//   'rgba(59, 130, 246, 0.08)', // Blue
//   'rgba(139, 92, 246, 0.08)', // Purple
//   'rgba(16, 185, 129, 0.08)', // Emerald
//   'rgba(245, 101, 101, 0.08)', // Red
//   'rgba(251, 146, 60, 0.08)', // Orange
//   'rgba(14, 165, 233, 0.08)', // Sky
//   'rgba(168, 85, 247, 0.08)', // Violet
// ];

// // Professional border colors
// const borderColors = [
//   'rgba(59, 130, 246, 0.2)', // Blue
//   'rgba(139, 92, 246, 0.2)', // Purple
//   'rgba(16, 185, 129, 0.2)', // Emerald
//   'rgba(245, 101, 101, 0.2)', // Red
//   'rgba(251, 146, 60, 0.2)', // Orange
//   'rgba(14, 165, 233, 0.2)', // Sky
//   'rgba(168, 85, 247, 0.2)', // Violet
// ];

// const headerVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// export default function Projects({ data }: ProjectProps): JSX.Element {
//   const container = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ['start start', 'end end'],
//   });

//   useEffect(() => {
//     const lenis = new Lenis({
//       smooth: true,
//       lerp: 0.1,
//     });

//     const raf = (time: number) => {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     };

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   if (!data || data.length === 0) return null;

//   // Split projects into two columns
//   const leftProjects = data.filter((_, index) => index % 2 === 0);
//   const rightProjects = data.filter((_, index) => index % 2 === 1);

//   return (
//     <main ref={container}>
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Floating Elements */}
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
//           animate={{
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
//           animate={{
//             x: [0, -40, 0],
//             y: [0, 25, 0],
//             scale: [1, 0.9, 1],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Content */}
//         <div className="relative z-10 text-center px-8">
//           <motion.div
//             variants={headerVariants}
//             initial="hidden"
//             animate="visible"
//             className="space-y-6"
//           >
//             {/* Subtitle */}
//             <motion.div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50">
//               <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
//               <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">
//                 Portfolio
//               </span>
//             </motion.div>

//             {/* Main Title */}
//             <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent leading-tight">
//               Featured
//             </h1>
//             <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight -mt-4">
//               Projects
//             </h2>

//             {/* Description */}
//             <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mt-8">
//               Explore my carefully crafted projects that showcase creativity, 
//               technical expertise, and attention to detail.
//             </p>

//             {/* Stats */}
//             <div className="flex items-center justify-center gap-8 mt-12">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">{data.length}</div>
//                 <div className="text-sm text-slate-400">Projects</div>
//               </div>
//               <div className="h-8 w-px bg-slate-600" />
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">100%</div>
//                 <div className="text-sm text-slate-400">Custom Built</div>
//               </div>
//               <div className="h-8 w-px bg-slate-600" />
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">2024</div>
//                 <div className="text-sm text-slate-400">Latest Work</div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse" />
//           </div>
//         </motion.div>
//       </section>

//       {/* Projects Section - Two Columns */}
//       <section className="relative px-4 md:px-8 mb-30">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex gap-6">
//             {/* Left Column */}
//             <div className="flex-1 space-y-3">
//               {leftProjects.map((project, i) => {
//                 const originalIndex = data.findIndex(p => p._id === project._id);
//                 const targetScale = 1 - (leftProjects.length - i) * 0.02;
//                 return (
//                   <Card
//                     key={project._id}
//                     i={originalIndex}
//                     url={project.projectImgLink[0]}
//                     src={project.gitHubRepoLink}
//                     title={project.projectTitle}
//                     cardColor={cardColors[originalIndex % cardColors.length]}
//                     borderColor={borderColors[originalIndex % borderColors.length]}
//                     description={project.projectDescription}
//                     progress={scrollYProgress}
//                     range={[i * 0.12, 1]}
//                     targetScale={targetScale}
//                     totalCards={leftProjects.length}
//                     columnIndex={i}
//                   />
//                 );
//               })}
//             </div>

//             {/* Right Column */}
//             <div className="flex-1 space-y-3" style={{ marginTop: '80px' }}>
//               {rightProjects.map((project, i) => {
//                 const originalIndex = data.findIndex(p => p._id === project._id);
//                 const targetScale = 1 - (rightProjects.length - i) * 0.02;
//                 return (
//                   <Card
//                     key={project._id}
//                     i={originalIndex}
//                     url={project.projectImgLink[0]}
//                     src={project.gitHubRepoLink}
//                     title={project.projectTitle}
//                     cardColor={cardColors[originalIndex % cardColors.length]}
//                     borderColor={borderColors[originalIndex % borderColors.length]}
//                     description={project.projectDescription}
//                     progress={scrollYProgress}
//                     range={[i * 0.12, 1]}
//                     targetScale={targetScale}
//                     totalCards={rightProjects.length}
//                     columnIndex={i}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// interface CardProps {
//   i: number;
//   title: string;
//   description: string;
//   src: string;
//   url: string;
//   cardColor: string;
//   borderColor: string;
//   progress: MotionValue<number>;
//   range: [number, number];
//   targetScale: number;
//   totalCards: number;
//   columnIndex: number;
// }

// export const Card: React.FC<CardProps> = ({
//   i,
//   title,
//   description,
//   src,
//   url,
//   cardColor,
//   borderColor,
//   progress,
//   range,
//   targetScale,
//   totalCards,
//   columnIndex,
// }) => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ['start end', 'start start'],
//   });

//   const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
//   const scale = useTransform(progress, range, [1, targetScale]);
//   const opacity = 1;

//   return (
//     <div
//       ref={container}
//       className="relative sticky top-4 mb-4"
//       style={{
//         height: 'auto',
//       }}
//     >
//       <motion.div
//         style={{
//           scale,
//           opacity,
//           top: `${columnIndex * 12}px`,
//         }}
//         className="relative w-full"
//       >
//         <motion.div className="relative backdrop-blur-xl bg-white/[0.02] rounded-xl border border-white/[0.05] shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
          
//           {/* Subtle Card Background */}
//           <div 
//             className="absolute inset-0 backdrop-blur-2xl rounded-xl"
//             style={{ 
//               backgroundColor: cardColor,
//             }}
//           />
          
//           {/* Border effect */}
//           <div
//             className="absolute inset-0 rounded-xl border"
//             style={{
//               borderColor: borderColor,
//             }}
//           />
          
//           {/* Content */}
//           <div className="relative z-10 p-4">
//             {/* Project Image */}
//             <div className="relative mb-4">
//               <div className="relative h-32 rounded-lg overflow-hidden bg-slate-800/20 backdrop-blur-sm border border-slate-700/20">
//                 <motion.div
//                   className="relative w-full h-full"
//                   style={{ scale: imageScale }}
//                 >
//                   <Image
//                     src={url}
//                     alt={title}
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-105"
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                   />
//                 </motion.div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               </div>
//             </div>

//             {/* Project Info */}
//             <div className="space-y-3">
//               {/* Project Number and Category */}
//               <div className="flex items-center justify-between">
//                 <div className="inline-flex items-center gap-2">
//                   <span 
//                     className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
//                     style={{
//                       backgroundColor: borderColor.replace('0.2', '0.8'),
//                     }}
//                   >
//                     {String(i + 1).padStart(2, '0')}
//                   </span>
//                   <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">
//                     Project
//                   </span>
//                 </div>
//               </div>

//               {/* Title */}
//               <h3 className="text-lg font-bold text-white leading-tight group-hover:text-slate-100 transition-colors duration-300">
//                 {title}
//               </h3>

//               {/* Description */}
//               <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
//                 {description}
//               </p>

//               {/* CTA */}
//               <div className="pt-1">
//                 <motion.a
//                   href={src}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.02, y: -1 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="inline-flex items-center gap-2 text-white px-3 py-1.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
//                   style={{
//                     backgroundColor: borderColor.replace('0.2', '0.7'),
//                   }}
//                 >
//                   View Project
//                   <motion.svg
//                     width="10"
//                     height="10"
//                     viewBox="0 0 22 12"
//                     fill="none"
//                     className="ml-1"
//                     whileHover={{ x: 2 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <path
//                       d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
//                       fill="currentColor"
//                     />
//                   </motion.svg>
//                 </motion.a>
//               </div>
//             </div>
//           </div>

//           {/* Hover effect */}
//           <div 
//             className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//             style={{
//               backgroundColor: cardColor.replace('0.08', '0.12'),
//             }}
//           />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };






'use client';

import Lenis from '@studio-freight/lenis';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectImgLink: string[];
  projectvideoLink: string[];
  gitHubRepoLink: string;
  active?: boolean;
}

interface ProjectProps {
  data: Project[];
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Professional card colors
const cardColors = [
  'rgba(59, 130, 246, 0.08)', // Blue
  'rgba(139, 92, 246, 0.08)', // Purple
  'rgba(16, 185, 129, 0.08)', // Emerald
  'rgba(245, 101, 101, 0.08)', // Red
  'rgba(251, 146, 60, 0.08)', // Orange
  'rgba(14, 165, 233, 0.08)', // Sky
  'rgba(168, 85, 247, 0.08)', // Violet
];

// Professional border colors
const borderColors = [
  'rgba(59, 130, 246, 0.2)', // Blue
  'rgba(139, 92, 246, 0.2)', // Purple
  'rgba(16, 185, 129, 0.2)', // Emerald
  'rgba(245, 101, 101, 0.2)', // Red
  'rgba(251, 146, 60, 0.2)', // Orange
  'rgba(14, 165, 233, 0.2)', // Sky
  'rgba(168, 85, 247, 0.2)', // Violet
];

const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Projects({ data }: ProjectProps): JSX.Element {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!data || data.length === 0) return null;

  // Split projects into two columns
  const leftProjects = data.filter((_, index) => index % 2 === 0);
  const rightProjects = data.filter((_, index) => index % 2 === 1);

  return (
    <main ref={container}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-8 ">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 "
          >
            {/* Subtitle */}
            <motion.div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
              <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">
                Portfolio
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent leading-tight">
              Featured
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight -mt-4">
              Projects
            </h2>

            {/* Description */}
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mt-8">
              Explore my carefully crafted projects that showcase creativity, 
              technical expertise, and attention to detail.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{data.length}</div>
                <div className="text-sm text-slate-400">Projects</div>
              </div>
              <div className="h-8 w-px bg-slate-600" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-400">Custom Built</div>
              </div>
              <div className="h-8 w-px bg-slate-600" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2024</div>
                <div className="text-sm text-slate-400">Latest Work</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Projects Section - Two Columns */}
      <section className="relative px-4 md:px-8 mb-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-3">
              {leftProjects.map((project, i) => {
                const originalIndex = data.findIndex(p => p._id === project._id);
                const targetScale = 1 - (leftProjects.length - i) * 0.02;
                return (
                  <Card
                    key={project._id}
                    i={originalIndex}
                    url={project.projectImgLink[0]}
                    src={project.gitHubRepoLink}
                    title={project.projectTitle}
                    cardColor={cardColors[originalIndex % cardColors.length]}
                    borderColor={borderColors[originalIndex % borderColors.length]}
                    description={project.projectDescription}
                    progress={scrollYProgress}
                    range={[i * 0.12, 1]}
                    targetScale={targetScale}
                    totalCards={leftProjects.length}
                    columnIndex={i}
                  />
                );
              })}
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-3" style={{ marginTop: '80px' }}>
              {rightProjects.map((project, i) => {
                const originalIndex = data.findIndex(p => p._id === project._id);
                const targetScale = 1 - (rightProjects.length - i) * 0.02;
                return (
                  <Card
                    key={project._id}
                    i={originalIndex}
                    url={project.projectImgLink[0]}
                    src={project.gitHubRepoLink}
                    title={project.projectTitle}
                    cardColor={cardColors[originalIndex % cardColors.length]}
                    borderColor={borderColors[originalIndex % borderColors.length]}
                    description={project.projectDescription}
                    progress={scrollYProgress}
                    range={[i * 0.12, 1]}
                    targetScale={targetScale}
                    totalCards={rightProjects.length}
                    columnIndex={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  cardColor: string;
  borderColor: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  totalCards: number;
  columnIndex: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  cardColor,
  borderColor,
  progress,
  range,
  targetScale,
  totalCards,
  columnIndex,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = 1;

  return (
    <div
      ref={container}
      className="relative sticky top-4 mb-4"
      style={{
        height: 'auto',
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: `${columnIndex * 12}px`,
        }}
        className="relative w-full"
      >
        <motion.div className="relative backdrop-blur-xl bg-white/[0.02] rounded-xl border border-white/[0.05] shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
          
          {/* Subtle Card Background */}
          <div 
            className="absolute inset-0 backdrop-blur-2xl rounded-xl"
            style={{ 
              backgroundColor: cardColor,
            }}
          />
          
          {/* Border effect */}
          <div
            className="absolute inset-0 rounded-xl border"
            style={{
              borderColor: borderColor,
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 p-4">
            {/* Project Image */}
            <div className="relative mb-4">
              <div className="relative min-h-32 max-h-48 rounded-lg overflow-hidden bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 flex items-center justify-center">
                <motion.div
                  className="relative w-full h-auto"
                  style={{ scale: imageScale }}
                >
                  <Image
                    src={url}
                    alt={title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-3">
              {/* Project Number and Category */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2">
                  <span 
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      backgroundColor: borderColor.replace('0.2', '0.8'),
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">
                    Project
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white leading-tight group-hover:text-slate-100 transition-colors duration-300">
                {title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {description}
              </p>

              {/* CTA */}
              <div className="pt-1">
                <motion.a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 text-white px-3 py-1.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                  style={{
                    backgroundColor: borderColor.replace('0.2', '0.7'),
                  }}
                >
                  View Project
                  <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 22 12"
                    fill="none"
                    className="ml-1"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Hover effect */}
          <div 
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundColor: cardColor.replace('0.08', '0.12'),
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};