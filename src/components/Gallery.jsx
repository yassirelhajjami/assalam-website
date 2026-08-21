import { useState } from 'react';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import ad3  from '../images/ourads/ad3.jpeg';
import ad4  from '../images/ourads/ad4.jpeg';
import ad8  from '../images/ourads/ad8.jpeg';
import ad9  from '../images/ourads/ad9.jpeg';
import ad10 from '../images/ourads/ad10.jpeg';
import ad11 from '../images/ourads/ad11.jpeg';

const PROMO_BANNERS = [
  { img: ad3,  label: { ar: 'أدوات مدرسية',    fr: 'Fournitures Scolaires', en: 'School Supplies' },   cta: { ar: 'تسوق الآن', fr: 'Voir plus', en: 'Shop now' } },
  { img: ad4,  label: { ar: 'أثاث مكتبي',      fr: 'Mobilier de Bureau',   en: 'Office Furniture' },   cta: { ar: 'تسوق الآن', fr: 'Voir plus', en: 'Shop now' } },
  { img: ad8,  label: { ar: 'خدمات الطباعة',   fr: 'Services Impression',  en: 'Printing Services' },  cta: { ar: 'اعرف أكثر', fr: 'En savoir +', en: 'Learn more' } },
];

const MINI_ADS = [ad9, ad10, ad11];

export default function Gallery({ lang, setPage, translations: propTranslations }) {
  const [previewIdx, setPreviewIdx] = useState(null);

  const headings = {
    ar: 'معرض أعمالنا وعروضنا',
    fr: 'Notre Galerie & Promotions',
    en: 'Our Gallery & Offers',
  };

  const activePromoBanners = PROMO_BANNERS.map((banner, idx) => {
    const key = `promo${idx + 1}`;
    const local = propTranslations?.[lang]?.gallery?.[key] || {};
    return {
      img: local.img || banner.img,
      label: local.label || banner.label[lang]
    };
  });

  const activeMiniAds = MINI_ADS.map((img, idx) => {
    const key = `mini${idx + 1}`;
    return propTranslations?.[lang]?.gallery?.[key]?.img || img;
  });

  // Combine all images for unified lightbox navigation
  const galleryItems = [
    ...activePromoBanners.map(b => ({ img: b.img, label: b.label, hasStoreLink: true })),
    ...activeMiniAds.map((img, idx) => ({
      img,
      label: lang === 'ar' ? `عرض خاص ${idx + 1}` : lang === 'fr' ? `Offre Spéciale ${idx + 1}` : `Special Offer ${idx + 1}`,
      hasStoreLink: true
    }))
  ];

  const openPreview = (index) => {
    setPreviewIdx(index);
  };

  const closePreview = () => {
    setPreviewIdx(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setPreviewIdx(prev => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setPreviewIdx(prev => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-14 bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          <h2 className="section-title whitespace-nowrap">{headings[lang]}</h2>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Large promo banners - 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {activePromoBanners.map(({ img, label }, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden group cursor-pointer border border-transparent dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openPreview(idx)}
            >
              <img
                src={img}
                alt={label}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/70" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{label}</p>
                </div>
                <div className="w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group-hover:bg-teal-700 group-hover:text-white">
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 text-white" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini ads row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {activeMiniAds.map((img, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden cursor-pointer group border border-transparent dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openPreview(activePromoBanners.length + idx)}
            >
              <img
                src={img}
                alt={`Promotion ${idx + 1}`}
                className="w-full h-32 sm:h-28 md:h-32 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>

      {/* ── Image Lightbox Modal ── */}
      {previewIdx !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in"
          onClick={closePreview}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
            onClick={closePreview}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button 
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110] hidden md:block"
            onClick={showPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110] hidden md:block"
            onClick={showNext}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div 
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img 
              src={galleryItems[previewIdx].img} 
              alt={galleryItems[previewIdx].label} 
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10 animate-scale-up"
            />

            {/* Label and Actions */}
            <div className="w-full max-w-lg text-center px-4">
              <p className="text-white font-bold text-lg mb-3 drop-shadow-md">{galleryItems[previewIdx].label}</p>
              
              {galleryItems[previewIdx].hasStoreLink && (
                <button
                  onClick={() => {
                    closePreview();
                    setPage('store');
                    window.scrollTo(0, 0);
                  }}
                  className="mx-auto flex items-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {lang === 'ar' ? 'تصفح المتجر' : lang === 'fr' ? 'Visiter la boutique' : 'Browse Store'}
                </button>
              )}
            </div>
          </div>

          {/* Swipe helper on mobile */}
          <div className="absolute bottom-6 text-white/50 text-xs md:hidden">
            {lang === 'ar' ? 'انقر خارج الصورة للإغلاق' : lang === 'fr' ? 'Cliquez en dehors pour fermer' : 'Click outside to close'}
          </div>
        </div>
      )}
    </section>
  );
}

