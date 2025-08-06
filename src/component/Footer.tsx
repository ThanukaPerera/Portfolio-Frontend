import React from 'react'

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
}

interface FooterProps {
  data: FooterData;
}

const Footer = ({ data }: FooterProps) => {
  
  if (!data || !data._id) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <div key={data._id} className="flex justify-center items-center my-16">
        <h1 className="text-9xl text-white font-semibold font-londrina tracking-widest ">
          {data.fname || ""} {data.lname || ""}
        </h1>
      </div>
    </div>
  )
}

export default Footer