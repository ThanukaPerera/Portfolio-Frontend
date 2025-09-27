"use client"

import React,{ useState,useEffect } from 'react' 
// import { Montserrat } from 'next/font/google';


// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
// });


interface FooterNameProps {
  data:IntroProps;
}

interface IntroProps{
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

const FooterName = (data: FooterNameProps) => {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

 useEffect(() => {
    if (data?.data) {
      // destructure safely
      const { fname, lname } = data.data;
      setFname(fname);
      setLname(lname);
    } else {
      // fallback defaults
      setFname("Thanuka");
      setLname("Perera");
    }
  }, [data]); // run when `data` changes

  return (
    <footer className='group relative overflow-hidden w-full'>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-950/10 to-orange-950/5" />

        <h1 className='text-4xl sm:text-8xl w-[80%] m-auto group-hover:translate-y-4 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent transition-all ease-linear'>
          {`${fname} ${lname}`}
          
        </h1>
        <section className='bg-black h-20 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'>

        </section>
      </footer>
  )
}

export default FooterName