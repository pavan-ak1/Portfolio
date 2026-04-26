import CircularText from "./CircularText";
import TextType from "./TextType";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import LetterGlitch from "./LetterGlitch";


export default function Hero() {
  return (
    <section id="home" className="flex flex-col items-center justify-center min-h-[100dvh] w-full relative overflow-hidden p-4 pt-28 md:pt-24">
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
        />
      </div>
      {/* Main Card */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl border-2 border-black rounded-3xl p-6 md:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white/40 backdrop-blur-xl relative overflow-hidden gap-8 lg:gap-24 z-10">
        
        {/* Left: Profile Circle */}
        <div className="shrink-0 relative group p-4 scale-75 md:scale-100 transition-transform">
          {/* Animated Circular Text */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
             <div className="pointer-events-auto">
               <CircularText 
                  text="BACKEND DEVELOPMENT • GENERATIVE AI • NODE JS • DATABASES • " 
                  onHover="slowDown" 
                  spinDuration={20} 
                  radius={145}
                  className="text-[10px] font-bold"
               />
             </div>
          </div>

          {/* Core Profile Image/Circle */}
          <div className="w-56 h-56 rounded-full border-2 border-black overflow-hidden relative bg-gray-100 z-0 flex items-center justify-center">
             <Image 
               src="/profile_pic.JPG" 
               alt="Pavan A Kustagi" 
               fill 
               className="object-cover"
               priority
             />
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
          <div>
            <h2 className="text-3xl md:text-6xl font-black mb-2">
              Pavan A Kustagi
            </h2>
            <TextType
              text={[
                "Software Engineering",
                "Backend Development",
                "Generative AI"
              ]}
              typingSpeed={100}
              deletingSpeed={50}
              pauseDuration={1500}
              className="text-xl md:text-4xl font-bold text-black block min-h-[40px] md:min-h-[50px]"
              cursorClassName="text-black"
            />

          <p className="text-gray-950 font-medium max-w-lg mt-4">
             Computer Science student at UVCE with hands-on experience in backend development, building secure and scalable software solutions. Enthusiastic about designing, developing, and optimizing systems that solve real-world challenges.
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-3xl text-black">
            <Link href="https://codolio.com/profile/pavan-ak1" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:scale-110 transition-transform duration-200" aria-label="Codolio">
              <FaGlobe />
            </Link>
            <Link href="https://github.com/pavan-ak1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:scale-110 transition-transform duration-200" aria-label="Github">
              <FaGithub />
            </Link>
            <Link href="https://x.com/Pavan_Kustagi" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:scale-110 transition-transform duration-200" aria-label="Twitter">
              <FaTwitter />
            </Link>
            <Link href="https://www.linkedin.com/in/pavan-a-kustagi/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:scale-110 transition-transform duration-200" aria-label="LinkedIn">
              <FaLinkedin />
            </Link>
            <Link href="mailto:kustagipavan30@gmail.com" className="hover:text-red-500 hover:scale-110 transition-transform duration-200" aria-label="Email">
              <FaEnvelope />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
