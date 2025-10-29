import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';

const FlashOffer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) hours = 23;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      className="py-8 bg-gradient-to-r from-gold-dark to-gold relative overflow-hidden"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center text-white relative z-10">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center">
          <Tag className="w-6 h-6 mr-2" /> ¡Oferta Relámpago: 15% OFF en Tenis!
        </h3>
        <p className="mb-4">Solo hoy en Zitácuaro - ¡Corre antes de que se agoten!</p>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Clock className="w-6 h-6" />
          <span>{timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}</span>
        </div>
        <a
          href="https://wa.me/5217151456863?text=Hola, quiero la oferta relámpago de 15% OFF en tenis"
          className="bg-black text-gold px-8 py-3 rounded-full font-bold hover:bg-gold hover:text-black transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          ¡Aprovechar Ahora!
        </a>
      </div>
      <div className="absolute inset-0 bg-black/20" /> {/* Overlay para drama */}
    </motion.section>
  );
};

export default FlashOffer;