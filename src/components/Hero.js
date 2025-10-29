import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen bg-cover bg-center flex items-center justify-center text-center text-white relative overflow-hidden" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/000000/FFFFFF?text=Moda+Americana+Exclusiva+en+Zit%C3%A1cuaro')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
      <motion.div 
        className="bg-white/90 backdrop-blur-sm p-8 rounded-lg max-w-4xl mx-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 gradient-text-gold drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Bazar Americano Palomino – Tendencias Exclusivas a tu Alcance
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-gray-900 drop-shadow-md text-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Descubre lo mejor de la moda americana con estilo y calidad premium en Zitácuaro.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/productos"
            className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-gold/50 transition-all duration-300 text-lg inline-block"
          >
            Ver Productos
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;