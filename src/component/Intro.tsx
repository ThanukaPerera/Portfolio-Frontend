
'use client'
import { motion } from 'framer-motion';
import Button from '@/component/Button';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

interface IntroProps {
  data: {
    _id: string;
    welcomeText: string;
    fname: string;
    lname: string;
    title: string;
    tagline: string;
    resumeLink: string;
    imgLink: string;
  };
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
      ease: "easeOut",
    },
  },
};

const nameVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -5 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      duration: 1,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Intro({ data }: IntroProps) {
  if (!data) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background Pattern for Dark Theme */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/30 to-purple-950/20" />
      </div> */}

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

      {/* Main Content */}
      <div className="relative z-10 mt-12 flex flex-row items-center justify-between gap-16 min-h-screen max-w-7xl mx-auto px-8 max-sm:flex-col max-sm:justify-center max-sm:gap-12 max-sm:px-6 max-sm:pt-20">
        
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col w-1/2 gap-4 max-sm:w-full max-sm:items-center max-sm:text-center max-sm:gap-6 max-sm:order-2"
        >
          {/* Welcome Text */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 max-sm:items-center">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50 w-fit">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
              <span className="text-slate-300 text-sm font-medium">
                {data.welcomeText}
              </span>
            </motion.div>

            {/* Name with Gradient */}
            <motion.h1
              variants={nameVariants}
              className={`text-7xl max-sm:text-5xl font-bold leading-tight ${montserrat.className}`}
            >
              <span className="block bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                {data.fname}
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {data.lname}
              </span>
            </motion.h1>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl max-sm:text-xl mt-8 font-semibold text-slate-200 leading-relaxed"
          >
            {data.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-sm max-sm:text-base text-slate-400 leading-relaxed w-4/5 max-sm:w-full"
          >
            {data.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center text-sm gap-4 mt-6 max-sm:flex-col max-sm:w-full max-sm:mt-4"
          >
            <Button
              text="Download Resume"
              link={data.resumeLink}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-500 hover:bg-slate-800 transition-all duration-300"
            >
              View Portfolio
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-8 max-sm:justify-center max-sm:mt-6"
          >
            {/* <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm text-slate-400 ml-2">
                Trusted by 100+ clients
              </span>
            </div>
            <div className="h-4 w-px bg-slate-600" />
            <div className="flex items-center gap-1">
              <span className="text-sm text-slate-400">⭐ 4.9/5 rating</span>
            </div> */}
          </motion.div>
        </motion.div>

        {/* Profile Image Section */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative w-1/2 max-sm:w-full flex justify-center items-center max-sm:order-1"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full" />
            
            {/* Main Image Container */}
            <motion.div 
              className="relative w-[450px] h-[450px] max-sm:w-[280px] max-sm:h-[280px] cursor-pointer"
              whileHover={{ 
                scale: 1.08,
                transition: { 
                  duration: 0.3, 
                  ease: "easeOut" 
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image Border Effect */}
              <motion.div 
                className="absolute inset-0 bg-blue-500 rounded-full p-1"
                whileHover={{
                  backgroundColor: "#3b82f6",
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="w-full h-full bg-slate-900 rounded-full p-2 overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  >
                    <Image
                      src={data.imgLink}
                      alt={`${data.fname} ${data.lname}`}
                      fill
                      className="rounded-full object-cover"
                      sizes="(max-width: 640px) 280px, 450px"
                      priority
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Badge */}
              {/* <motion.div
                className="absolute -top-4 -right-4 bg-slate-800 rounded-full p-3 shadow-lg border border-slate-700"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-2xl">👋</span>
              </motion.div> */}

              {/* Status Indicator */}
              {/* <motion.div
                className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Available for work
              </motion.div> */}
            </motion.div>
          </motion.div>

          {/* Decorative Shapes */}
          <motion.div
            className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg rotate-12"
            animate={{
              rotate: [12, 22, 12],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}