import { useState } from 'react';
import { Phone, ArrowLeft, ShoppingBag, Tag, Trash2, Plus, Minus, X } from 'lucide-react';
import { translations } from '../data/translations';

import deskImg    from '../images/products/desk.jpg';
import chairImg   from '../images/products/chair.jpg';
import cabinetImg from '../images/products/cabinet.jpg';
import lampImg    from '../images/products/lamp.jpg';
import shelfImg   from '../images/products/shelf.jpg';
import standImg   from '../images/products/stand.jpg';
import pensImg    from '../images/products/pens.jpg';
import paperImg   from '../images/products/paper.jpg';
import folderImg  from '../images/products/folder.jpg';

const CONTENT = {
  fr: {
    title:    'Notre Boutique',
    subtitle: 'Mobilier de bureau, fournitures scolaires & livres',
    back:     'Retour à l\'accueil',
    all:      'Tout',
    bureau:   'Mobilier de Bureau',
    papeterie:'Papeterie & Fournitures',
    livres:   'Livres & Scolaire',
    order:    'Commander par WhatsApp',
    call:     'Appeler pour info',
    contact:  'Pour commander ou demander un prix, contactez-nous directement.',
    badge:    'Sur commande',
  },
  ar: {
    title:    'متجرنا',
    subtitle: 'أثاث مكتبي، لوازم مدرسية وكتب',
    back:     'العودة إلى الرئيسية',
    all:      'الكل',
    bureau:   'أثاث مكتبي',
    papeterie:'قرطاسية ولوازم',
    livres:   'كتب ومستلزمات مدرسية',
    order:    'اطلب عبر واتساب',
    call:     'اتصل للاستفسار',
    contact:  'للطلب أو الاستفسار عن الأسعار، تواصل معنا مباشرة.',
    badge:    'عند الطلب',
  },
  en: {
    title:    'Our Store',
    subtitle: 'Office furniture, school supplies & books',
    back:     'Back to home',
    all:      'All',
    bureau:   'Office Furniture',
    papeterie:'Stationery & Supplies',
    order:    'Order via WhatsApp',
    call:     'Call for info',
    contact:  'To order or ask for a price, contact us directly.',
    badge:    'On order',
  },
};

const PRODUCTS = {
  fr: [
    // Bureau
    { id: 1, cat: 'bureau',    img: deskImg,    name: 'Bureau de Travail',        desc: 'Bureau ergonomique moderne, idéal pour le home office ou l\'entreprise.',              price: 'À partir de 450 DH', priceNum: 450 },
    { id: 2, cat: 'bureau',    img: chairImg,   name: 'Chaise de Bureau',         desc: 'Chaise confortable avec accoudoirs réglables, parfaite pour de longues sessions.',     price: 'À partir de 350 DH', priceNum: 350 },
    { id: 3, cat: 'bureau',    img: cabinetImg, name: 'Armoire de Classement',    desc: 'Armoire robuste pour le rangement et l\'archivage de vos documents importants.',       price: 'À partir de 600 DH', priceNum: 600 },
    { id: 4, cat: 'bureau',    img: lampImg,    name: 'Lampe de Bureau',          desc: 'Éclairage LED réglable, protège vos yeux et réduit la fatigue visuelle.',              price: 'À partir de 80 DH',  priceNum: 80 },
    { id: 5, cat: 'bureau',    img: shelfImg,   name: 'Étagère à Livres',         desc: 'Étagère solide en bois ou métal, parfaite pour organiser vos livres et dossiers.',     price: 'À partir de 200 DH', priceNum: 200 },
    { id: 6, cat: 'bureau',    img: standImg,   name: 'Présentoir & Support',     desc: 'Support multifonction pour écran, livres ou documents. Gain de place garanti.',        price: 'À partir de 120 DH', priceNum: 120 },
    // Papeterie
    { id: 7, cat: 'papeterie', img: pensImg,    name: 'Stylos & Crayons',         desc: 'Large gamme de stylos, crayons, marqueurs et stylos à bille de toutes marques.',       price: 'À partir de 3 DH',   priceNum: 3 },
    { id: 8, cat: 'papeterie', img: paperImg,   name: 'Papier & Cahiers',         desc: 'Rames de papier A4, cahiers grands formats, petits formats, bloc-notes et carnets.',    price: 'À partir de 15 DH',  priceNum: 15 },
    { id: 9, cat: 'papeterie', img: folderImg,  name: 'Classeurs & Dossiers',     desc: 'Classeurs rigides, intercalaires, pochettes plastiques, dossiers suspendus.',           price: 'À partir de 10 DH',  priceNum: 10 },
    // Livres
    { id: 10, cat: 'livres',   img: shelfImg,   name: 'Livres Scolaires',         desc: 'Manuels officiels du primaire, collège et lycée. Toutes matières disponibles.',        price: 'Sur demande',        priceNum: 0 },
    { id: 11, cat: 'livres',   img: folderImg,  name: 'Fournitures Scolaires',    desc: 'Kits complets pour la rentrée : cartable, trousse, règle, équerre, compas.',           price: 'Sur demande',        priceNum: 0 },
    { id: 12, cat: 'livres',   img: standImg,   name: 'Livres Parascolaires',     desc: 'Cahiers d\'exercices, guides pédagogiques, dictionnaires et ouvrages de révision.',    price: 'Sur demande',        priceNum: 0 },
  ],
  ar: [
    { id: 1, cat: 'bureau',    img: deskImg,    name: 'طاولة مكتب',               desc: 'مكتب عصري مريح، مثالي للعمل من المنزل أو في الشركة.',                                  price: 'ابتداءً من 450 درهم', priceNum: 450 },
    { id: 2, cat: 'bureau',    img: chairImg,   name: 'كرسي مكتبي',               desc: 'كرسي مريح مع مساند يد قابلة للتعديل، مثالي لجلسات العمل الطويلة.',                    price: 'ابتداءً من 350 درهم', priceNum: 350 },
    { id: 3, cat: 'bureau',    img: cabinetImg, name: 'خزانة تصنيف',              desc: 'خزانة متينة لتخزين وأرشفة وثائقك الهامة.',                                              price: 'ابتداءً من 600 درهم', priceNum: 600 },
    { id: 4, cat: 'bureau',    img: lampImg,    name: 'مصباح مكتبي',              desc: 'إضاءة LED قابلة للتعديل، تحمي عينيك وتقلل الإجهاد البصري.',                           price: 'ابتداءً من 80 درهم',  priceNum: 80 },
    { id: 5, cat: 'bureau',    img: shelfImg,   name: 'رف كتب',                   desc: 'رف متين من الخشب أو المعدن، مثالي لتنظيم كتبك وملفاتك.',                               price: 'ابتداءً من 200 درهم', priceNum: 200 },
    { id: 6, cat: 'bureau',    img: standImg,   name: 'حامل عرض ودعامة',          desc: 'حامل متعدد الوظائف للشاشة أو الكتب أو الوثائق.',                                       price: 'ابتداءً من 120 درهم', priceNum: 120 },
    { id: 7, cat: 'papeterie', img: pensImg,    name: 'أقلام وأدوات الكتابة',     desc: 'مجموعة واسعة من الأقلام والرصاص والماركرات من جميع العلامات التجارية.',                price: 'ابتداءً من 3 دراهم',  priceNum: 3 },
    { id: 8, cat: 'papeterie', img: paperImg,   name: 'ورق وكراسات',              desc: 'رزم ورق A4، كراسات كبيرة وصغيرة، مذكرات ودفاتر ملاحظات.',                             price: 'ابتداءً من 15 درهم',  priceNum: 15 },
    { id: 9, cat: 'papeterie', img: folderImg,  name: 'ملفات وحافظات',            desc: 'ملفات صلبة، فواصل، أكياس بلاستيكية، وملفات معلقة.',                                   price: 'ابتداءً من 10 دراهم', priceNum: 10 },
    { id: 10, cat: 'livres',   img: shelfImg,   name: 'الكتب المدرسية',           desc: 'الكتب الرسمية للابتدائي والإعدادي والثانوي. جميع المواد متوفرة.',                      price: 'عند الطلب',           priceNum: 0 },
    { id: 11, cat: 'livres',   img: folderImg,  name: 'اللوازم المدرسية',         desc: 'مجموعات كاملة للدخول المدرسي: محفظة، مدرجة، مسطرة، مثلث، فرجار.',                     price: 'عند الطلب',           priceNum: 0 },
    { id: 12, cat: 'livres',   img: standImg,   name: 'كتب تكميلية',              desc: 'كراسات تمارين، مراجع تربوية، قواميس وكتب المراجعة.',                                   price: 'عند الطلب',           priceNum: 0 },
  ],
  en: [
    { id: 1, cat: 'bureau',    img: deskImg,    name: 'Work Desk',                desc: 'Modern ergonomic desk, ideal for home office or business use.',                         price: 'From 450 MAD',       priceNum: 450 },
    { id: 2, cat: 'bureau',    img: chairImg,   name: 'Office Chair',             desc: 'Comfortable chair with adjustable armrests, perfect for long work sessions.',           price: 'From 350 MAD',       priceNum: 350 },
    { id: 3, cat: 'bureau',    img: cabinetImg, name: 'Filing Cabinet',           desc: 'Sturdy cabinet for storing and archiving your important documents.',                     price: 'From 600 MAD',       priceNum: 600 },
    { id: 4, cat: 'bureau',    img: lampImg,    name: 'Desk Lamp',                desc: 'Adjustable LED lighting that protects your eyes and reduces visual fatigue.',           price: 'From 80 MAD',        priceNum: 80 },
    { id: 5, cat: 'bureau',    img: shelfImg,   name: 'Bookshelf',                desc: 'Solid wood or metal shelf, perfect for organizing your books and folders.',             price: 'From 200 MAD',       priceNum: 200 },
    { id: 6, cat: 'bureau',    img: standImg,   name: 'Display Stand',            desc: 'Multifunctional stand for screen, books or documents. Guaranteed space saving.',        price: 'From 120 MAD',       priceNum: 120 },
    { id: 7, cat: 'papeterie', img: pensImg,    name: 'Pens & Pencils',           desc: 'Wide range of pens, pencils, markers and ballpoints of all brands.',                   price: 'From 3 MAD',         priceNum: 3 },
    { id: 8, cat: 'papeterie', img: paperImg,   name: 'Paper & Notebooks',        desc: 'A4 paper reams, large and small notebooks, notepads and journals.',                    price: 'From 15 MAD',        priceNum: 15 },
    { id: 9, cat: 'papeterie', img: folderImg,  name: 'Binders & Folders',        desc: 'Hard binders, dividers, plastic sleeves, suspension folders.',                         price: 'From 10 MAD',        priceNum: 10 },
    { id: 10, cat: 'livres',   img: shelfImg,   name: 'School Textbooks',         desc: 'Official manuals for primary, middle and high school. All subjects available.',         price: 'On request',         priceNum: 0 },
    { id: 11, cat: 'livres',   img: folderImg,  name: 'School Supplies',          desc: 'Complete back-to-school kits: bag, pencil case, ruler, set square, compass.',          price: 'On request',         priceNum: 0 },
    { id: 12, cat: 'livres',   img: standImg,   name: 'Study Books',              desc: 'Exercise books, educational guides, dictionaries and revision books.',                  price: 'On request',         priceNum: 0 },
  ],
};

function ProductCard({ product, c, darkMode, addToCart, cartItem, translationsCart }) {
  const quantity = cartItem ? cartItem.quantity : 0;
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="relative overflow-hidden h-52">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-gold-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {product.price}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between h-[180px]">
        <div>
          <h3 className={`font-semibold text-base mb-1.5 leading-snug truncate ${darkMode ? 'text-white' : 'text-navy-600'}`}>
            {product.name}
          </h3>
          <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {product.desc}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
            added
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-navy-600 hover:bg-navy-700 text-white shadow-sm hover:shadow-md'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {added ? translationsCart.added : `${translationsCart.add}${quantity > 0 ? ` (${quantity})` : ''}`}
        </button>
      </div>
    </div>
  );
}

export default function Store({
  lang,
  darkMode,
  setPage,
  cart = [],
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
}) {
  const [cat, setCat] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const c = CONTENT[lang];
  const all = PRODUCTS[lang];
  const tCart = translations[lang].cart;
  const isRTL = lang === 'ar';

  const filtered = cat === 'all' ? all : all.filter(p => p.cat === cat);

  const cartItems = cart.map(item => {
    const p = all.find(x => x.id === item.id);
    return p ? { ...p, quantity: item.quantity } : null;
  }).filter(Boolean);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedTotal = cartItems.reduce((sum, item) => sum + (item.priceNum || 0) * item.quantity, 0);
  const hasOnDemand = cartItems.some(item => item.priceNum === 0);

  const CATS = [
    { key: 'all',      label: c.all },
    { key: 'bureau',   label: c.bureau },
    { key: 'papeterie',label: c.papeterie },
    { key: 'livres',   label: c.livres },
  ];

  const handleWhatsAppCheckout = () => {
    let message = `${tCart.orderFormat}\n\n`;
    cartItems.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    message += `\n${tCart.orderTotal} : ${estimatedTotal} DH`;
    if (hasOnDemand) {
      message += ` (${tCart.exclDemand})`;
    }
    const whatsappUrl = `https://wa.me/212699165490?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <button
          onClick={() => setPage('home')}
          className={`flex items-center gap-2 mb-8 text-sm font-medium transition-colors hover:text-gold-500 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          } ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          {c.back}
        </button>

        {/* Header */}
        <div className={`mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <div>
            <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'justify-end' : ''}`}>
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                Boutique
              </span>
              <div className="w-8 h-px bg-gold-500" />
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-navy-600'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}>
              {c.title}
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{c.subtitle}</p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`mt-4 sm:mt-0 flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white transition-all font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ShoppingBag className="w-4 h-4" />
            {tCart.title}
            {totalItems > 0 && (
              <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Category filter tabs */}
        <div className={`flex flex-wrap gap-2 mb-10 ${isRTL ? 'justify-end' : ''}`}>
          {CATS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCat(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                cat === key
                  ? 'bg-navy-600 text-white shadow-sm'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-navy-300 hover:text-navy-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              c={c}
              darkMode={darkMode}
              addToCart={addToCart}
              cartItem={cart.find(item => item.id === product.id)}
              translationsCart={tCart}
            />
          ))}
        </div>

        {/* Contact CTA banner */}
        <div className={`rounded-3xl p-8 sm:p-12 text-center border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <ShoppingBag className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-navy-600'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}>
            {lang === 'ar' ? 'اطلب الآن' : lang === 'fr' ? 'Passer une commande' : 'Place an Order'}
          </h2>
          <p className={`mb-8 max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{c.contact}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/212699165490"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all"
            >
              {/* WhatsApp icon inline */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.522 5.84L.057 23.71a.5.5 0 00.609.61l5.941-1.554A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.63-.49-5.15-1.34l-.36-.21-3.73.977.996-3.643-.232-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:0699165490"
              className="flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-full transition-all"
            >
              <Phone className="w-5 h-5" />
              {c.call}
            </a>
          </div>
        </div>

      </div>

      {/* Floating Cart Sticky Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className={`fixed bottom-6 z-40 p-4 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isRTL ? 'left-6' : 'right-6'
        }`}
        aria-label="Open Cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-gold-500 shadow-sm animate-scale-in">
            {totalItems}
          </span>
        )}
      </button>

      {/* Sliding Cart Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Cart Drawer Panel */}
      <div
        className={`fixed top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out border-gray-100 dark:border-gray-800 ${
          isDrawerOpen
            ? 'translate-x-0'
            : isRTL
              ? '-translate-x-full'
              : 'translate-x-full'
        } ${isRTL ? 'left-0 border-r' : 'right-0 border-l'}`}
      >
        {/* Drawer Header */}
        <div className={`p-6 border-b flex items-center justify-between border-gray-150 dark:border-gray-800 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ShoppingBag className="w-6 h-6 text-gold-500" />
            <h2 className="text-xl font-bold dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              {tCart.title}
            </h2>
            <span className="text-sm px-2 py-0.5 rounded-full bg-navy-50 dark:bg-navy-950/30 text-navy-600 dark:text-navy-400 font-semibold">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Body - Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-75">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-700" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">{tCart.empty}</p>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemTotal = item.priceNum ? item.priceNum * item.quantity : null;
              return (
                <div
                  key={item.id}
                  className={`flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 relative ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
                  />
                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-sm truncate dark:text-white text-left">{item.name}</h4>
                      <p className="text-xs text-gold-500 font-medium mt-0.5 text-left">{item.price}</p>
                    </div>
                    {/* Quantity Selector & Price */}
                    <div className={`flex items-center justify-between mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-navy-600 dark:text-navy-400">
                        {itemTotal !== null ? `${itemTotal} DH` : ''}
                      </span>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={`absolute top-3 p-1 text-gray-400 hover:text-red-500 transition-colors ${
                      isRTL ? 'left-3' : 'right-3'
                    }`}
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-150 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
            <div className={`flex items-baseline justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{tCart.total}</p>
                {hasOnDemand && (
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">({tCart.exclDemand})</p>
                )}
              </div>
              <p className="text-2xl font-bold text-navy-600 dark:text-gold-400">
                {estimatedTotal} DH
              </p>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.522 5.84L.057 23.71a.5.5 0 00.609.61l5.941-1.554A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.63-.49-5.15-1.34l-.36-.21-3.73.977.996-3.643-.232-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {tCart.checkout}
            </button>

            <button
              onClick={clearCart}
              className="w-full py-2 text-center text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
            >
              {tCart.clear}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
