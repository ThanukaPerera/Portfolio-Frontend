




'use client'
import { motion, type Variants , easeInOut } from 'framer-motion';
import SectionTitle from './SectionTitle';

interface ContactProps {
  data: {
    _id: string;
    name: string;
    bday?: string | null;
    email: string;
    mobile?: string;
    address?: string;
    active: boolean;
  };
}

// Optimized animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// const cardVariants: Variants = {
//   hidden: { opacity: 0, scale: 0.9, y: 40 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.25, 0.46, 0.45, 0.94],
//     },
//   },
// };

const glowVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(249, 115, 22, 0.3)",
      "0 0 40px rgba(239, 68, 68, 0.4)",
      "0 0 20px rgba(249, 115, 22, 0.3)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

export default function Contact({ data }: ContactProps) {
  if (!data) return null;

  return (
    <div className="relative overflow-hidden py-24 ">
      {/* Enhanced floating elements */}
      <motion.div
        className="absolute top-20 right-16 w-32 h-32 bg-gradient-to-br from-orange-500/15 to-red-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -15, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: easeInOut,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-16 w-28 h-28 bg-gradient-to-br from-red-500/12 to-orange-500/12 rounded-full blur-2xl"
        animate={{
          x: [0, 18, -12, 0],
          y: [0, -15, 20, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: easeInOut,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-xl"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 max-sm:px-6">
        
        <motion.div 
          className=" text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionTitle title="Let&apos;s Create Together" />

          <motion.p
            className="text-gray-400 sm:text-md text-sm mt-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to transform your ideas into digital reality? Let&apos;s collaborate and create something extraordinary together.
          </motion.p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
       
         
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-6  text-lg max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            
            <motion.a
              href={`mailto:${data.email}`}
              className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden group"
              variants={glowVariants}
              animate="animate"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 50px rgba(249, 115, 22, 0.5), 0 0 100px rgba(239, 68, 68, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2 text-sm">
                Get in Touch 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced decorative accents */}
      <motion.div
        className="absolute top-1/4 left-12 w-8 h-8 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-12 w-6 h-6 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-sm rotate-45"
        animate={{
          rotate: [45, 135, 45],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 left-1/3 w-4 h-4 bg-gradient-to-br from-orange-400/25 to-red-400/25 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}