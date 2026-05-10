import { translations } from '../data/translations';
import ad1  from '../images/ourads/ad1.jpeg';
import ad2  from '../images/ourads/ad2.jpeg';
import ad3  from '../images/ourads/ad3.jpeg';
import ad4  from '../images/ourads/ad4.jpeg';
import ad5  from '../images/ourads/ad5.jpeg';
import ad6  from '../images/ourads/ad6.jpeg';
import ad7  from '../images/ourads/ad7.jpeg';
import ad8  from '../images/ourads/ad8.jpeg';
import ad9  from '../images/ourads/ad9.jpeg';

const IMAGES = [ad4, ad8, ad9, ad1, ad2, ad7, ad3, ad5, ad6];

export default function Gallery({ lang, darkMode }) {
  const t     = translations[lang].gallery;
  const isRTL = lang === 'ar';

  return (
    <section id="gallery" className={`py-24 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`mb-12 ${isRTL ? 'text-right' : 'text-center'}`}>
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
            <div className="w-8 h-px bg-gold-500" />
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">
              {lang === 'ar' ? 'عروضنا' : 'Nos Offres'}
            </span>
            <div className="w-8 h-px bg-gold-500" />
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-navy-600'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}>
            {t.title}
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                i === 0 ? 'row-span-2 col-span-1' : ''
              } ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              <img
                src={src}
                alt={`Assalam Services — ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: i === 0 ? '480px' : '220px', maxHeight: i === 0 ? '480px' : '220px' }}
              />
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-all duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gold-500/0 group-hover:bg-gold-500 flex items-center justify-center transition-all duration-300 scale-0 group-hover:scale-100">
                  <span className="text-white text-lg font-bold">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/assalam.services"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-3 border-2 rounded-full font-semibold transition-all duration-300 ${
              darkMode
                ? 'border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-white'
                : 'border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'شاهد المزيد على إنستغرام' : lang === 'fr' ? 'Voir plus sur Instagram' : 'See more on Instagram'}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
