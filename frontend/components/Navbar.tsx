'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Optimized Scroll Spy & Manual Scroll Handling
  const { activeId, scrollToSection } = useScrollSpy(
    sections.map((s) => s.id),
    { threshold: 0.25 } // Tuned threshold
  );

  const activeSection = activeId || 'home';

  // Efficient Scroll Detection for Glass Effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 20; // Lower threshold often feels better
    if (scrolled !== isScrolled) {
      setScrolled(isScrolled);
    }
  });

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-5xl ${
          // Glassmorphism Container
          'backdrop-blur-md bg-white/70 border border-white/20 shadow-lg rounded-full'
        } ${scrolled ? 'py-2 px-4 shadow-xl' : 'py-3 px-6'}`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="cursor-pointer font-bold text-lg select-none group"
            onClick={() => handleNavClick('home')}
          >
           <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold tracking-tight group-hover:opacity-80 transition-opacity">
              Pavan A Kustagi
           </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 z-10 cursor-pointer ${
                    activeSection === section.id 
                      ? 'text-black' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm border border-gray-100 rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                      }}
                    />
                  )}
                  {section.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-black transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/80 flex flex-col items-center justify-center pt-20 gap-8 md:hidden"
          >
             {sections.map((section) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => handleNavClick(section.id)}
                className={`text-2xl font-bold transition-all transform hover:scale-105 cursor-pointer ${
                    activeSection === section.id ? 'text-blue-600' : 'text-gray-800'
                }`}
              >
                {section.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
