import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';

const Newsletter = () => {
  return (
    <motion.section 
      className="bg-black text-white py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div 
          className="mb-6"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Users className="w-12 h-12 text-gold mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2 gradient-text-gold">Únete a Nuestro Grupo de WhatsApp</h3>
          <p className="text-gray-400">Recibe notificaciones diarias de nuevas llegadas, ofertas exclusivas en perfumes y tenis, y tips de moda americana directos a tu chat en Zitácuaro y alrededores.</p>
        </motion.div>
        <motion.a
          href="https://chat.whatsapp.com/IjL7cswGFxL1fjpufg0XEp?mode=ems_wa_t"
          className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Unirme al Grupo
        </motion.a>
      </div>
    </motion.section>
  );
};

export default Newsletter;