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

interface AboutMe {
  _id: string;
  skills: string[];
  skillsImgLink: string[];
}

interface SkillsProps {
  data: AboutMe;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Skills({ data }: SkillsProps) {
  if (!data || !data.skills || data.skills.length === 0) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-start justify-center mx-auto max-w-7xl py-16 px-8 max-sm:px-6">
        
        {/* Section Title with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-sm:mb-12"
        >
          <SectionTitle title="Skills" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={data._id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <div className="grid grid-cols-5 max-sm:grid-cols-2 gap-8 max-sm:gap-6">
            {data.skills.map((skill, skillIndex) => (
              <motion.div
                key={`${data._id}-${skillIndex}`}
                variants={skillVariants}
                whileHover="hover"
                className="flex justify-center"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="group relative w-full max-w-[200px]"
                >
                  {/* Main Card */}
                  <div className="relative border border-gray-600/30 rounded-lg p-6 h-48 flex flex-col items-center justify-between transition-all duration-300 hover:border-gray-500/50">
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                      
                      {/* Skill Name */}
                      <div className="flex items-center justify-center h-16">
                        <motion.h3
                          className={`text-lg font-semibold text-gray-200 text-center leading-tight group-hover:text-white transition-colors duration-300 ${montserrat.className}`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.h3>
                      </div>
                      
                      {/* Skill Icon */}
                      <div className="flex items-center justify-center h-20 w-20">
                        <motion.div
                          className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-300"
                          whileHover={{ rotate: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Image
                            src={data.skillsImgLink[skillIndex]}
                            alt={skill}
                            fill
                            className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                            sizes="64px"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-gray-600/30 rounded-full">
            <span className="w-2 h-2 bg-gray-400 rounded-full" />
            <span className="text-gray-300 font-medium">
              {data.skills.length} Skills
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 text-sm">
              Professional Development
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}




