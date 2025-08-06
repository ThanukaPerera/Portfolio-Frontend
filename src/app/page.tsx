// Updated Home component with unified background

import AboutMe from "@/component/AboutMe";
import Intro from "@/component/Intro";
import Skills from "@/component/Skills";
import Projects from '@/component/uiLayout/Projects'
import axios from 'axios';
import Footer from "@/component/uiLayout/Footer";
import ScrollingSection from "@/component/uiLayout/ScrollingSection";



import { Poppins} from 'next/font/google';
import ContactDisplay from "@/component/Contact";
import FooterName from "@/component/FooterName";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

// const mulish = Mulish({
//   subsets: ['latin'],
//   weight: ['400', '600'],
//   display: 'swap',
// });

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

async function getIntros() {
  try {
    const res = await axios.get(`${API_BASE}/intros`, { headers: { 'Cache-Control': 'no-store' } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch intros');
  }
}

async function getAboutMes() {
  try {
    const res = await axios.get(`${API_BASE}/aboutMes`, { headers: { 'Cache-Control': 'no-store' } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch aboutMes');
  }
}

async function getProjects() {
  try {
    const res = await axios.get(`${API_BASE}/projects`, { headers: { 'Cache-Control': 'no-store' } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch projects');
  }
}

async function getAchievements() {
  try {
    const res = await axios.get(`${API_BASE}/achievements`, { headers: { 'Cache-Control': 'no-store' } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch achievements');
  }
}

async function getContacts() {
  try {
    const res = await axios.get(`${API_BASE}/contacts`, { headers: { 'Cache-Control': 'no-store' } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch contacts');
  }
}








export default async function Home() {
  const [introData, aboutData, projectData, contactData] = await Promise.all([
    getIntros(),
    getAboutMes(),
    getProjects(),
    getAchievements(),
    getContacts(),
  ]);

  return (
    <div className={`relative min-h-screen ${poppins.className}`}>
      {/* Unified Background Layer */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Color gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/20 via-purple-950/15 to-transparent" />
        </div>

        {/* Global floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-1/3 left-20 w-36 h-36 bg-gradient-to-br from-cyan-500/12 to-blue-500/12 rounded-full blur-2xl animate-float-fast" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-500/15 to-orange-500/15 rounded-full blur-xl animate-float-slow" />
      </div>

      {/* Content sections - now with transparent/minimal backgrounds */}
      <Intro data={introData.response[0]} />
      <AboutMe data={aboutData.response[0]} />
      <Skills data={aboutData.response[0]}/>
      <Projects data={projectData.response}/>
      <ScrollingSection/>
      <ContactDisplay data={contactData.response[0]}/>
      <FooterName/>
      <Footer data={introData.response[0]}/>
    </div>
  );
}







// import AboutMe from "@/component/AboutMe";
// import Intro from "@/component/Intro";
// import Skills from "@/component/Skills";
// import Projects from '@/component/uiLayout/Projects'
// import axios from 'axios';
// import Footer from "@/component/uiLayout/Footer";
// import ScrollingSection from "@/component/uiLayout/ScrollingSection";
// import FocusHover from "@/component/uiLayout/FocusHover"


// import { Poppins,Mulish } from 'next/font/google';


// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '600'],
//   display: 'swap',
// });

// const mulish = Mulish({
//   subsets: ['latin'],
//   weight: ['400', '600'],
//   display: 'swap',
// });

// const API_BASE = 'http://localhost:8000/api';

// async function getIntros() {
//   try {
//     const res = await axios.get(`${API_BASE}/intros`, { headers: { 'Cache-Control': 'no-store' } });
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch intros');
//   }
// }

// async function getAboutMes() {
//   try {
//     const res = await axios.get(`${API_BASE}/aboutMes`, { headers: { 'Cache-Control': 'no-store' } });
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch aboutMes');
//   }
// }

// async function getProjects() {
//   try {
//     const res = await axios.get(`${API_BASE}/projects`, { headers: { 'Cache-Control': 'no-store' } });
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch projects');
//   }
// }

// async function getAchievements() {
//   try {
//     const res = await axios.get(`${API_BASE}/achievements`, { headers: { 'Cache-Control': 'no-store' } });
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch achievements');
//   }
// }

// async function getContacts() {
//   try {
//     const res = await axios.get(`${API_BASE}/contacts`, { headers: { 'Cache-Control': 'no-store' } });
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch contacts');
//   }
// }





// export default async function Home() {
//   const [introData, aboutData, projectData,AchievementData,contactData] = await Promise.all([
//     getIntros(),
//     getAboutMes(),
//     getProjects(),
//     getAchievements(),
//     getContacts(),
//   ]);

//   return (
//     <div className={`bg-slate-950 ${poppins.className}`}>
      
//       <Intro data={introData.response[0]} />
//       <AboutMe data={aboutData.response[0]} />
//       <Skills data={aboutData.response[0]}/>
//       <Projects data={projectData.response}/>
//       <ScrollingSection/>
//       {/* <Project data={projectData.response}/>
//       <Achievements data={AchievementData.response}/> */}
//       {/* <Contact data={contactData.response[0]}/> */}
//       <Footer data={introData.response[0]}/>
      
      
      
      
      
//     </div>
//   );
// }
