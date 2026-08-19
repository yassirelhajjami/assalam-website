import { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ad3 from '../images/ourads/ad3.jpeg';

import pensImg   from '../images/products/pens.jpg';
import paperImg  from '../images/products/paper.jpg';
import folderImg from '../images/products/folder.jpg';
import shelfImg  from '../images/products/shelf.jpg';
import standImg  from '../images/products/stand.jpg';

const SCHOOL_PRODUCTS = {
  ar: [
    { id: 7,  img: pensImg,    name: 'قلم قابل للمسح SBC الأصلي',  price: '3.45 درهم',  priceNum: 3.45, rating: 5 },
    { id: 8,  img: paperImg,   name: 'دفتر جامعة عربي فاخر A4',   price: '17.25 درهم', priceNum: 17.25, rating: 5 },
    { id: 13, img: paperImg,   name: 'دفتر جامعة كرافت A5 - A4',  price: '7.48 درهم',  priceNum: 7.48, rating: 4 },
    { id: 9,  img: folderImg,  name: 'تجليد ذاتي اللصق SBC الأصلي', price: '8.05 درهم',  priceNum: 8.05, rating: 5 },
    { id: 14, img: shelfImg,   name: 'حقيبة مدرسية متكاملة للبنات', price: '149.00 درهم', priceNum: 149.00, rating: 5 },
    { id: 15, img: folderImg,  name: 'حقيبة مدرسية متكاملة للأولاد', price: '149.00 درهم', priceNum: 149.00, rating: 5 },
    { id: 16, img: pensImg,    name: 'ألوان خشبية SBC 24 لون',    price: '24.00 درهم', priceNum: 24.00, rating: 4 },
  ],
  fr: [
    { id: 7,  img: pensImg,    name: 'Stylo effaçable original SBC', price: '3.45 DH',   priceNum: 3.45, rating: 5 },
    { id: 8,  img: paperImg,   name: 'Cahier universitaire A4 luxe',  price: '17.25 DH',  priceNum: 17.25, rating: 5 },
    { id: 13, img: paperImg,   name: 'Cahier Kraft A5 - A4',         price: '7.48 DH',   priceNum: 7.48, rating: 4 },
    { id: 9,  img: folderImg,  name: 'Couvre livre adhésif SBC',     price: '8.05 DH',   priceNum: 8.05, rating: 5 },
    { id: 14, img: shelfImg,   name: 'Sac à dos complet filles',     price: '149.00 DH', priceNum: 149.00, rating: 5 },
    { id: 15, img: folderImg,  name: 'Sac à dos complet garçons',    price: '149.00 DH', priceNum: 149.00, rating: 5 },
    { id: 16, img: pensImg,    name: 'Crayons de couleur SBC 24',    price: '24.00 DH',  priceNum: 24.00, rating: 4 },
  ],
  en: [
    { id: 7,  img: pensImg,    name: 'SBC Original Erasable Pen',    price: '3.45 MAD',   priceNum: 3.45, rating: 5 },
    { id: 8,  img: paperImg,   name: 'Premium College Notebook A4',  price: '17.25 MAD',  priceNum: 17.25, rating: 5 },
    { id: 13, img: paperImg,   name: 'Kraft College Notebook A5/A4', price: '7.48 MAD',   priceNum: 7.48, rating: 4 },
    { id: 9,  img: folderImg,  name: 'SBC Self-Adhesive Book Cover', price: '8.05 MAD',   priceNum: 8.05, rating: 5 },
    { id: 14, img: shelfImg,   name: 'Complete School Bag Set Girl', price: '149.00 MAD', priceNum: 149.00, rating: 5 },
    { id: 15, img: folderImg,  name: 'Complete School Bag Set Boy',  price: '149.00 MAD', priceNum: 149.00, rating: 5 },
    { id: 16, img: pensImg,    name: 'SBC Colored Pencils 24 Pack',  price: '24.00 MAD',  priceNum: 24.00, rating: 4 },
  ]
};

const TEXTS = {
  ar: { title: 'مختارات مدرسية', desc: 'كل ما يحتاجه طفلك لبداية عام دراسي مميز ومليء بالنجاح', cta: 'للمزيد', added: 'تمت الإضافة ✓', add: 'أضف للسلة' },
  fr: { title: 'Sélection Scolaire', desc: 'Tout ce dont votre enfant a besoin pour une rentrée réussie et inspirante', cta: 'Voir plus', added: 'Ajouté ✓', add: 'Ajouter' },
  en: { title: 'School Selection', desc: 'Everything your child needs for a successful and inspiring new school year', cta: 'View more', added: 'Added ✓', add: 'Add to cart' },
};

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

export default function SchoolEntrySection({ lang, onCtaClick, addToCart, cart = [] }) {
  const t = TEXTS[lang] || TEXTS.ar;
  const products = SCHOOL_PRODUCTS[lang] || SCHOOL_PRODUCTS.ar;
  const [wishlist, setWishlist] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (id) => {
    addToCart(id);
    setAddedIds(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [id]: false }));
    }, 1200);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Right Column: Promotional Card Banner */}
          <div 
            className="w-full lg:w-1/4 rounded-2xl overflow-hidden relative flex flex-col justify-end p-6 min-h-[320px] lg:min-h-auto shadow-md group shrink-0"
            style={{
              backgroundImage: `url(${ad3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/60 to-black/30 group-hover:via-teal-950/70 transition-colors duration-300" />
            
            <div className="relative z-10 text-white flex flex-col gap-3">
              <span className="w-12 h-1 bg-gold-500 rounded-full" />
              <h3 className="text-2xl font-bold leading-tight">{t.title}</h3>
              <p className="text-xs text-gray-200 leading-relaxed max-w-[220px]">
                {t.desc}
              </p>
              <button
                onClick={onCtaClick}
                className="mt-2 w-max px-6 py-2 border-2 border-white/80 hover:border-white text-white font-bold rounded-xl text-sm transition-all hover:bg-white/10"
              >
                {t.cta}
              </button>
            </div>
          </div>

          {/* Left Column: Horizontally Scrollable Products List */}
          <div className="w-full lg:w-3/4 overflow-hidden flex flex-col justify-center">
            <div 
              className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1"
              style={{ scrollbarWidth: 'thin' }}
            >
              {products.map((product) => {
                const isAdded = addedIds[product.id];
                const isWishlisted = wishlist[product.id];
                const cartItem = cart.find(item => item.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <div 
                    key={product.id}
                    className="product-card min-w-[200px] max-w-[200px] flex-shrink-0"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden aspect-square">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Hover Action column */}
                      <div className="card-actions">
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="action-btn"
                          title="Wishlist"
                        >
                          <Heart 
                            className="w-4 h-4 transition-colors" 
                            fill={isWishlisted ? '#e74c3c' : 'none'}
                            stroke={isWishlisted ? '#e74c3c' : 'currentColor'}
                          />
                        </button>
                        <button className="action-btn" title="Quick view">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Floating Discount/Price tag */}
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 bg-teal-700 text-white text-[10px] font-bold rounded-full">
                          {product.price}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-3 flex flex-col gap-1.5 justify-between flex-1">
                      <Stars rating={product.rating} />
                      <h4 className="font-bold text-xs text-gray-800 line-clamp-2 leading-snug h-[34px]">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-700">{product.price}</span>
                        {quantity > 0 && (
                          <span className="text-[10px] text-gray-400 font-semibold">
                            {lang === 'ar' ? `بالسلة: ${quantity}` : lang === 'fr' ? `Qté: ${quantity}` : `Cart: ${quantity}`}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleAdd(product.id)}
                        className={`mt-1 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                          isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {isAdded ? t.added : t.add}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
