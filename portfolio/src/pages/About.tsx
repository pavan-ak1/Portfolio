import { motion } from 'framer-motion';
import AnimatedText from '../components/ui/AnimatedText';
import SplitText from '../components/ui/SplitText';
import BlurText from '../components/ui/BlurText';
import profilePic from '../assets/main.jpg';

// Initialize GSAP plugins
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 py-12 pt-24"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <AnimatedText
            text="About Me"
            animateBy="letters"
            direction="top"
            delay={50}
          />
        </h1>
        <div className="w-24 h-1 bg-[#4B0082] mx-auto"></div>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-8 mb-12"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8 flex justify-center cursor-target">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
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
          </div>
          <div className="md:w-2/3">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                <SplitText
                  text="Hi, I'm Pavan A Kustagi"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  className="inline-block"
                />
              </h2>
              <div className="space-y-6">
                <BlurText
                  text="I'm a Software Developer passionate about creating amazing web experiences."
                  delay={100}
                  animateBy="words"
                  direction="bottom"
                  className="text-xl text-gray-600"
                  onAnimationComplete={() => console.log('Introduction animation complete')}
                />
                <BlurText
                  text="With expertise in modern web technologies and a keen eye for design, I bring ideas to life with clean, efficient code."
                  delay={150}
                  animateBy="words"
                  direction="bottom"
                  className="text-lg text-gray-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
        </motion.div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'MongoDB',
              'PostgreSQL', 'GraphQL', 'REST APIs', 'Docker', 'AWS', 'CI/CD',
              'Git', 'Jest', 'React Testing Library', 'Tailwind CSS', 'SASS', 'Responsive Design'
            ].map((skill) => (
              <div key={skill} className="flex items-center cursor-target">
                <span className="w-2 h-2 bg-[#4B0082] rounded-full mr-2"></span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Let's Work Together</h3>
        <p className="text-gray-600 text-center mb-6">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div className="text-center">
          <a
            href="mailto:kustagipavan30@gmail.com"
            className="cursor-target inline-block px-6 py-3 bg-[#4B0082] text-white font-medium rounded-md hover:bg-[#3A0066] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B0082] transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
