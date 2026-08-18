import { useState } from 'react';
import {
  Phone, ShoppingBag, Trash2, Plus, Minus, X,
  Heart, Eye, Star, Filter, ChevronDown, ArrowRight, ShoppingCart
} from 'lucide-react';
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

// Stars rating display
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className="w-3 h-3"
          fill={i <= rating ? '#f59e0b' : 'none'}
          stroke={i <= rating ? '#f59e0b' : '#d1d5db'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

const PRODUCTS_DATA = {
  fr: [
    { id: 1,  cat: 'bureau',    img: deskImg,    name: 'Bureau de Travail',     desc: 'Bureau ergonomique moderne, idéal pour le home office.',   price: 'À partir de 450 DH', priceNum: 450, rating: 5 },
    { id: 2,  cat: 'bureau',    img: chairImg,   name: 'Chaise de Bureau',      desc: 'Chaise confortable avec accoudoirs réglables.',             price: 'À partir de 350 DH', priceNum: 350, rating: 4 },
    { id: 3,  cat: 'bureau',    img: cabinetImg, name: 'Armoire de Classement', desc: 'Armoire robuste pour rangement et archivage.',              price: 'À partir de 600 DH', priceNum: 600, rating: 5 },
    { id: 4,  cat: 'bureau',    img: lampImg,    name: 'Lampe de Bureau LED',   desc: 'Éclairage LED réglable, protège vos yeux.',                price: 'À partir de 80 DH',  priceNum: 80,  rating: 4 },
    { id: 5,  cat: 'bureau',    img: shelfImg,   name: 'Étagère à Livres',      desc: 'Étagère solide en bois, pour vos livres et dossiers.',      price: 'À partir de 200 DH', priceNum: 200, rating: 5 },
    { id: 6,  cat: 'bureau',    img: standImg,   name: 'Support Multifonction', desc: 'Support pour écran, livres ou documents.',                  price: 'À partir de 120 DH', priceNum: 120, rating: 4 },
    { id: 7,  cat: 'papeterie', img: pensImg,    name: 'Stylos & Crayons',      desc: 'Large gamme de stylos et crayons de toutes marques.',       price: 'À partir de 3 DH',   priceNum: 3,   rating: 5 },
    { id: 8,  cat: 'papeterie', img: paperImg,   name: 'Papier & Cahiers',      desc: 'Rames A4, cahiers grands et petits formats.',               price: 'À partir de 15 DH',  priceNum: 15,  rating: 4 },
    { id: 9,  cat: 'papeterie', img: folderImg,  name: 'Classeurs & Dossiers',  desc: 'Classeurs rigides, intercalaires, pochettes plastiques.',   price: 'À partir de 10 DH',  priceNum: 10,  rating: 4 },
    { id: 10, cat: 'livres',    img: shelfImg,   name: 'Livres Scolaires',      desc: 'Manuels officiels pour tous niveaux. Toutes matières.',     price: 'Sur demande',        priceNum: 0,   rating: 5 },
    { id: 11, cat: 'livres',    img: folderImg,  name: 'Fournitures Scolaires', desc: 'Kits complets pour la rentrée.',                            price: 'Sur demande',        priceNum: 0,   rating: 5 },
    { id: 12, cat: 'livres',    img: standImg,   name: 'Livres Parascolaires',  desc: 'Cahiers d\'exercices, guides pédagogiques, dictionnaires.', price: 'Sur demande',        priceNum: 0,   rating: 4 },
  ],
  ar: [
    { id: 1,  cat: 'bureau',    img: deskImg,    name: 'طاولة مكتب',            desc: 'مكتب عصري مريح، مثالي للعمل من المنزل.',                   price: 'ابتداءً من 450 درهم', priceNum: 450, rating: 5 },
    { id: 2,  cat: 'bureau',    img: chairImg,   name: 'كرسي مكتبي',            desc: 'كرسي مريح مع مساند يد قابلة للتعديل.',                     price: 'ابتداءً من 350 درهم', priceNum: 350, rating: 4 },
    { id: 3,  cat: 'bureau',    img: cabinetImg, name: 'خزانة تصنيف',           desc: 'خزانة متينة لتخزين وأرشفة وثائقك الهامة.',                 price: 'ابتداءً من 600 درهم', priceNum: 600, rating: 5 },
    { id: 4,  cat: 'bureau',    img: lampImg,    name: 'مصباح مكتبي LED',       desc: 'إضاءة LED قابلة للتعديل، تحمي عينيك.',                    price: 'ابتداءً من 80 درهم',  priceNum: 80,  rating: 4 },
    { id: 5,  cat: 'bureau',    img: shelfImg,   name: 'رف كتب',                desc: 'رف متين من الخشب، مثالي لتنظيم كتبك.',                     price: 'ابتداءً من 200 درهم', priceNum: 200, rating: 5 },
    { id: 6,  cat: 'bureau',    img: standImg,   name: 'حامل متعدد الوظائف',    desc: 'حامل للشاشة أو الكتب أو الوثائق.',                        price: 'ابتداءً من 120 درهم', priceNum: 120, rating: 4 },
    { id: 7,  cat: 'papeterie', img: pensImg,    name: 'أقلام وأدوات الكتابة',  desc: 'مجموعة واسعة من الأقلام والرصاص من جميع العلامات.',       price: 'ابتداءً من 3 دراهم',  priceNum: 3,   rating: 5 },
    { id: 8,  cat: 'papeterie', img: paperImg,   name: 'ورق وكراسات',           desc: 'رزم ورق A4، كراسات كبيرة وصغيرة.',                        price: 'ابتداءً من 15 درهم',  priceNum: 15,  rating: 4 },
    { id: 9,  cat: 'papeterie', img: folderImg,  name: 'ملفات وحافظات',         desc: 'ملفات صلبة، فواصل، أكياس بلاستيكية.',                     price: 'ابتداءً من 10 دراهم', priceNum: 10,  rating: 4 },
    { id: 10, cat: 'livres',    img: shelfImg,   name: 'الكتب المدرسية',        desc: 'الكتب الرسمية لجميع المستويات. جميع المواد.',              price: 'عند الطلب',           priceNum: 0,   rating: 5 },
    { id: 11, cat: 'livres',    img: folderImg,  name: 'اللوازم المدرسية',      desc: 'مجموعات كاملة للدخول المدرسي.',                            price: 'عند الطلب',           priceNum: 0,   rating: 5 },
    { id: 12, cat: 'livres',    img: standImg,   name: 'كتب تكميلية',           desc: 'كراسات تمارين، مراجع تربوية، قواميس.',                    price: 'عند الطلب',           priceNum: 0,   rating: 4 },
  ],
  en: [
    { id: 1,  cat: 'bureau',    img: deskImg,    name: 'Work Desk',             desc: 'Modern ergonomic desk, ideal for home office.',             price: 'From 450 MAD', priceNum: 450, rating: 5 },
    { id: 2,  cat: 'bureau',    img: chairImg,   name: 'Office Chair',          desc: 'Comfortable chair with adjustable armrests.',               price: 'From 350 MAD', priceNum: 350, rating: 4 },
    { id: 3,  cat: 'bureau',    img: cabinetImg, name: 'Filing Cabinet',        desc: 'Sturdy cabinet for storing and archiving documents.',        price: 'From 600 MAD', priceNum: 600, rating: 5 },
    { id: 4,  cat: 'bureau',    img: lampImg,    name: 'LED Desk Lamp',         desc: 'Adjustable LED lighting that protects your eyes.',          price: 'From 80 MAD',  priceNum: 80,  rating: 4 },
    { id: 5,  cat: 'bureau',    img: shelfImg,   name: 'Bookshelf',             desc: 'Solid wood shelf, perfect for books and folders.',          price: 'From 200 MAD', priceNum: 200, rating: 5 },
    { id: 6,  cat: 'bureau',    img: standImg,   name: 'Multifunction Stand',   desc: 'Stand for monitor, books, or documents.',                   price: 'From 120 MAD', priceNum: 120, rating: 4 },
    { id: 7,  cat: 'papeterie', img: pensImg,    name: 'Pens & Pencils',        desc: 'Wide range of pens and pencils of all brands.',             price: 'From 3 MAD',   priceNum: 3,   rating: 5 },
    { id: 8,  cat: 'papeterie', img: paperImg,   name: 'Paper & Notebooks',     desc: 'A4 reams, large and small format notebooks.',               price: 'From 15 MAD',  priceNum: 15,  rating: 4 },
    { id: 9,  cat: 'papeterie', img: folderImg,  name: 'Binders & Folders',     desc: 'Hard binders, dividers, plastic sleeves.',                  price: 'From 10 MAD',  priceNum: 10,  rating: 4 },
    { id: 10, cat: 'livres',    img: shelfImg,   name: 'School Textbooks',      desc: 'Official manuals for all levels. All subjects.',            price: 'On request',   priceNum: 0,   rating: 5 },
    { id: 11, cat: 'livres',    img: folderImg,  name: 'School Supplies',       desc: 'Complete back-to-school kits.',                             price: 'On request',   priceNum: 0,   rating: 5 },
    { id: 12, cat: 'livres',    img: standImg,   name: 'Study Books',           desc: 'Exercise books, educational guides, dictionaries.',         price: 'On request',   priceNum: 0,   rating: 4 },
  ],
};

const CONTENT = {
  ar: { all: 'الكل', bureau: 'أثاث مكتبي', papeterie: 'قرطاسية', livres: 'كتب ومدرسي', title: 'متجرنا', subtitle: 'أثاث مكتبي، لوازم مدرسية وكتب', back: 'الرئيسية', addedLabel: 'أضيف ✓', contact: 'للطلب أو الاستفسار، تواصل معنا مباشرة.', call: 'اتصل بنا' },
  fr: { all: 'Tout', bureau: 'Mobilier',   papeterie: 'Papeterie', livres: 'Livres',      title: 'Notre Boutique', subtitle: 'Mobilier, fournitures & livres', back: 'Accueil', addedLabel: 'Ajouté ✓', contact: 'Pour commander, contactez-nous directement.', call: 'Appeler' },
  en: { all: 'All',  bureau: 'Furniture',  papeterie: 'Stationery',livres: 'Books',       title: 'Our Store',      subtitle: 'Furniture, stationery & books', back: 'Home',    addedLabel: 'Added ✓',  contact: 'To order, contact us directly.', call: 'Call us' },
};

/* ── Product Card ── */
function ProductCard({ product, lang, addToCart, cartItem }) {
  const [wishlist, setWishlist] = useState(false);
  const [flashAdded, setFlashAdded] = useState(false);
  const quantity = cartItem ? cartItem.quantity : 0;
  const c = CONTENT[lang];

  const handleAdd = () => {
    addToCart(product.id);
    setFlashAdded(true);
    setTimeout(() => setFlashAdded(false), 1300);
  };

  return (
    <div className="product-card group">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '75%' }}>
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover action buttons (right column) */}
        <div className="card-actions">
          <button
            onClick={() => setWishlist(w => !w)}
            className="action-btn"
            title="Add to wishlist"
          >
            <Heart
              className="w-4 h-4 transition-colors"
              fill={wishlist ? '#e74c3c' : 'none'}
              stroke={wishlist ? '#e74c3c' : 'currentColor'}
            />
          </button>
          <button className="action-btn" title="Quick view">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Price badge - top left (RTL: left visually) */}
        {product.priceNum > 0 && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 bg-teal-700 text-white text-xs font-bold rounded-full">
              {product.price}
            </span>
          </div>
        )}
        {product.priceNum === 0 && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 bg-gold-500 text-white text-xs font-bold rounded-full">
              {lang === 'ar' ? 'عند الطلب' : lang === 'fr' ? 'Sur demande' : 'On request'}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col gap-2">
        {/* Stars */}
        <Stars rating={product.rating} />

        {/* Name */}
        <h3 className="font-bold text-sm text-gray-800 leading-snug truncate">
          {product.name}
        </h3>

        {/* Price / "on demand" */}
        <div className="flex items-center justify-between">
          <span className="text-teal-700 font-bold text-sm">{product.price}</span>
          {quantity > 0 && (
            <span className="text-[11px] text-gray-400 font-medium">
              {lang === 'ar' ? `في السلة: ${quantity}` : lang === 'fr' ? `Panier: ${quantity}` : `In cart: ${quantity}`}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center gap-2 w-full py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
            flashAdded
              ? 'bg-green-500 text-white'
              : 'bg-teal-700 hover:bg-teal-800 text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {flashAdded ? c.addedLabel : (lang === 'ar' ? 'أضف إلى السلة' : lang === 'fr' ? 'Ajouter au panier' : 'Add to cart')}
        </button>
      </div>
    </div>
  );
}

/* ── Main Store Component ── */
export default function Store({
  lang,
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
  const all = PRODUCTS_DATA[lang];
  const tCart = translations[lang].cart;

  const filtered = cat === 'all' ? all : all.filter(p => p.cat === cat);

  const cartItems = cart.map(item => {
    const p = all.find(x => x.id === item.id);
    return p ? { ...p, quantity: item.quantity } : null;
  }).filter(Boolean);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const estimatedTotal = cartItems.reduce((sum, i) => sum + (i.priceNum || 0) * i.quantity, 0);
  const hasOnDemand = cartItems.some(i => i.priceNum === 0);

  const CATS = [
    { key: 'all',       label: c.all },
    { key: 'bureau',    label: c.bureau },
    { key: 'papeterie', label: c.papeterie },
    { key: 'livres',    label: c.livres },
  ];

  const handleWhatsAppCheckout = () => {
    let msg = `${tCart.orderFormat}\n\n`;
    cartItems.forEach(item => {
      msg += `- ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    msg += `\n${tCart.orderTotal}: ${estimatedTotal} DH`;
    if (hasOnDemand) msg += ` (${tCart.exclDemand})`;
    window.open(`https://wa.me/212699165490?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-gray-50" dir="rtl">

      {/* ── Breadcrumb / Page header ── */}
      <div className="bg-white border-b border-gray-100 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => setPage('home')} className="hover:text-teal-700 transition-colors font-medium">
            {c.back}
          </button>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{c.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">

        {/* ── Page Title + Cart Button ── */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{c.title}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{c.subtitle}</p>
          </div>
          <button
            id="open-cart-drawer-btn"
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            {tCart.title}
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* ── Filter tabs + count ── */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {CATS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCat(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                cat === key
                  ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-700'
              }`}
            >
              {label}
              {key === 'all' && (
                <span className="mr-1.5 text-xs opacity-70">({all.length})</span>
              )}
            </button>
          ))}
          <span className="text-sm text-gray-400 mr-auto">
            {lang === 'ar' ? `إجمالي ${filtered.length} منتج` : lang === 'fr' ? `${filtered.length} produits` : `${filtered.length} products`}
          </span>
        </div>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-12">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              addToCart={addToCart}
              cartItem={cart.find(i => i.id === product.id)}
            />
          ))}
        </div>

        {/* ── Contact CTA ── */}
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-7 h-7 text-teal-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {lang === 'ar' ? 'اطلب الآن' : lang === 'fr' ? 'Passer une commande' : 'Place an Order'}
          </h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">{c.contact}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/212699165490"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3 bg-[#25D366] hover:bg-[#20b85a] text-white font-bold rounded-xl transition-all text-sm shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.522 5.84L.057 23.71a.5.5 0 00.609.61l5.941-1.554A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.63-.49-5.15-1.34l-.36-.21-3.73.977.996-3.643-.232-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:0699165490"
              className="flex items-center gap-2 px-7 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition-all text-sm shadow-sm"
            >
              <Phone className="w-4 h-4" />
              {c.call}
            </a>
          </div>
        </div>

      </div>

      {/* ── Floating Cart Button ── */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-2xl transition-all duration-300 hover:scale-105"
        aria-label="Open Cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
            {totalItems}
          </span>
        )}
      </button>

      {/* ── Cart Drawer Backdrop ── */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* ── Cart Drawer Panel ── */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-700" />
            <h2 className="text-lg font-bold text-gray-800">{tCart.title}</h2>
            <span className="px-2 py-0.5 text-xs bg-teal-50 text-teal-700 font-bold rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-gray-400 py-20">
              <ShoppingBag className="w-14 h-14 text-gray-200" />
              <p className="font-medium">{tCart.empty}</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-white flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-800 truncate mb-0.5">{item.name}</h4>
                  <p className="text-xs text-teal-700 font-semibold mb-2">{item.price}</p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-50 text-gray-500 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-sm font-bold text-gray-800">{item.quantity}</span>
                      <button onClick={() => addToCart(item.id)} className="px-2 py-1 hover:bg-gray-50 text-gray-500 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {item.priceNum > 0 && (
                      <span className="text-sm font-bold text-gray-700">
                        {item.priceNum * item.quantity} DH
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2.5 left-2.5 p-1 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">{tCart.total}</span>
              <span className="text-xl font-bold text-teal-700">{estimatedTotal} DH{hasOnDemand && '+'}</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20b85a] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.522 5.84L.057 23.71a.5.5 0 00.609.61l5.941-1.554A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.63-.49-5.15-1.34l-.36-.21-3.73.977.996-3.643-.232-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {tCart.checkout}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
            >
              {tCart.clear}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
