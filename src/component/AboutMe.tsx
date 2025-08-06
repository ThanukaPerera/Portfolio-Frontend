// 'use client'; // Add this at the top


// import SectionTitle from '../component/SectionTitle';

// interface AboutMeProps {
//  data:{
//   _id: string;
//   lottieURL: string;
//   intro1: string;
//   intro2: string;
//  }
// }

// export default function AboutMe({data}:AboutMeProps) {
//   return (
//     <div className="flex flex-col items-start justify-center min-h-screen px-4 max-sm:px-8 max-w-7xl  py-12">
//       <SectionTitle title="About Me" />
//         <div key={data._id} className="flex w-full items-center max-sm:flex-col gap-8">
//           <div className="h-fit w-1/2 max-sm:w-full">
//             <lottie-player
//               src={data.lottieURL}
//               background="transparent"
//               speed="1"
//               direction="1"
//               loop
//               autoplay
//             ></lottie-player>
//           </div>
//           <div className="flex flex-col gap-5 w-1/2 max-sm:w-full max-sm:justify-center max-sm:items-center text-primary">
//             <p className="text-lg max-sm:text-md  max-sm:text-center leading-relaxed text-primaryColor/90">
//               {data.intro1}
//             </p>
//             <h3 className="text-lg max-sm:text-md max-sm:text-center text-primaryColor">
//               {data.intro2}
//             </h3>
//           </div>
//         </div>
//     </div>
//   );
// }





'use client';
import { motion } from 'framer-motion';
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
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
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

const lottieVariants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -5 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      duration: 1.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function AboutMe({ data }: AboutMeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background Pattern */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-950/20 to-blue-950/30" />
      </div> */}

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-32 right-20 w-40 h-40 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-8 max-sm:px-6 max-w-7xl mx-auto py-12">
        
        {/* Section Title with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-sm:mb-12"
        >
          <SectionTitle title="About Me" />
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          key={data._id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full items-center max-sm:flex-col gap-12 max-sm:gap-8"
        >
          
          {/* Lottie Animation Section */}
          <motion.div
            variants={lottieVariants}
            className="relative w-1/2 max-sm:w-full flex justify-center items-center"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Decorative Background Elements */}
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-2xl" />
              
              {/* Main Lottie Container */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
                <div className="relative overflow-hidden rounded-xl">
                  <lottie-player
                    src={data.lottieURL}
                    background="transparent"
                    speed="1"
                    direction="1"
                    loop
                    autoplay
                    className="w-full h-full"
                  ></lottie-player>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg rotate-12"
                animate={{
                  rotate: [12, 22, 12],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            variants={textVariants}
            className="flex flex-col gap-8 w-1/2 max-sm:w-full max-sm:justify-center max-sm:items-center"
          >
            {/* First Paragraph */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              {/* Decorative Line */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full max-sm:hidden" />
              
              <motion.p
                className={`text-lg max-sm:text-lg max-sm:text-center leading-relaxed text-slate-300 relative ${montserrat.className}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {data.intro1}
              </motion.p>
            </motion.div>

            {/* Second Paragraph */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.h3
                className={`text-lg max-sm:text-lg max-sm:text-center font-semibold leading-relaxed bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent ${montserrat.className}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {data.intro2}
              </motion.h3>
            </motion.div>

            {/* Interactive Elements */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 mt-6 max-sm:justify-center"
            >
              {/* Skills Badge */}
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50"
              >
                <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" />
                <span className="text-slate-300 text-sm font-medium">
                  Creative Developer
                </span>
              </motion.div> */}

              {/* Experience Indicator */}
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-600/30"
              >
                <span className="text-sm text-slate-400">💼 5+ Years Experience</span>
              </motion.div> */}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mt-8 max-sm:flex-col max-sm:w-full"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let's Connect
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-500 hover:bg-slate-800 transition-all duration-300"
              >
                View Projects
              </motion.button> */}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}