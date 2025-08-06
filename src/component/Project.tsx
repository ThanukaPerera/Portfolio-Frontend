'use client';
import React from 'react';
import Image from 'next/image';
import SectionTitle from "./SectionTitle";

interface Project {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectImgLink: string[];
  projectvideoLink: string[];
  gitHubRepoLink: string;
  active?: boolean;
}

interface ProjectProps {
  data: Project[];
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.error("Invalid URL:", url, e);
    return false;
  }
};

export default function Projects({ data }: ProjectProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="flex flex-col items-start min-h-screen max-w-7xl py-12">
      {/* Section Title with responsive alignment */}
      <div className="w-full text-left max-sm:text-center">
        <SectionTitle title="Projects" />
      </div>

      <div className="w-full  mx-auto px-4 max-sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 max-sm:grid-cols-2  gap-4 md:gap-6 w-full">
          {data.map((project) => (
            <div
              key={project._id}
              className="group relative bg-white w-full h-full p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                {/* Compact Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3">
                  {isValidUrl(project.projectImgLink[0]) ? (
                    <Image
                      src={project.projectImgLink[0]}
                      alt={project.projectTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Compact Text Content */}
                <div className="flex-1 flex flex-col space-y-2">
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {project.projectTitle}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {project.projectDescription}
                  </p>
                  
                  {/* Links with Compact Spacing */}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center gap-1">
                      {isValidUrl(project.gitHubRepoLink) && (
                        <a
                          href={project.gitHubRepoLink}
                          className="text-blue-500 hover:underline text-xs md:text-sm"
                        >
                          View Code
                        </a>
                      )}
                      
                      {/* {project.projectvideoLink[0] && isValidUrl(project.projectvideoLink[0]) && (
                        <a
                          href={project.projectvideoLink[0]}
                          className="text-blue-500 hover:underline text-xs md:text-sm"
                        >
                          Demo
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}