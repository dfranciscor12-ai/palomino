import React from 'react';
import { motion } from 'framer-motion';

const MapSection = ({ contact = {} }) => {
  const { address = "Artillería Ote., El Moral, 61516 Zitácuaro, Mich.", phone = "+52 715 145 6863", hours = [], googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.058!2d-100.361!3d19.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDA3JzI5LjQiTiAxMDDCsDA3JzI5LjIiVw!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx" } = contact;

  return (
    <motion.section 
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 gradient-text-gold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Visítanos
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="rounded-lg overflow-hidden shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <iframe
              src={googleMapsUrl}
              width="100%"
              height="400"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Bazar Americano Palomino"
            />
          </motion.div>
          <motion.div 
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dirección</h3>
              <p className="text-gray-700">{address}</p>
            </motion.div>
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} viewport={{ once: true }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-700">{phone}</p>
            </motion.div>
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Horarios de Atención</h3>
              <ul className="text-gray-700 space-y-1">
                {hours.map((hour, index) => <li key={index}>{hour}</li>)}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MapSection;