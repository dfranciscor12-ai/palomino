import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppBubble = () => {
  return (
    <motion.a
      href="https://wa.me/5217151456863?text=Hola%20Bazar%20Americano%20Palomino%2C%20quiero%20consultar%20sobre%20sus%20productos"
      className="fixed bottom-6 right-6 bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-green/50 transition-all duration-300 z-40 flex items-center justify-center"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <MessageCircle size={24} />
    </motion.a>
  );
};

export default WhatsAppBubble;