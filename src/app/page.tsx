// Updated Home component with unified background

import AboutMe from "@/component/AboutMe";
import Intro from "@/component/Intro";
import Skills from "@/component/Skills";
// import Projects from "@/component/uiLayout/Projects";
import axios from "axios";
import Footer from "@/component/uiLayout/Footer";
import TimelineNav from "@/component/TimelineNav";
import { Poppins } from "next/font/google";
import ContactDisplay from "@/component/Contact";
import FooterName from "@/component/FooterName";
import Project2 from "@/component/Project"
import ProfessionalAchievements from "@/component/ProfessionalAchievements";
import { AchievementProvider } from "@/contexts/AchievementContext";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// const mulish = Mulish({
//   subsets: ['latin'],
//   weight: ['400', '600'],
//   display: 'swap',
// });

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
console.log(API_BASE);

// async function getIntros() {
//   try {
//     const res = await axios.get(`${API_BASE}/intros`, {
//       headers: { "Cache-Control": "no-store" },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch intros");
//   }
// }

// async function getAboutMes() {
//   try {
//     const res = await axios.get(`${API_BASE}/aboutMes`, {
//       headers: { "Cache-Control": "no-store" },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch aboutMes");
//   }
// }

// async function getProjects() {
//   try {
//     const res = await axios.get(`${API_BASE}/projects`, {
//       headers: { "Cache-Control": "no-store" },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch projects");
//   }
// }

// async function getAchievements() {
//   try {
//     const res = await axios.get(`${API_BASE}/achievements`, {
//       headers: { "Cache-Control": "no-store" },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch achievements");
//   }
// }

// async function getContacts() {
//   try {
//     const res = await axios.get(`${API_BASE}/contacts`, {
//       headers: { "Cache-Control": "no-store" },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch contacts");
//   }
// }



async function getIntros() {
  const res = await fetch(`${API_BASE}/intros`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch intros");
  return res.json();
}

async function getAboutMes() {
  const res = await fetch(`${API_BASE}/aboutMes`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch aboutMes");
  return res.json();
}

async function getProjects() {
  const res = await fetch(`${API_BASE}/projects`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

async function getAchievements() {
  const res = await fetch(`${API_BASE}/achievements`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch achievements");
  return res.json();
}

async function getContacts() {
  const res = await fetch(`${API_BASE}/contacts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}
export default async function Home() {
  const [introData, aboutData, projectData, contactData, achievementData] = await Promise.all([
    getIntros(),
    getAboutMes(),
    getProjects(),
    getContacts(),
    getAchievements(),
  ]);

  return (
    <AchievementProvider achievements={achievementData.response}>
      <div className={`relative min-h-screen w-full ${poppins.className}`}>
        {/* Unified Background Layer */}
        <div className="fixed inset-0 -z-10">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
            {/* Color gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-950/20 to-transparent" />
          </div>

          {/* Global floating elements */}
         <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-500/15 to-orange-700/15 rounded-full blur-2xl animate-float-slow" />
          <div className="absolute top-1/3 right-20 w-40 h-40 bg-gradient-to-br from-gray-500/10 to-orange-500/10 rounded-full blur-3xl animate-float-medium" />
          <div className="absolute bottom-1/3 left-20 w-36 h-36 bg-gradient-to-br from-orange-500/12 to-gray-500/12 rounded-full blur-2xl animate-float-fast" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-orange-500/15 to-orange-300/15 rounded-full blur-xl animate-float-slow" />
        </div>

        <TimelineNav />
      {/* Content sections - now with transparent/minimal backgrounds */}
      <div className="w-full bg-transparent relative z-20 flex flex-col items-center justify-center">
        {/* <Intro data={introData.response[0]} />
        <AboutMe data={aboutData.response[0]} />
        <Skills data={aboutData.response[0]} />
        <Projects data={projectData.response} />
        <ScrollingSection />
        <ContactDisplay data={contactData.response[0]} />
        <FooterName />
        <Footer data={introData.response[0]} /> */}

        <section id="intro" className="w-full">
          <Intro data={introData.response[0]} />
        </section>
        
        <section id="about" className="w-full">
          <AboutMe data={aboutData.response[0]} />
        </section>
        
        <section id="skills" className="w-full">
          <Skills data={aboutData.response[0]} />
        </section>
        
        <section id="projects" className="w-full">
          {/* <Projects data={projectData.response} /> */}
          <Project2 data={projectData.response} />
        </section>
        
        <section id="scrolling" className="w-full">
          <ProfessionalAchievements data={achievementData.response} />  
        </section>
        
        <section id="contact" className="w-full">
          <ContactDisplay data={contactData.response[0]} />
        </section>
        
        <section id="footer" className="w-full">
          <FooterName data={introData.response[0]} />
          <Footer data={introData.response[0]} />
        </section>

        </div>
      </div>
    </AchievementProvider>
  );
}
