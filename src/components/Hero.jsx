import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Truck, FileCheck, Star, MessageCircle } from 'lucide-react';

// Import ourads promotional images
import ad1 from '../images/ourads/ad1.jpeg';
import ad2 from '../images/ourads/ad2.jpeg';
import ad5 from '../images/ourads/ad5.jpeg';
import ad6 from '../images/ourads/ad6.jpeg';
import ad7 from '../images/ourads/ad7.jpeg';
import ad8 from '../images/ourads/ad8.jpeg';

const BANNERS = [ad1, ad2, ad5, ad6, ad7, ad8];

const getInfoCards = (lang) => ({
  ar: [
    {
      icon: Truck,
      title: 'توصيل سريع داخل طنجة',
      desc: 'نوصل طلبك في نفس اليوم',
      color: '#1d7063',
      bg: '#e6f4f1',
    },
    {
      icon: FileCheck,
      title: 'خدمات طباعة احترافية',
      desc: 'طباعة رقمية وأوفست بجودة عالية',
      color: '#C8A84B',
      bg: '#fef9ec',
    },
    {
      icon: MessageCircle,
      title: 'اطلب عبر واتساب',
      desc: 'تواصل معنا الآن وسنرد فورياً',
      color: '#25D366',
      bg: '#f0faf3',
    },
    {
      icon: Star,
      title: 'منتجات معتمدة وأصلية',
      desc: 'أكثر من 500 منتج في متجرنا',
      color: '#b04030',
      bg: '#fef0ee',
    },
  ],
  fr: [
    {
      icon: Truck,
      title: 'Livraison rapide à Tanger',
      desc: 'Votre commande livrée le jour même',
      color: '#1d7063',
      bg: '#e6f4f1',
    },
    {
      icon: FileCheck,
      title: 'Impression professionnelle',
      desc: 'Numérique & offset haute qualité',
      color: '#C8A84B',
      bg: '#fef9ec',
    },
    {
      icon: MessageCircle,
      title: 'Commandez via WhatsApp',
      desc: 'Contactez-nous maintenant',
      color: '#25D366',
      bg: '#f0faf3',
    },
    {
      icon: Star,
      title: 'Produits authentiques',
      desc: 'Plus de 500 articles disponibles',
      color: '#b04030',
      bg: '#fef0ee',
    },
  ],
  en: [
    {
      icon: Truck,
      title: 'Fast Delivery in Tangier',
      desc: 'Same-day delivery available',
      color: '#1d7063',
      bg: '#e6f4f1',
    },
    {
      icon: FileCheck,
      title: 'Professional Printing',
      desc: 'Digital & offset high quality',
      color: '#C8A84B',
      bg: '#fef9ec',
    },
    {
      icon: MessageCircle,
      title: 'Order via WhatsApp',
      desc: 'Contact us anytime',
      color: '#25D366',
      bg: '#f0faf3',
    },
    {
      icon: Star,
      title: 'Authentic Products',
      desc: 'Over 500 items in our store',
      color: '#b04030',
      bg: '#fef0ee',
    },
  ],
})[lang] || [];

export default function Hero({ lang, scrollTo, setPage, banners = [], translations: propTranslations }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const infoCards = getInfoCards(lang);

  const activeBanners = banners && banners.length > 0
    ? banners
    : BANNERS.map(url => ({ image_url: url }));

  const headings = {
    ar: { main: 'وجهتك الأولى للمستلزمات المكتبية والمدرسية', sub: 'مكتبة وراقة السلام — طنجة' },
    fr: { main: 'Votre destination pour la papeterie et fournitures', sub: 'Librairie Assalam — Tanger' },
    en: { main: 'Your destination for stationery and office supplies', sub: 'Assalam Library — Tangier' },
  };

  const heroTitle = propTranslations?.[lang]?.hero?.title || headings[lang].main;
  const heroSubtitle = propTranslations?.[lang]?.hero?.subtitle || headings[lang].sub;
  const mainTitle = activeBanners[current]?.[`title_${lang}`] || heroTitle;
  const subTitle = activeBanners[current]?.[`subtitle_${lang}`] || heroSubtitle;

  const goTo = (idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsTransitioning(false);
    }, 200);
  };

  const prev = () => goTo((current - 1 + activeBanners.length) % activeBanners.length);
  const next = () => goTo((current + 1) % activeBanners.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [current, activeBanners.length]);

  return (
    <section id="hero" className="pt-[90px] md:pt-[100px]">

      {/* ── Main Banner Carousel ── */}
      <div className="relative w-full bg-gray-100 overflow-hidden" style={{ maxHeight: '480px' }}>
        {/* Slides */}
        <div
          className="w-full transition-opacity duration-300"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <img
            src={activeBanners[current]?.image_url}
            alt={`Banner ${current + 1}`}
            className="w-full object-cover object-center"
            style={{ maxHeight: '480px', width: '100%' }}
          />
        </div>

        {/* Gradient overlay at bottom for text */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)' }}
        />

        {/* Tagline overlay */}
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 pointer-events-none hidden sm:flex">
          <p className="text-white text-xl md:text-3xl font-bold text-center drop-shadow-lg px-4">
            {mainTitle}
          </p>
          <p className="text-white/80 text-sm font-medium">{subTitle}</p>
        </div>

        {/* Prev/Next arrows */}
        <button
          onClick={prev}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors hidden md:flex"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={next}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/35 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          {activeBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all ${
                idx === current
                  ? 'w-4.5 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Info Feature Cards ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
          {infoCards.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 transition-colors duration-205"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon className="w-5 h-5" style={{ color }} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">{title}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
