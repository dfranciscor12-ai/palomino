import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const PromotionCard = ({ promotion }) => {
  const whatsappUrl = `https://wa.me/5217151456863?text=${encodeURIComponent(promotion.whatsappMessage)}`;

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer relative"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="relative">
        <img
          src={promotion.image}
          alt={promotion.title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-gold text-black px-3 py-1 rounded-full font-bold">
          <Tag size={16} className="inline mr-1" />{promotion.discount}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{promotion.title}</h3>
        <p className="text-gray-600 mb-4">{promotion.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">{promotion.newPrice}</span>
          <span className="text-gray-400 line-through">{promotion.originalPrice}</span>
        </div>
        <motion.a
          href={whatsappUrl}
          className="block w-full bg-green-500 text-white text-center py-3 rounded-full font-semibold"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ¡Aprovechar Oferta!
        </motion.a>
      </div>
    </motion.div>
  );
};

export default PromotionCard;