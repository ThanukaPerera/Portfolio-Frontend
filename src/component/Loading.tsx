import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen px-4 sm:px-8 max-w-7xl mx-auto py-12">
      {/* Section Title Skeleton */}
      <div className="w-full mb-12 animate-pulse">
        <div className="h-12 w-48 bg-primary/20 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="flex w-full items-center sm:flex-col gap-8">
        {/* Lottie Player Skeleton */}
        <div className="h-[70vh] w-1/2 sm:w-full relative overflow-hidden rounded-2xl bg-primary/20 animate-shimmer">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 animate-shimmer" />
        </div>

        {/* Text Content Skeleton */}
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <div className="space-y-4">
            <div className="h-6 bg-primary/20 rounded-full w-4/5 animate-pulse"></div>
            <div className="h-6 bg-primary/20 rounded-full w-3/5 animate-pulse"></div>
            <div className="h-6 bg-primary/20 rounded-full w-2/5 animate-pulse"></div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="h-8 bg-primary/20 rounded-full w-3/4 animate-pulse"></div>
            <div className="h-8 bg-primary/20 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}