import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, Search, Save, MapPin, Phone, Clock, Tag } from 'lucide-react';
import { products as initialProducts, promotions as initialPromotions } from '../data/products';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [contact, setContact] = useState({
    address: "Artillería Ote., El Moral, 61516 Zitácuaro, Mich.",
    phone: "+52 715 145 6863",
    hours: ["Lunes a Viernes: 10:00 AM - 8:00 PM", "Sábados: 10:00 AM - 6:00 PM", "Domingos: Cerrado"],
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.058!2d-100.361!3d19.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDA3JzI5LjQiTiAxMDDCsDA3JzI5LjIiVw!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
  });
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [formError, setFormError] = useState('');

  // Initialize data from localStorage with validation
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('adminProducts');
      const savedPromotions = localStorage.getItem('adminPromotions');
      const savedContact = localStorage.getItem('adminContact');
      if (savedProducts) setProducts(JSON.parse(savedProducts));
      else {
        setProducts(initialProducts);
        localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
      }
      if (savedPromotions) setPromotions(JSON.parse(savedPromotions));
      else {
        setPromotions(initialPromotions);
        localStorage.setItem('adminPromotions', JSON.stringify(initialPromotions));
      }
      if (savedContact) setContact(JSON.parse(savedContact));
      else localStorage.setItem('adminContact', JSON.stringify(contact));
    } catch (err) {
      console.error('Error loading data:', err);
      // Fallback to initial data if corrupted
      setProducts(initialProducts);
      setPromotions(initialPromotions);
      setContact(contact);
      localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
      localStorage.setItem('adminPromotions', JSON.stringify(initialPromotions));
      localStorage.setItem('adminContact', JSON.stringify(contact));
    }
  }, []);

  const tabs = [
    { id: 'products', label: 'Productos', Icon: Plus },
    { id: 'promotions', label: 'Promociones', Icon: Tag },
    { id: 'contact', label: 'Contacto', Icon: MapPin }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
    setSearchTerm('');
    setFormError('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleArrayChange = (e, index, field = 'hours') => {
    const newArray = [...contact[field]];
    newArray[index] = e.target.value;
    setContact({ ...contact, [field]: newArray });
  };

  const addHourEntry = () => {
    setContact({ ...contact, hours: [...contact.hours, ''] });
  };

  const removeHourEntry = (index) => {
    const newHours = contact.hours.filter((_, i) => i !== index);
    setContact({ ...contact, hours: newHours });
  };

  const validateForm = () => {
    const requiredFields = activeTab === 'products' 
      ? ['name', 'price', 'image', 'category'] 
      : activeTab === 'promotions' 
      ? ['title', 'discount', 'image', 'originalPrice', 'newPrice', 'description', 'whatsappMessage']
      : [];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        setFormError(`El campo ${field} es requerido.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (activeTab === 'products') {
        if (editingItem) {
          const updated = products.map(p => p.id === editingItem.id ? formData : p);
          setProducts(updated);
          localStorage.setItem('adminProducts', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { tab: 'products' } }));
        } else {
          const newProduct = { 
            id: Date.now().toString(), 
            ...formData 
          };
          const updated = [...products, newProduct];
          setProducts(updated);
          localStorage.setItem('adminProducts', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { tab: 'products' } }));
        }
      } else if (activeTab === 'promotions') {
        if (editingItem) {
          const updated = promotions.map(p => p.id === editingItem.id ? formData : p);
          setPromotions(updated);
          localStorage.setItem('adminPromotions', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { tab: 'promotions' } }));
        } else {
          const newPromotion = { 
            id: Date.now().toString(), 
            ...formData 
          };
          const updated = [...promotions, newPromotion];
          setPromotions(updated);
          localStorage.setItem('adminPromotions', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { tab: 'promotions' } }));
        }
      } else if (activeTab === 'contact') {
        localStorage.setItem('adminContact', JSON.stringify(contact));
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { tab: 'contact' } }));
        alert('Contacto actualizado exitosamente!');
        return;
      }
      setShowForm(false);
      setEditingItem(null);
      setFormData({});
      setFormError('');
      alert(activeTab === 'products' ? 'Producto' : 'Promoción' + (editingItem ? ' actualizado' : ' creado') + ' exitosamente!');
    } catch (err) {
      setFormError('Error al guardar. Intenta de nuevo.');
      console.error('Save error:', err);
    }
  };

  const handleEdit = (item, tab) => {
    setEditingItem(item);
    setFormData(item);
    setActiveTab(tab);
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = (id, tab) => {
    if (window.confirm(`¿Eliminar este ${tab === 'products' ? 'producto' : 'promoción'}?`)) {
      try {
        if (tab === 'products') {
          const updated = products.filter(p => p.id !== id);
          setProducts(updated);
          localStorage.setItem('adminProducts', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { tab: 'products' } }));
        } else if (tab === 'promotions') {
          const updated = promotions.filter(p => p.id !== id);
          setPromotions(updated);
          localStorage.setItem('adminPromotions', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { tab: 'promotions' } }));
        }
        alert('Eliminado exitosamente!');
      } catch (err) {
        setFormError('Error al eliminar.');
        console.error('Delete error:', err);
      }
    }
  };

  const filteredItems = activeTab === 'products' 
    ? products.filter(p => (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()))
    : activeTab === 'promotions'
    ? promotions.filter(p => (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const categories = ['perfumes', 'tenis_dama', 'tenis_hombre', 'bolsos'];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text-gold">Dashboard Admin</h1>
          <motion.button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <LogOut size={20} /> Salir
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-4 px-6 transition-colors ${activeTab === tab.id ? 'bg-gold-light text-black font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
              whileHover={{ scale: 1.02 }}
            >
              <tab.Icon size={20} className="mr-2 inline" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Buscador */}
        {(activeTab === 'products' || activeTab === 'promotions') && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
        )}

        {/* Botón Add */}
        {(activeTab === 'products' || activeTab === 'promotions') && (
          <motion.button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
              setFormData(activeTab === 'products' ? { name: '', price: '', image: '', description: '', category: 'perfumes' } : { title: '', description: '', image: '', discount: '', originalPrice: '', newPrice: '', whatsappMessage: '' });
              setFormError('');
            }}
            className="mb-8 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} /> Agregar {activeTab === 'products' ? 'Producto' : 'Promoción'}
          </motion.button>
        )}

        {/* Formulario */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold gradient-text-gold mb-4">
                {editingItem ? `Modificar ${activeTab === 'products' ? 'Producto' : 'Promoción'}` : `Nuevo ${activeTab === 'products' ? 'Producto' : 'Promoción'}`}
              </h3>
              {formError && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{formError}</p>}
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                {activeTab === 'products' && (
                  <>
                    <input name="name" placeholder="Nombre del producto" value={formData.name || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <select name="category" value={formData.category || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold">
                      {categories.map(cat => <option key={cat} value={cat}>{cat.replace('_', ' ').toUpperCase()}</option>)}
                    </select>
                    <input name="price" placeholder="Precio (e.g., $1,950 MXN)" value={formData.price || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <input name="image" placeholder="URL de imagen" value={formData.image || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <textarea name="description" placeholder="Descripción (opcional)" value={formData.description || ''} onChange={handleInputChange} className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-gold" rows="3" />
                  </>
                )}
                {activeTab === 'promotions' && (
                  <>
                    <input name="title" placeholder="Título de la promoción" value={formData.title || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <input name="discount" placeholder="Descuento (e.g., 15%)" value={formData.discount || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <input name="image" placeholder="URL de imagen" value={formData.image || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <input name="originalPrice" placeholder="Precio original" value={formData.originalPrice || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <input name="newPrice" placeholder="Precio nuevo" value={formData.newPrice || ''} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold" required />
                    <textarea name="description" placeholder="Descripción de la promoción" value={formData.description || ''} onChange={handleInputChange} className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-gold" rows="3" required />
                    <textarea name="whatsappMessage" placeholder="Mensaje para WhatsApp" value={formData.whatsappMessage || ''} onChange={handleInputChange} className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-gold" rows="2" required />
                  </>
                )}
                {activeTab === 'contact' && (
                  <div className="md:col-span-2 space-y-4">
                    <input name="address" placeholder="Dirección completa" value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold w-full" required />
                    <input name="phone" placeholder="Número de teléfono" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold w-full" required />
                    <input name="googleMapsUrl" placeholder="URL embed de Google Maps" value={contact.googleMapsUrl} onChange={(e) => setContact({ ...contact, googleMapsUrl: e.target.value })} className="p-3 border rounded-lg focus:ring-2 focus:ring-gold w-full" required />
                    <div>
                      <label className="block text-sm font-medium mb-2">Horarios de atención</label>
                      {contact.hours.map((hour, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input 
                            value={hour} 
                            onChange={(e) => handleArrayChange(e, index, 'hours')} 
                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-gold" 
                            placeholder="e.g., Lunes a Viernes: 10:00-18:00" 
                          />
                          <button type="button" onClick={() => removeHourEntry(index)} className="p-2 text-red-500 hover:bg-red-100 rounded">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={addHourEntry} className="text-green-500 hover:underline flex items-center gap-1">
                        <Plus size={16} /> Agregar horario
                      </button>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Preview del mapa</label>
                      <iframe 
                        src={contact.googleMapsUrl} 
                        className="w-full h-64 border rounded-md" 
                        title="Preview del mapa" 
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                <motion.button
                  type="submit"
                  className="md:col-span-2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                  whileHover={{ scale: 1.02 }}
                >
                  <Save size={20} className="inline mr-2" /> {activeTab === 'contact' ? 'Guardar cambios contacto' : editingItem ? 'Actualizar' : 'Crear nuevo'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista de Items */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {activeTab === 'products' ? 'Lista de productos' : activeTab === 'promotions' ? 'Lista de promociones' : 'Configuración de contacto'}
              {activeTab === 'contact' && (
                <div className="ml-auto">
                  <motion.button 
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Edit size={14} /> Editar
                  </motion.button>
                </div>
              )}
            </h3>
            {activeTab === 'contact' && (
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <div><strong>Dirección:</strong> {contact.address}</div>
                <div><strong>Teléfono:</strong> {contact.phone}</div>
                <div className="md:col-span-2"><strong>Horarios:</strong> {contact.hours.join('; ')}</div>
              </div>
            )}
          </div>
          <div className="p-6">
            {activeTab === 'products' || activeTab === 'promotions' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-gray-50 p-4 rounded-lg relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <img src={item.image} alt={item.name || item.title || 'Producto'} className="w-full h-32 object-cover rounded mb-2" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Imagen'; }} />
                    <h4 className="text-lg font-semibold text-gray-900">{item.name || item.title || 'Sin nombre'}</h4>
                    <p className="text-sm text-gray-600 mb-4">{item.description || item.discount || 'Sin descripción'}</p>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEdit(item, activeTab)}
                        className="flex-1 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Edit size={16} className="mr-1" /> Editar
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(item.id, activeTab)}
                        className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Trash2 size={16} className="mr-1" /> Eliminar
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : null}
            {filteredItems.length === 0 && (activeTab === 'products' || activeTab === 'promotions') && (
              <p className="text-center text-gray-500 mt-8">No hay items que coincidan con la búsqueda o la lista está vacía. <motion.button onClick={() => setSearchTerm('')} className="underline text-blue-500" whileHover={{ scale: 1.05 }}>Limpiar búsqueda</motion.button></p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;