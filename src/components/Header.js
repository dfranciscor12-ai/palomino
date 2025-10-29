import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Promociones', path: '/promociones' },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="https://utfs.io/f/5BN0V4mlt4NUPseS4VPFIFa3KOMUyLeAVcoT7PDkWib8R4Bd" 
            alt="Bazar Americano Palomino Logo" 
            className="h-40 w-auto object-contain filter drop-shadow-2xl backdrop-blur-sm rounded-full bg-gradient-to-r from-gold/30 to-gold-dark/30 p-4 mix-blend-multiply hover:scale-110 transition-all duration-300 shadow-gold/50 border-2 border-gold/20"
            loading="lazy"
          />
        </Link>
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`text-black hover:text-gold-dark transition-all font-semibold py-2 ${location.pathname === item.path ? 'border-b-2 border-gold-dark font-bold' : ''}`}
                >
                  {item.name}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
        <motion.button 
          className="md:hidden text-black" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
        {isMenuOpen && (
          <motion.ul 
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md md:hidden flex flex-col space-y-4 p-4 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`text-black hover:text-gold-dark transition-all block py-2 font-semibold ${location.pathname === item.path ? 'text-gold-dark font-bold' : ''}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              </li>
            ))}
          </motion.ul>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;