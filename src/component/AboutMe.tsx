'use client';
import { motion,easeOut, Transition,easeInOut  } from 'framer-motion';
import SectionTitle from '../component/SectionTitle';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface AboutMeProps {
  data: {
    _id: string;
    lottieURL: string;
    intro1: string;
    intro2: string;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
};

const lottieVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as Transition["ease"],
    },
  },
};

export default function AboutMe({ data }: AboutMeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden max-w-5xl mx-auto">
      {/* Subtle floating elements */}
      <motion.div
        className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-br from-orange-500/8 to-red-500/8 rounded-full blur-xl"
        animate={{
          x: [0, -10, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-red-500/6 to-orange-500/6 rounded-full blur-2xl"
        animate={{
          x: [0, 15, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 max-sm:px-6 max-w-7xl mx-auto py-20">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sm:mb-16"
        >
          <SectionTitle title="About Me" description='A brief introduction about who I am, my approach to problem-solving, and the qualities I bring to every project.' />
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          key={data._id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full items-center max-sm:flex-col gap-8 sm:gap-16 "
        >
          
          {/* Lottie Animation Section */}
          <motion.div
            variants={lottieVariants}
            className="relative w-1/2 sm:w-1/2 flex justify-center items-center"
          >
            {/* Subtle glow background */}
            <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-3xl blur-2xl opacity-60" />
            
            {/* Main Container */}
            <motion.div 
              className="relative rounded-2xl p-1 border border-orange-500/20 shadow-2xl shadow-orange-500/10"
              whileHover={{
                boxShadow: "0 0 40px rgba(249, 115, 22, 0.3), 0 0 80px rgba(239, 68, 68, 0.15)",
                borderColor: "rgba(249, 115, 22, 0.4)",
                transition: { duration: 0.3 }
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.15)",
                  "0 0 30px rgba(239, 68, 68, 0.2)",
                  "0 0 20px rgba(249, 115, 22, 0.15)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Gradient border */}
              <div className="bg-gradient-to-r from-orange-500/80 to-red-500/80 p-[1px] rounded-2xl ">
                <div className="bg-black rounded-2xl overflow-hidden">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.lottieURL ? `
                        <lottie-player
                          src="${data.lottieURL}"
                          background="transparent"
                          speed="1"
                          direction="1"
                          loop
                          autoplay
                          style="width: 100%; height: 100%;"
                        ></lottie-player>
                      ` : '<div style="width: 100%; height: 300px; background: linear-gradient(135deg, #f97316, #ef4444); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">Animation Loading...</div>'
                    }}
                    className="w-full h-full "
                  />
                </div>
              </div>
            </motion.div>

            {/* Single floating accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full shadow-lg shadow-orange-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            variants={textVariants}
            className="flex flex-col gap-5 sm:gap-16 w-md sm:w-1/2 max-sm:justify-center max-sm:items-center"
          >
            {/* First Paragraph */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              {/* Subtle accent line */}
              <div className="absolute -left-4 top-0 w-0.5 h-full bg-gradient-to-b from-orange-500/60 to-red-500/60 rounded-full max-sm:hidden" />
              
              <motion.p
                className={`text-sm sm:text-sm max-sm:text-center leading-relaxed text-gray-200 ${montserrat.className}`}
                whileHover={{ color: "#f3f4f6" }}
                transition={{ duration: 0.2 }}
              >
                {data.intro1}
              </motion.p>
            </motion.div>

            {/* Second Paragraph with Gradient Text */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.h3
                className={`text-sm sm:text-sm max-sm:text-center font-semibold leading-relaxed bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent ${montserrat.className}`}
                whileHover={{ 
                  scale: 1.01
                }}
                transition={{ duration: 0.2 }}
              >
                {data.intro2}
              </motion.h3>
            </motion.div>

            
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}