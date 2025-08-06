'use client';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedTextProps {
  
  className?: string;
  motto:string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({  className,motto }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={cn(
        `animated-text  text-[15vw] text-center tracking-[-0.06em] w-full font-bold  leading-[80%] mt-8
                
                [--gradient-text-center:rgb(226,226,226)] [--gradient-text-edge:rgba(0,9,12,0.1)]`,
        className
      )}
      style={
        {
          '--text-mouse-x': `${mousePosition.x}px`,
          '--text-mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      {/* {text} */}
      {motto}
    </div>
  );
};

export default AnimatedText;
