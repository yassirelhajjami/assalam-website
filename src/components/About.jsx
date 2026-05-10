import { CheckCircle } from 'lucide-react';
import { translations } from '../data/translations';
import pic2 from '../../pic2.jpeg';

export default function About({ lang, darkMode }) {
  const t     = translations[lang].about;
  const isRTL = lang === 'ar';

  return (
    <section id="about" className={`py-24 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className={`relative ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className={`absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl -z-10 ${darkMode ? 'bg-gray-700' : 'bg-gold-50'}`} />
            <div className={`absolute -top-6 -left-6 w-32 h-32 rounded-3xl -z-10 ${darkMode ? 'bg-gray-700' : 'bg-navy-50'}`} />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={pic2} alt="Librairie Assalam" className="w-full h-96 lg:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[t.stat1, t.stat2, t.stat3].map((s, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold text-gold-400" style={{ fontFamily: 'Playfair Display, serif' }}>{s.number}</div>
                      <div className="text-xs text-white/75 mt-1 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`${isRTL ? 'text-right lg:order-1' : 'lg:order-2'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'justify-end' : ''}`}>
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">{t.title}</span>
            </div>
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 leading-tight ${darkMode ? 'text-white' : 'text-navy-600'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}>
              {t.subtitle}
            </h2>
            <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.description}</p>
            <p className={`leading-relaxed mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.description2}</p>

            <ul className="space-y-4">
              {[t.feature1, t.feature2, t.feature3, t.feature4].map((f, i) => (
                <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
