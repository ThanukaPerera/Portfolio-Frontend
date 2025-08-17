// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import SectionTitle from './SectionTitle';
// import { motion } from 'framer-motion';
// import { Montserrat } from 'next/font/google';

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
// });

// interface AboutMe {
//   _id: string;
//   skills: string[];
//   skillsImgLink: string[];
// }

// interface SkillsProps {
//   data: AboutMe;
// }

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.2,
//       staggerChildren: 0.1,
//     },
//   },
// };

// const skillVariants = {
//   hidden: { opacity: 0, y: 50, scale: 0.9 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// const cardHoverVariants = {
//   hover: {
//     y: -5,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
// };

// export default function Skills({ data }: SkillsProps) {
//   if (!data || !data.skills || data.skills.length === 0) return null;

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center mx-auto max-w-7xl py-16 px-8 max-sm:px-6">
        
//         {/* Section Title with Animation */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-16 max-sm:mb-12"
//         >
//           <SectionTitle title="My Skills" />
//         </motion.div>

//         {/* Skills Grid */}
//         <motion.div
//           key={data._id}
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="w-full"
//         >
//           <div className="grid grid-cols-5 max-sm:grid-cols-2 gap-8 max-sm:gap-6">
//             {data.skills.map((skill, skillIndex) => (
//               <motion.div
//                 key={`${data._id}-${skillIndex}`}
//                 variants={skillVariants}
//                 whileHover="hover"
//                 className="flex justify-center"
//               >
//                 <motion.div
//                   variants={cardHoverVariants}
//                   className="group relative w-full max-w-[200px]"
//                 >
//                   {/* Main Card */}
//                   <div className="relative border border-gray-600/30 rounded-lg p-6 h-48 flex flex-col items-center justify-between transition-all duration-300 hover:border-gray-500/50">
                    
//                     {/* Content */}
//                     <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                      
//                       {/* Skill Name */}
//                       <div className="flex items-center justify-center h-16">
//                         <motion.h3
//                           className={`text-lg font-semibold text-gray-200 text-center leading-tight group-hover:text-white transition-colors duration-300 ${montserrat.className}`}
//                           whileHover={{ scale: 1.02 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           {skill}
//                         </motion.h3>
//                       </div>
                      
//                       {/* Skill Icon */}
//                       <div className="flex items-center justify-center h-20 w-20">
//                         <motion.div
//                           className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-300"
//                           whileHover={{ rotate: 2 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <Image
//                             src={data.skillsImgLink[skillIndex]}
//                             alt={skill}
//                             fill
//                             className="object-contain filter group-hover:brightness-110 transition-all duration-300"
//                             sizes="64px"
//                           />
//                         </motion.div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

         
//       </div>
//     </div>
//   );
// }




'use client';

import React from 'react';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface SkillsData {
  _id: string;
  skills?: string[];
  skillsImgLink?: string[];
}

interface SkillsProps {
  data: SkillsData;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    } 
  },
};

const skillVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.6
    } 
  },
};

// Categorize Skills
const categorizeSkills = (skills: string[] = []) => {
  // Define skill categories with exact matches and priorities
  const categoryMap: { [key: string]: string } = {};
  
  // Web & Mobile frameworks and technologies (highest priority for web/mobile specific items)
  const webAndMobile = [
    'React JS', 'React', 'Angular', 'Bootstrap', 'Tailwind CSS', 'Material UI', 
    'Next.js', 'Vue.js', 'Svelte', 'Flutter', 'React Native', 'Ionic', 'Xamarin',
    'Node JS', 'Node.js', 'Express JS', 'Express', 'Ballerina', 'Springboot', 'Spring Boot',
    'FastAPI', 'Django', 'Flask', 'ASP.NET', 'Laravel', 'CodeIgniter', 'HTML', 'CSS'
  ];
  
  // Programming Languages (pure languages only)
  const languages = [
    'C', 'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'PHP', 
    'Ruby', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'MATLAB'
  ];
  
  // Databases
  const databases = [
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'SQLite', 'Redis', 'Cassandra', 
    'Oracle', 'SQL Server', 'MariaDB', 'DynamoDB', 'Elasticsearch'
  ];
  
  // Tools and platforms
  const tools = [
    'Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify', 'Docker', 'Figma', 'Photoshop',
    'Visual Studio Code', 'IntelliJ', 'Eclipse', 'Sublime Text', 'Atom', 'WebStorm',
    'Jenkins', 'Travis CI', 'CircleCI', 'AWS', 'Azure', 'Google Cloud', 'Heroku',
    'Jira', 'Trello', 'Slack', 'Discord', 'Zoom', 'Teams'
  ];

  // First pass: categorize by exact matches (case insensitive)
  skills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    
    // Check Web & Mobile first (highest priority for frameworks)
    if (webAndMobile.some(w => w.toLowerCase() === skillLower)) {
      categoryMap[skill] = 'Web & Mobile';
    }
    // Then databases
    else if (databases.some(d => d.toLowerCase() === skillLower)) {
      categoryMap[skill] = 'Databases';
    }
    // Then tools
    else if (tools.some(t => t.toLowerCase() === skillLower)) {
      categoryMap[skill] = 'Tools';
    }
    // Finally languages (lowest priority to avoid conflicts)
    else if (languages.some(l => l.toLowerCase() === skillLower)) {
      categoryMap[skill] = 'Languages';
    }
    // Fallback to Tools for unmatched skills
    else {
      categoryMap[skill] = 'Tools';
    }
  });

  // Group skills by category
  const categorized = {
    'Web & Mobile': skills.filter(skill => categoryMap[skill] === 'Web & Mobile'),
    'Languages': skills.filter(skill => categoryMap[skill] === 'Languages'),
    'Databases': skills.filter(skill => categoryMap[skill] === 'Databases'),
    'Tools': skills.filter(skill => categoryMap[skill] === 'Tools'),
  };

  return categorized;
};

export default function Skills( {data} : SkillsProps) {
  console.log("Skills Data:", data);
  if (!data || !data.skills || data.skills.length === 0) return <div className="text-white">No skills available</div>;

  const categorized = categorizeSkills(data.skills);

  return (
    <div className="relative min-h-screen overflow-hidden  text-white">
      <div className="relative z-10 flex flex-col items-center justify-center mx-auto max-w-7xl py-16 px-8 max-sm:px-6">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-sm:mb-12"
        >
          <SectionTitle title="My Skills" />
        </motion.div>

        {/* Skills Grid with Category Cards */}
        <motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto"
>
  {['Web & Mobile', 'Languages', 'Databases', 'Tools'].map((category) => {
    const skillsArray = categorized[category as keyof typeof categorized];
    if (!skillsArray || skillsArray.length === 0) return null;

    return (
      <motion.div
        key={category}
        variants={skillVariants}
        className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300 shadow-lg"
      >
        {/* Category Title */}
        <div className="text-center mb-6">
          <h3 className={`text-xl font-bold text-white mb-2 ${montserrat.className}`}>
            {category}
          </h3>
        </div>

        {/* Skills in responsive 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillsArray.map((skill) => {
            const skillIndex = data.skills?.indexOf(skill) ?? -1;

            return (
              <motion.div
                key={`${category}-${skill}`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 hover:border-gray-500/50 hover:bg-gray-800/80 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  {/* Skill Icon */}
                  {skillIndex >= 0 && data.skillsImgLink?.[skillIndex] && (
                    <div className="flex-shrink-0 w-7 h-7 relative">
                      <Image
                        src={data.skillsImgLink[skillIndex]}
                        alt={skill}
                        fill
                        className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                        sizes="28px"
                      />
                    </div>
                  )}

                  {/* Skill Name */}
                  <h4 className={`text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300 truncate ${montserrat.className}`}>
                    {skill}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  })}
</motion.div>


        
      </div>
    </div>
  );
}
