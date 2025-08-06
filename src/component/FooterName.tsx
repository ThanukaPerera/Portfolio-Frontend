"use client"

import React,{ useState, useEffect } from 'react' 
// import { Montserrat } from 'next/font/google';
import axios from 'axios'
import { Intro } from '../types/intro'

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
// });

const API_BASE = 'http://localhost:8000/api';
const FooterName = () => {

   const [introData, setIntroData] = useState<Intro | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [introRes] = await Promise.all([
          axios.get(`${API_BASE}/intros`, { headers: { 'Cache-Control': 'no-store' } })
        ]);
        console.log(introRes.data.response[0]);
        setIntroData(introRes.data.response[0])

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <footer className='group relative overflow-hidden'>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-950/10 to-purple-950/5" />

        <h1 className='text-[7vw] w-[80%] m-auto group-hover:translate-y-4 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent transition-all ease-linear'>
          {`${introData?.fname} ${introData?.lname}`}
          
        </h1>
        <section className='bg-black h-20 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'>

        </section>
      </footer>
  )
}

export default FooterName