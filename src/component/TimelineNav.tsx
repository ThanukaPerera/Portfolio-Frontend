// TimelineNav.js - Vertical Timeline Navigation Component
'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Code, FolderOpen, Mail, Home, Award, MessageCircle } from 'lucide-react';



 const navItems = [
    { id: 'intro', label: 'Home', icon: Home, color: 'orange' },
    { id: 'about', label: 'About', icon: User, color: 'gray' },
    { id: 'skills', label: 'Skills', icon: Code, color: 'orange' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'gray' },
    { id: 'scrolling', label: 'Experience', icon: Award, color: 'orange' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'gray' },
    { id: 'footer', label: 'Connect', icon: MessageCircle, color: 'orange' },
  ];

const TimelineNav = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isVisible, setIsVisible] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId:string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Vertical Timeline Navigation */}
      <nav className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 hidden lg:block ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/30 via-gray-400/30 to-orange-500/30" />
          
          {/* Navigation Items */}
          <div className="space-y-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isOrange = item.color === 'orange';
              
              return (
                <div key={item.id} className="relative group">
                  {/* Timeline Node */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? isOrange 
                        ? 'bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/50' 
                        : 'bg-gray-300 border-gray-200 shadow-lg shadow-gray-500/50'
                      : 'bg-gray-800 border-gray-600 hover:border-gray-400'
                  }`} />
                  
                  {/* Navigation Button */}
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-3 p-3 pl-12 rounded-r-full transition-all duration-300 group-hover:translate-x-2 ${
                      isActive
                        ? isOrange
                          ? 'bg-orange-500/20 text-orange-400 shadow-lg'
                          : 'bg-gray-700/40 text-gray-300 shadow-lg'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    
                    {/* Label - appears on hover */}
                    <span className={`font-medium whitespace-nowrap transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {item.label}
                    </span>
                    
                    {/* Arrow indicator for active item */}
                    {isActive && (
                      <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                        isOrange ? 'text-orange-400' : 'text-gray-300'
                      }`} />
                    )}
                  </button>
                  
                  {/* Tooltip for inactive items */}
                  {!isActive && (
                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 lg:hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
          <div className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isOrange = item.color === 'orange';
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? isOrange
                        ? 'bg-orange-500/20 text-orange-400 shadow-lg'
                        : 'bg-gray-700/60 text-gray-300 shadow-lg'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`} />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900/20 z-40">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 ease-out"
          style={{
            width: `${((navItems.findIndex(item => item.id === activeSection) + 1) / navItems.length) * 100}%`
          }}
        />
      </div>
    </>
  );
};

export default TimelineNav;