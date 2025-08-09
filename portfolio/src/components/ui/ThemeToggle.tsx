import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
        className="text-gray-800 dark:text-yellow-300 text-xl"
      >
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
