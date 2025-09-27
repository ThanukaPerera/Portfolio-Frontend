'use client'
import React  from 'react';
import { easeOut, motion } from 'framer-motion';
import { Sparkles } from '@/component/uiLayout/Sparkles';
import SocialMediaLinks from './SocialMediaLinks';
import AnimatedText from './cursor-follow-text';
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

interface FooterData {
  _id: string;
  welcomeText: string;
  fname: string;
  lname: string;
  title: string;
  tagline: string;
  imgLink: string;
  resumeLink: string;
  active: boolean;
  updatedAt: string;
  motto: string;
}

interface FooterProps {
  data: FooterData;
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const mottoVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
};


function Footer({ data }: FooterProps) {
  if (!data || !data._id) {
    return null;
  }

  return (
    <footer className="relative w-full overflow-hidden bg-black">
      {/* bg-gradient-to-br from-black via-slate-950 to-black */}
      {/* Background with Dark Theme */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-950/20 to-purple-950/10" />
      </div> */}

      {/* Floating Elements */}
      
      <motion.div
        className="absolute top-10 sm:top-20 left-4 sm:left-20 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 sm:bottom-40 right-4 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Top Section with Motto */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-12 lg:pb-16"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50 mb-6">
              <span className="w-2 h-2 bg-gradient-to-r from-orange-500  to-orange-400 rounded-full animate-pulse" />
              <span className="text-slate-300 text-sm font-medium">Let&apos;s Connect</span>
            </div> */}

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Ready to{' '}
              <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-800 bg-clip-text text-transparent">
                collaborate?
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-md max-w-2xl mx-auto px-4">
              Let&apos;s bring your ideas to life with exceptional design and development
            </p>
          </motion.div>

          {/* Motto Section */}
          <motion.div
            variants={mottoVariants}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="relative px-2 sm:px-4">
              <AnimatedText
                className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ${montserrat.className}`}
                motto={data?.motto}
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl -z-10" />
            </div>
          </motion.div>

          {/* Social Media Links */}
          <motion.div variants={itemVariants} className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto px-4">
            <SocialMediaLinks />
          </motion.div>

         
        </motion.div>

        {/* Separator with Sparkles */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Lines */}
          <div className="relative h-16 sm:h-20 lg:h-24 w-full">
            <div className="absolute inset-x-0 top-6 sm:top-8 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent h-[2px] w-4/5 sm:w-3/4 mx-auto blur-sm" />
            <div className="absolute inset-x-0 top-6 sm:top-8 bg-gradient-to-r from-transparent via-slate-500/70 to-transparent h-px w-4/5 sm:w-3/4 mx-auto" />
            <div className="absolute inset-x-0 top-6 sm:top-8 bg-gradient-to-r from-transparent via-slate-300/90 to-transparent h-px w-3/5 sm:w-1/2 mx-auto" />
          </div>

          {/* Sparkles Effect */}
          <Sparkles
            density={800}
            mousemove={true}
            className="absolute inset-0 h-full w-full [mask-image:radial-gradient(60%_50%,white,transparent_70%)]"
          />
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-b from-transparent to-black/50"
        >
          <div className="max-w-7xl mx-auto px-8 py-12">
           

            {/* Copyright */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-slate-800 text-center"
            >
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} {data.fname} {data.lname}. All rights reserved.

              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
    </footer>
  );
}

export default Footer;