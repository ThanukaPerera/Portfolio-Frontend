// import React from 'react';
// import { Sparkles } from '@/component/uiLayout/Sparkles';
// import SocialMediaLinks from './SocialMediaLinks';
// import AnimatedText from './cursor-follow-text';


// interface FooterData {
//   _id: string;
//   welcomeText: string;
//   fname: string;
//   lname: string;
//   title: string;
//   tagline: string;
//   imgLink: string;
//   resumeLink: string;
//   active: boolean;
//   updatedAt: string;
//   motto:string;
// }

// interface FooterProps {
//   data: FooterData;
// }

// function Footer({data}:FooterProps) {

//      if (!data || !data._id) {
//     return null;
//   }

//     return (
//         <>
//             <div className=' w-screen overflow-hidden bg-black'>
//                 <div className='mx-auto  pb-4 w-screen max-w-3xl relative z-10'>
//                     {/* pt-32 */}
//                     <SocialMediaLinks />
//                     <div className='relative h-full w-full bg-white'>
//                         <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
//                     </div>


//                         <AnimatedText
//                             className='2xl:text-[11rem] text-[3vw]'
//                             motto={data?.motto}
//                         />


//                 </div>
//                 <div className='relative h-50 w-screen overflow-hidden '>
//                     <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent h-[2px] w-2/4 mx-auto blur-sm' />
//                     <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent h-px w-2/4 mx-auto' />
//                     <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-gray-50 to-transparent h-px w-1/4 mx-auto' />

//                     <Sparkles
//                         density={1200}
//                         mousemove={true}
//                         className='absolute inset-x-0 -mt-24 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_55%)]'
//                     />
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Footer;








'use client'
import React  from 'react';
import { motion } from 'framer-motion';
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
      ease: "easeOut",
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
      ease: "easeOut",
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
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
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
        className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-xl"
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
          className="max-w-7xl mx-auto px-8 pt-24 pb-16"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600/50 mb-6">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
              <span className="text-slate-300 text-sm font-medium">Let&apos;s Connect</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                collaborate?
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Let&apos;s bring your ideas to life with exceptional design and development
            </p>
          </motion.div>

          {/* Motto Section */}
          <motion.div
            variants={mottoVariants}
            className="text-center mb-16"
          >
            <div className="relative">
              <AnimatedText
                className={`text-4xl md:text-6xl lg:text-8xl font-bold leading-tight ${montserrat.className}`}
                motto={data?.motto}
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl -z-10" />
            </div>
          </motion.div>

          {/* Social Media Links */}
          <motion.div variants={itemVariants} className="mb-16">
            <SocialMediaLinks />
          </motion.div>

          {/* Contact CTA */}
          {/* <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Start a Project
              </motion.button>
              <motion.a
                href={`mailto:contact@${data.fname.toLowerCase()}${data.lname.toLowerCase()}.com`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-500 hover:bg-slate-800 transition-all duration-300"
              >
                Send Message
              </motion.a>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Separator with Sparkles */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Lines */}
          <div className="relative h-24 w-full">
            <div className="absolute inset-x-0 top-8 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent h-[2px] w-3/4 mx-auto blur-sm" />
            <div className="absolute inset-x-0 top-8 bg-gradient-to-r from-transparent via-slate-500/70 to-transparent h-px w-3/4 mx-auto" />
            <div className="absolute inset-x-0 top-8 bg-gradient-to-r from-transparent via-slate-300/90 to-transparent h-px w-1/2 mx-auto" />
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
            {/* Footer Info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center justify-between gap-8"
            >
              {/* Brand */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {data.fname.charAt(0)}{data.lname.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {data.fname} {data.lname}
                  </h3>
                  <p className="text-slate-400 text-sm">{data.title}</p>
                </div>
              </div>

              {/* Status & Links */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-slate-300 text-sm">Available for work</span>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span>Privacy</span>
                  <span>•</span>
                  <span>Terms</span>
                  <span>•</span>
                  <span>Cookies</span>
                </div>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-slate-800 text-center"
            >
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} {data.fname} {data.lname}. All rights reserved.
                Made with 💜 and lots of ☕
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
    </footer>
  );
}

export default Footer;