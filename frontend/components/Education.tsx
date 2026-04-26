'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate, animate, AnimationPlaybackControls } from 'motion/react';

export default function Education() {
  const uvceRef = useRef(null);
  const isInView = useInView(uvceRef, { amount: 0.2 }); // Trigger when 20% visible
  
  const angle = useMotionValue(0);
  const background = useMotionTemplate`conic-gradient(from ${angle}deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #f97316, #06b6d4)`;

  useEffect(() => {
    let animation: AnimationPlaybackControls | undefined;
    if (isInView) {
      animation = animate(angle, 360, {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
      });
    } else {
      angle.set(0);
    }
    return () => animation?.stop();
  }, [isInView, angle]);


  return (
    <section id="education" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center border-b-2 border-black inline-block pb-2">Education</h2>
        
        <div className="relative border-l-4 border-black ml-4 md:ml-8 pl-8 space-y-12">
          {/* UVCE */}
          <div className="relative group border-none before:hidden after:hidden">
            {/* Timeline Dot (Moved outside overflow-hidden) */}
            <div className="absolute -left-[46px] top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 border-2 border-black rounded-full z-10"></div>
            
            <div ref={uvceRef} className="relative rounded-2xl p-[6px] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white">
              {/* 
                 Mandatory Mask-Based Rotating Border
                 - Single Wrapper: Matches card size (absolute inset-0).
                 - Mask: Punches out center.
                 - Animation: Gradient Angle rotates (via motion value).
              */}
              <motion.div 
                className="absolute inset-0 z-0 rounded-2xl"
                style={{
                  background, // Animated conic gradient
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  padding: '6px',
                }}
              />
  
              {/* Inner Card Content - Static */}
              <div className="relative z-10 bg-white rounded-xl h-full"> 
                  <div className="p-6 h-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">University Visvesvaraya College of Engineering (UVCE)</h3>
                      <span className="text-sm font-bold bg-black text-white px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">2023 - Present</span>
                    </div>
                    <p className="text-lg font-medium text-blue-600 mb-2">Bachelor of Engineering in Computer Science</p>
                    <p className="text-gray-700">
                      Focused on core Computer Science fundamentals, Data Structures and Algorithms, Object-Oriented Programming, DBMS and Computer Networks. 
                    </p>
                  </div>
              </div>
            </div>
          </div>


          {/* Pre-University / High School (Optional Placeholder) */}
          <div className="relative border-none before:hidden after:hidden">
            <div className="absolute -left-[46px] top-0 w-6 h-6 bg-white border-2 border-black rounded-full"></div>
            
            <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Ashok Composite PU College</h3>
                <span className="text-sm font-bold bg-gray-200 text-black px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">2021 - 2023</span>
              </div>
              <p className="text-lg font-medium text-gray-600 mb-2">PCMB (Physics, Chemistry, Mathematics, Biology)</p>
              <p className="text-gray-700">
                Built a strong foundation in mathematics and general science principles early on.
              </p>
            </div>
          </div>

          {/* Saint Mary's Public School */}
          <div className="relative border-none before:hidden after:hidden">
            <div className="absolute -left-[46px] top-0 w-6 h-6 bg-white border-2 border-black rounded-full"></div>
            
            <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Saint Mary's Public School</h3>
                <span className="text-sm font-bold bg-gray-200 text-black px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">2010 - 2021</span>
              </div>
              <p className="text-lg font-medium text-gray-600 mb-2">ICSE</p>
              <p className="text-gray-700">
                Basic foundation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
