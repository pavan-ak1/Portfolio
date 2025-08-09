import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ui/ThemeToggle';

const Navbar = () => {

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-indigo-500/90 dark:bg-indigo-900/90 backdrop-blur-md shadow-lg fixed w-full z-50 mt-4 mx-auto left-0 right-0 max-w-[calc(100%-2rem)] rounded-xl border border-indigo-400/30 dark:border-indigo-700/50"
    >
      <div className="max-w-6xl w-full mx-auto px-6 py-2">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white dark:text-indigo-200 ml-2">
            Pavan A Kustagi
          </Link>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
