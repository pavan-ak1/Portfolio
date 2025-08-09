import { useState } from 'react';

export const useNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
};

export default useNavigation;
