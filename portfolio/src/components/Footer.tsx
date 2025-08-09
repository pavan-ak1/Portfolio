import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/pavan-ak1',
      icon: <FaGithub className="h-5 w-5" />,
      color: "hover:text-gray-800 dark:hover:text-gray-200"
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/pavan-a-kustagi',
      icon: <FaLinkedin className="h-5 w-5" />,
      color: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/Pavan_Kustagi',
      icon: <FaTwitter className="h-5 w-5" />,
      color: "hover:text-blue-400 dark:hover:text-blue-300"
    },
    {
      name: 'Email',
      url: 'mailto:kustagipavan30@gmail.com',
      icon: <FaEnvelope className="h-5 w-5" />,
      color: "hover:text-red-500 dark:hover:text-red-400"
    },
  ];

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
    } else {
      // If already on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const footerLinks = [
    { 
      name: 'Home',
      isLink: true,
      path: '/',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = '/';
      }
    },
    { 
      name: 'About',
      isLink: true,
      path: '/about',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = '/about';
      }
    },
    { 
      name: 'Projects', 
      isLink: false,
      onClick: () => scrollToSection('projects') 
    },
    { 
      name: 'Contact',
      isLink: true,
      path: '/contact',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = '/contact';
      }
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Brand & Description */}
          <motion.div 
            className="md:col-span-4"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <FaCode className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Pavan A Kustagi
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Crafting seamless digital experiences with modern web technologies and clean code.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 dark:text-gray-400 ${item.color} transition-colors duration-300`}
                  aria-label={item.name}
                  whileHover={{ y: -2 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="md:col-span-2 md:col-start-7"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  {link.isLink ? (
                    <a
                      href={link.path}
                      onClick={link.onClick}
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 text-left w-full"
                    >
                      {link.name}
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="md:col-span-3"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaEnvelope className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:kustagipavan30@gmail.com" 
                  className="ml-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  kustagipavan30@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <FaCode className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                <span className="ml-3 text-gray-600 dark:text-gray-300">
                  Based in Bangalore, India
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} Pavan A Kustagi. All rights reserved.
          </p>
          <p className="mt-2 text-gray-400 dark:text-gray-500 text-xs">
            Built with <span className="text-indigo-500">React</span>, <span className="text-blue-500">TypeScript</span>, and <span className="text-teal-400">Tailwind CSS</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
