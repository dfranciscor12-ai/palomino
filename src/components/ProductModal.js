import React from 'react';
import { motion } from 'framer-motion';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name} (ID: ${product.id}) - Por favor confirma disponibilidad y envía imagen de muestra para identificar.`;
  const whatsappUrl = `https://wa.me/5217151456863?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={20} className="text-gray-600" />
        </motion.button>
        <motion.div 
          className="relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          style={{ cursor: 'zoom-in' }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[60vh] object-cover cursor-zoom-in"
            drag
            dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
            dragElastic={0.1}
          />
          <motion.div 
            className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
            whileHover={{ opacity: 1 }}
          >
            <motion.p className="text-white bg-black/50 px-4 py-2 rounded">Haz zoom y pan para detalles</motion.p>
          </motion.div>
        </motion.div>
        <div className="p-6">
          <h3 className="text-2xl font-bold gradient-text-gold mb-4">
            {product.name}
          </h3>
          <a
            href={whatsappUrl}
            className="block w-full bg-green-500 text-white text-center py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;