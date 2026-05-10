import { Phone, MapPin, Clock, Instagram, Heart, ArrowUp } from 'lucide-react';
import { translations } from '../data/translations';
import logoImg from '../../pic1.png';

const NAV_LINKS = [
  { key: 'home',     id: 'hero' },
  { key: 'services', id: 'services' },
  { key: 'about',    id: 'about' },
  { key: 'gallery',  id: 'gallery' },
  { key: 'contact',  id: 'contact' },
];

export default function Footer({ lang, scrollTo, setPage }) {
  const t     = translations[lang];
  const isRTL = lang === 'ar';

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Main grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 ${isRTL ? 'text-right' : ''}`}>

          {/* Brand column */}
          <div>
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <img src={logoImg} alt="Assalam" className="h-12 w-auto object-contain" />
              <div>
                <p className="font-bold text-lg leading-tight">
                  {lang === 'ar' ? 'مكتبة السلام' : 'Librairie Assalam'}
                </p>
                <p className="text-gold-400 text-sm">Tanger, Maroc</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{t.footer.tagline}</p>
            {/* Star rating */}
            <div className={`flex items-center gap-2 ${isRTL ? 'justify-end' : ''}`}>
              {[1,2,3,4,5].map(i => (
                <span key={i} className={`text-lg ${i <= 4 ? 'text-gold-400' : 'text-gold-700'}`}>★</span>
              ))}
              <span className="text-gray-500 text-sm ml-1">4.7 / 5</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-5 text-sm uppercase tracking-widest">{t.footer.links}</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ key, id }) => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {t.nav[key]}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setPage('store')}
                  className="text-gold-500 hover:text-gold-300 transition-colors text-sm font-medium"
                >
                  {t.nav.store}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-5 text-sm uppercase tracking-widest">{t.footer.info}</h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{t.contact.address}</span>
              </li>
              <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:0699165490" className="text-gray-400 hover:text-gold-400 text-sm transition-colors" dir="ltr">
                  {t.contact.phone}
                </a>
              </li>
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{t.contact.hours1} · {t.contact.hours2}</span>
              </li>
              <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Instagram className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="text-gray-400 text-sm">@assalam.services</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">{t.footer.rights}</p>
          <span className="flex items-center gap-1.5 text-gray-500 text-sm">
            Made with <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500" /> for Librairie Assalam
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 bg-navy-700 hover:bg-navy-600 text-gray-300 rounded-full text-sm transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            {lang === 'ar' ? 'الأعلى' : lang === 'fr' ? 'Haut' : 'Top'}
          </button>
        </div>
      </div>
    </footer>
  );
}
