import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPython,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiGithub, 
  SiPostman, SiCloudinary, SiGit
} from 'react-icons/si';
import { FaKey, FaJava, FaDatabase } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';

type IconMap = {
  [key: string]: React.ReactNode;
};

const getSkillIcon = (skill: string) => {
  // Map of skill names to their corresponding icons
  const iconMap: IconMap = {
    // Languages
    'JavaScript': <SiJavascript className="text-yellow-400" />,
    'TypeScript': <SiTypescript className="text-blue-500" />,
    'Java': <FaJava className="text-red-500" />,
    'HTML5': <SiHtml5 className="text-orange-500" />,
    'CSS3': <SiCss3 className="text-blue-400" />,
    'C++': <BiCodeAlt className="text-blue-600" />, // Using generic code icon
    'Python (familiar)': <SiPython className="text-blue-700" />,
    
    // Frontend
    'React.js (basic proficiency)': <SiReact className="text-blue-400" />,
    
    // Backend
    'Node.js': <SiNodedotjs className="text-green-500" />,
    'Express.js': <SiExpress className="text-gray-800 dark:text-gray-200" />,
    'REST APIs': <BiCodeAlt className="text-green-500" />, // Using generic code icon
    'MongoDB': <SiMongodb className="text-green-600" />,
    'Mongoose': <SiMongodb className="text-red-500" />, // Using MongoDB icon as fallback
    
    // Authentication
    'JWT': <FaKey className="text-pink-500" />,
    'bcrypt': <FaKey className="text-gray-400" />,
    'CORS': <BiCodeAlt className="text-green-500" />, // Using generic code icon
    
    // Database
    'MongoDB Atlas': <FaDatabase className="text-green-600" />,
    'Cloudinary Storage': <SiCloudinary className="text-blue-400" />,
    
    // Tools
    'Git': <SiGit className="text-orange-500" />,
    'GitHub': <SiGithub className="text-gray-200" />,
    'Postman': <SiPostman className="text-orange-500" />,
    'Cloudinary': <SiCloudinary className="text-blue-400" />,
  };

  return iconMap[skill] || <span className="w-4 h-4 rounded-full bg-indigo-500 mr-2"></span>;
};

const skillsData = {
  languages: [
    'JavaScript', 
    'TypeScript', 
    'Java', 
    'HTML5', 
    'CSS3', 
    'C++', 
    'Python (familiar)'
  ],
  frontend: [
    'React.js (basic proficiency)'
  ],
  backend: [
    'Node.js', 
    'Express.js', 
    'REST APIs', 
    'MongoDB', 
    'Mongoose'
  ],
  authentication: [
    'JWT', 
    'bcrypt', 
    'CORS'
  ],
  database: [
    'MongoDB Atlas', 
    'Cloudinary Storage'
  ],
  tools: [
    'Git', 
    'GitHub', 
    'Postman', 
    'Cloudinary'
  ]
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#4B0082] dark:text-[#B19CD9]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <ul className="space-y-2">
                {skills.map((skill, skillIndex) => (
                  <motion.li 
                    key={skillIndex}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                      {getSkillIcon(skill)}
                    </div>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
