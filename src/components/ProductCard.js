import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onQuickWhatsApp, onImageClick }) => {
  const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name} (ID: ${product.id}) - Por favor confirma disponibilidad y envía imagen de muestra para identificar.`;
  const whatsappUrl = `https://wa.me/5217151456863?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer border border-gold/20 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onHoverStart={() => document.body.style.cursor = 'pointer'}
      onHoverEnd={() => document.body.style.cursor = 'default'}
    >
      <motion.div
        className="overflow-hidden relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-64 object-cover group-hover:brightness-110 transition-all duration-300 cursor-zoom-in"
          onClick={() => onImageClick && onImageClick(product)}
        />
        {/* Mini-modal hover sorpresa para zoom y WA rápido */}
        <motion.div 
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <div className="bg-white rounded-full p-4 shadow-2xl flex gap-4 items-center">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onQuickWhatsApp(product); }}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Pedir Ahora
            </motion.button>
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        </motion.div>
      </motion.div>
      <motion.div 
        className="p-6"
        whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-xl font-semibold mb-4 gradient-text-gold"
          whileHover={{ scale: 1.02 }}
        >
          {product.name}
        </motion.h3>
        <motion.a
          href={whatsappUrl}
          className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green/25"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, rotate: 1 }}
          whileTap={{ scale: 0.98 }}
        >
          Hacer Pedido por WhatsApp
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;