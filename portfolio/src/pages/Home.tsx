import AnimatedText from '../components/ui/AnimatedText';
import { motion } from 'framer-motion';
import profilePic from '../assets/main.jpg';
import { FiDownload } from 'react-icons/fi';
import AboutMe from '../components/AboutMe';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import ContactCTA from '../components/ContactCTA';

const Home = () => {

  return (
    <div className="relative min-h-screen overflow-auto pt-24">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-6rem)] flex items-center"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              <span className="block">
                <AnimatedText 
                  text="Hi, I'm"
                  animateBy="words"
                  direction="left"
                  delay={100}
                  className="inline-block mr-2"
                />
                <AnimatedText 
                  text="Pavan A Kustagi"
                  animateBy="words"
                  direction="right"
                  delay={200}
                  className="text-[#4B0082] dark:text-[#B19CD9] inline-block"
                />
              </span>
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
              <AnimatedText
                text="I'm a Software Developer passionate about creating amazing web experiences."
                animateBy="words"
                direction="bottom"
                delay={100}
                className="leading-relaxed"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="/contact" 
                className="px-8 py-3 bg-[#4B0082] text-white rounded-lg font-medium hover:bg-[#3a0066] transition-colors text-center"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}
              >
                Contact Me
              </a>
              <a href="#projects" className="px-8 py-3 border-2 border-[#4B0082] text-[#4B0082] dark:border-[#B19CD9] dark:text-[#B19CD9] rounded-lg font-medium hover:bg-[#4B0082]/10 transition-colors text-center">
                View My Work
              </a>
              <a 
                href="https://drive.google.com/uc?export=download&id=1AE8sEIu8Jb1ViZywO5vxcB1CBDSNalLP" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 rounded-lg font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/70 transition-colors text-center flex items-center justify-center gap-2"
              >
                <FiDownload className="text-lg" />
                Download CV
              </a>
            </div>
          </div>

          {/* Profile Picture */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
                <div className="h-full w-full rounded-full overflow-hidden border-4 border-white dark:border-gray-900">
                  <img 
                    src={profilePic} 
                    alt="Pavan A Kustagi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AboutMe />
      <Education />
      <Projects />
      <Skills />
      <ContactCTA />
    </div>
  );
};

export default Home;
