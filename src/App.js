import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import FlashOffer from './components/FlashOffer';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import Testimonials from './components/Testimonials';
import PromotionCard from './components/PromotionCard';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppBubble';
import Newsletter from './components/Newsletter';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { products as initialProducts, promotions as initialPromotions, contact as initialContact } from './data/products';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white p-8 rounded-lg max-w-sm text-center shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
      >
        <h3 className="text-2xl font-bold mb-4">¡Bienvenido a Bazar Americano Palomino!</h3>
        <p className="mb-6 text-gray-600">Recibe 10% OFF en tu primera compra de tenis. ¡Únete ahora!</p>
        <a
          href="https://wa.me/5217151456863?text=Hola, soy nuevo y quiero 10% OFF en tenis"
          className="bg-gold text-black px-6 py-3 rounded-full font-bold mr-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          ¡Reclamar Oferta!
        </a>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-500 underline"
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
};

const Home = ({ products, promotions, contact }) => (
  <>
    <Hero />
    <FlashOffer />
    <AboutSection />
    <ProductsSection products={products} />
    <Testimonials />
    <MapSection contact={contact} />
    <WelcomePopup />
  </>
);

const Productos = ({ products }) => (
  <>
    <div className="pt-20 min-h-screen bg-white">
      <FlashOffer />
      <ProductsSection products={products} />
    </div>
  </>
);

const Promociones = ({ promotions }) => (
  <>
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold gradient-text-gold mb-4">Promociones Especiales</h1>
            <p className="text-xl text-gray-800">Ofertas exclusivas en perfumes, tenis y bolsos solo en Bazar Americano Palomino, Zitácuaro. ¡No te las pierdas!</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </div>
      </section>
    </div>
  </>
);

const Contacto = ({ contact }) => (
  <>
    <div className="pt-20 min-h-screen bg-white">
      <FlashOffer />
      <MapSection contact={contact} />
    </div>
  </>
);

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
};

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [promotions, setPromotions] = useState(initialPromotions);
  const [contact, setContact] = useState(initialContact || {
    address: "Artillería Ote., El Moral, 61516 Zitácuaro, Mich.",
    phone: "+52 715 145 6863",
    hours: ["Lunes a Viernes: 10:00 AM - 8:00 PM", "Sábados: 10:00 AM - 6:00 PM", "Domingos: Cerrado"],
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.058!2d-100.361!3d19.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDA3JzI5LjQiTiAxMDDCsDA3JzI5LjIiVw!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
  });

  useEffect(() => {
    const loadData = () => {
      const savedProducts = localStorage.getItem('adminProducts');
      const savedPromotions = localStorage.getItem('adminPromotions');
      const savedContact = localStorage.getItem('adminContact');
      if (savedProducts) setProducts(JSON.parse(savedProducts));
      if (savedPromotions) setPromotions(JSON.parse(savedPromotions));
      if (savedContact) setContact(JSON.parse(savedContact));
    };

    loadData(); // Initial load

    const handleDataUpdate = (e) => {
      loadData(); // Reload on admin changes
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    return () => window.removeEventListener('dataUpdated', handleDataUpdate);
  }, []);

  return (
    <Router>
      <div className="font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home products={products} promotions={promotions} contact={contact} />} />
          <Route path="/productos" element={<Productos products={products} />} />
          <Route path="/promociones" element={<Promociones promotions={promotions} />} />
          <Route path="/contacto" element={<Contacto contact={contact} />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <WhatsAppBubble />
        <Newsletter />
        <Footer />
      </div>
    </Router>
  );
};

export default App;