
'use client'
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import { calculateAge } from '@/util/ageCalculator';
import { Mail, Smartphone , User, Cake , MapPin, Section } from 'lucide-react';
import SectionTitle from './SectionTitle';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Contact({ data }: ContactProps) {
  if (!data) return null;

  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      {/* Background Elements */}
      <motion.div
        className="absolute top-32 right-32 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-2xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 max-sm:px-6">
        
        <div className="mb-12">
          <SectionTitle title="Contact Information" description="Ready to start your next project? Let us connect and discuss how we can work together." />

        </div>
        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Personal Information Card */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:border-slate-600/50 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">👤</span>
                </div>
                <h3 className={`text-2xl font-semibold text-white ${montserrat.className}`}>
                  Personal Info
                </h3>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/30 transition-colors">
                  <span className="text-blue-400 text-lg"><Mail/></span>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a 
                      href={`mailto:${data.email}`} 
                      className="text-white hover:text-blue-400 transition-colors font-medium"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>

                {data.mobile && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/30 transition-colors">
                    <span className="text-green-400 text-lg"><Smartphone/></span>
                    <div>
                      <p className="text-sm text-slate-400">Mobile</p>
                      <a 
                        href={`tel:${data.mobile}`} 
                        className="text-white hover:text-green-400 transition-colors font-medium"
                      >
                        {data.mobile}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                  <span className="text-purple-400 text-lg"><User/></span>
                  <div>
                    <p className="text-sm text-slate-400">Name</p>
                    <p className="text-white font-medium">{data.name}</p>
                  </div>
                </div>

                {data.bday && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                    <span className="text-orange-400 text-lg"><Cake/></span>
                    <div>
                      <p className="text-sm text-slate-400">Age</p>
                      <p className="text-white font-medium">{calculateAge(data.bday)} years</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Location & Availability Card */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:border-slate-600/50 transition-all duration-300 h-full"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📍</span>
                </div>
                <h3 className={`text-2xl font-semibold text-white ${montserrat.className}`}>
                  Location & Status
                </h3>
              </div>

              {/* Location Info */}
              {data.address && (
                <div className="mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30">
                    <span className="text-pink-400 text-lg mt-1"><MapPin/></span>
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Address</p>
                      <p className="text-white leading-relaxed whitespace-pre-line">
                        {data.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Availability Status */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-green-400 font-semibold">Available for Work</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Open to freelance opportunities, collaborations, and exciting projects. 
                  Let us discuss how we can work together!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.a
              href={`mailto:${data.email}`}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Email
            </motion.a>
            {data.mobile && (
              <motion.a
                href={`tel:${data.mobile}`}
                className="px-8 py-4 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-500 hover:bg-slate-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call Now
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg rotate-12"
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
        className="absolute bottom-1/4 right-10 w-16 h-16 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}







// // components/ContactDisplay.tsx
// 'use client'
// import SectionTitle from '../component/SectionTitle';
// import { calculateAge } from '@/util/ageCalculator';

// interface ContactProps {
//     data: {
//         _id: string;
//         name: string;
//         bday?: string | null; // Changed from age to bday
//         email: string;
//         mobile?: string;
//         address?: string;
//         active: boolean;
//     }
// }

// export default function ContactDisplay({ data }: ContactProps) {
//     return (
//         <div className="flex flex-col  justify-center min-h-screen px-4 max-sm:px-8 max-w-7xl py-12">
//             <SectionTitle title="Contact Information" />
//             <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                         <h3 className="text-lg font-semibold text-primaryColor">Personal Info</h3>
//                         <p className="flex items-center gap-2">
//                             <span className="font-medium">Name:</span>
//                             <span>{data.name}</span>
//                         </p>
//                         {data.bday && (
//                             <p className="flex items-center gap-2">
//                                 <span className="font-medium">Age:</span>
//                                 <span>{calculateAge(data.bday)}</span>
//                             </p>
//                         )}
//                         <p className="flex items-center gap-2">
//                             <span className="font-medium">Email:</span>
//                             <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
//                                 {data.email}
//                             </a>
//                         </p>
//                         {data.mobile && (
//                             <p className="flex items-center gap-2">
//                                 <span className="font-medium">Mobile:</span>
//                                 <a href={`tel:${data.mobile}`} className="text-blue-600 hover:underline">
//                                     {data.mobile}
//                                 </a>
//                             </p>
//                         )}
//                     </div>

//                     {data.address && (
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-semibold text-primaryColor">Address</h3>
//                             <p className="whitespace-pre-line">{data.address}</p>
//                         </div>
//                     )}
//                 </div>

//                 <div className="pt-6 border-t border-gray-200">
//                     <h3 className="text-lg font-semibold text-primaryColor mb-4">Get In Touch</h3>
//                     <p className="text-gray-600">
//                         Feel free to reach out via email or phone. I'm available for freelance opportunities and collaborations.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }