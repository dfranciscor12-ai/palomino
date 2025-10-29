import React from 'react';
import { motion } from 'framer-motion';
import { Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-black text-white py-8 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div 
          className="flex justify-center space-x-6 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="https://www.facebook.com/lupitA89jul" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gold-light transition-colors p-2"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Facebook size={24} />
          </motion.a>
        </motion.div>
        <p className="text-gray-400">&copy; 2023 Bazar Americano Palomino. Todos los derechos reservados.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;