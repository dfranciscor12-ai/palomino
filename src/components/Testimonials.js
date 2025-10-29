import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/products';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold gradient-text-gold mb-4"> {/* Dorado en título */}
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-gray-800 text-dark"> {/* Negro visible */}
            Escucha experiencias reales de moda y perfumes americanos en Zitácuaro
          </p>
        </motion.div>
        <motion.div
          key={currentIndex}
          className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-current" />
            ))}
          </div>
          <img 
            src={currentTestimonial.image} 
            alt={currentTestimonial.name} 
            className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-gold"
            loading="lazy"
          />
          <p className="text-gray-900 italic text-lg mb-6 text-dark"> {/* Negro para cita */}
            "{currentTestimonial.text}"
          </p>
          <p className="font-bold text-gray-900 text-xl gradient-text-gold"> {/* Dorado en nombre */}
            {currentTestimonial.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;