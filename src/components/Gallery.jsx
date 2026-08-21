import { ArrowLeft, ArrowRight } from 'lucide-react';
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

export default function Gallery({ lang, setPage }) {
  const headings = {
    ar: 'معرض أعمالنا وعروضنا',
    fr: 'Notre Galerie & Promotions',
    en: 'Our Gallery & Offers',
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
          {PROMO_BANNERS.map(({ img, label, cta }, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden group cursor-pointer border border-transparent dark:border-gray-800"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              onClick={() => setPage('store')}
            >
              <img
                src={img}
                alt={label[lang]}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/70" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{label[lang]}</p>
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
          {MINI_ADS.map((img, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden cursor-pointer group border border-transparent dark:border-gray-800"
              style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
              onClick={() => setPage('store')}
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
    </section>
  );
}
