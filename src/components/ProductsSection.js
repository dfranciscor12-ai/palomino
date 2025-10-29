import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { products as defaultProducts } from '../data/products';
import { LayoutGrid, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsSection = ({ products = defaultProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categories = ['todos', 'perfumes', 'tenis_dama', 'tenis_hombre', 'bolsos'];
  const productsPerPage = 9;

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCategoryNote = (category) => {
    if (category === 'perfumes') {
      return "Nota: Si no se encuentra algún artículo disponible en el momento, puede realizar el pedido sin una larga espera de tiempo. ¡Stock Nacional fresco semanal!";
    }
    return "";
  };

  const handleQuickWhatsApp = (product) => {
    const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name} (ID: ${product.id}) - Por favor confirma disponibilidad y envía imagen de muestra para identificar.`;
    window.open(`https://wa.me/5217151456863?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  // Listen for data updates from admin
  useEffect(() => {
    const handleDataUpdate = (e) => {
      if (e.detail.tab === 'products') {
        // Reload products from localStorage
        const saved = localStorage.getItem('adminProducts');
        if (saved) {
          // Trigger re-render by setting state (props will update via parent)
        }
      }
    };
    window.addEventListener('dataUpdated', handleDataUpdate);
    return () => window.removeEventListener('dataUpdated', handleDataUpdate);
  }, []);

  return (
    <motion.section 
      className="py-16 bg-gradient-to-br from-white to-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
            <LayoutGrid className="w-8 h-8 text-gold mr-3" />
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text-gold">Nuestro Catálogo</h2>
        </motion.div>
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Filter className="w-5 h-5 mt-2 text-gold" />
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-gold-dark to-gold-light text-white shadow-lg'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'todos' ? 'Todos' : category.replace('_', ' ').toUpperCase()}
            </motion.button>
          ))}
        </motion.div>
        {getCategoryNote(selectedCategory) && (
          <motion.p 
            className="text-center text-yellow-800 font-medium mb-6 bg-yellow-50 p-3 rounded-lg border border-yellow-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {getCategoryNote(selectedCategory)}
          </motion.p>
        )}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {currentProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProductCard 
                product={product} 
                onQuickWhatsApp={handleQuickWhatsApp}
                onImageClick={() => setSelectedProduct(product)}
              />
            </motion.div>
          ))}
        </motion.div>
        {/* Paginación */}
        {totalPages > 1 && (
          <motion.div 
            className="flex justify-center items-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => paginate('prev')}
              disabled={currentPage === 1}
              className="disabled:opacity-50 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </motion.button>
            <span className="text-black font-medium">
              Página {currentPage} de {totalPages}
            </span>
            <motion.button
              onClick={() => paginate('next')}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </motion.button>
          </motion.div>
        )}
      </div>
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </motion.section>
  );
};

export default ProductsSection;