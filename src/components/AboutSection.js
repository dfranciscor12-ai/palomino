import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Shield } from 'lucide-react';

const AboutSection = () => {
  return (
    <motion.section 
      className="py-16 bg-white/80"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold gradient-text-gold mb-4"> {/* Dorado en título */}
            ✨ Bazar Americano Palomino ✨
          </h2>
          <p className="text-lg text-gray-900 max-w-3xl mx-auto leading-relaxed text-dark"> {/* Negro visible */}
            PRECIOS DE MAYOREO‼️ En todos nuestros artículos<br/>
            Piezas únicas en Marcas ORIGINALES ✅️ encontrarás aquí en tu BAZAR AMERICANO PALOMINO ✔️<br/>
            Contamos con envíos Nacionales y Locales 📦<br/>
            Además de servicio de Apartado 🏷<br/>
            Más de 10 años en nuestro domicilio nos respaldan ofreciendo calidad y generando confianza ✅️
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <motion.div className="text-center p-6 rounded-lg bg-gray-50 shadow-md" whileHover={{ scale: 1.05 }}>
            <Truck className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2 text-dark"> {/* Negro */}
              Envíos Rápidos
            </h3>
            <p className="text-gray-700"> {/* Gris oscuro */}
              Nacionales y locales en 2-5 días.
            </p>
          </motion.div>
          <motion.div className="text-center p-6 rounded-lg bg-gray-50 shadow-md" whileHover={{ scale: 1.05 }}>
            <Package className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2 text-dark">
              Apartados Fáciles
            </h3>
            <p className="text-gray-700">
              Paga en plazos sin intereses.
            </p>
          </motion.div>
          <motion.div className="text-center p-6 rounded-lg bg-gray-50 shadow-md" whileHover={{ scale: 1.05 }}>
            <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2 text-dark">
              Calidad Garantizada
            </h3>
            <p className="text-gray-700">
              10+ años de confianza local en Zitácuaro.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;