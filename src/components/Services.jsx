import { useState } from 'react';
import { translations } from '../data/translations';
import { libraryServices, adminServices } from '../data/services';

function ServiceCard({ icon: Icon, title, desc, color, darkMode }) {
  return (
    <div className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      darkMode
        ? 'bg-gray-800 border-gray-700 hover:border-gold-500/40'
        : 'bg-white border-gray-100 hover:border-gold-200'
    }`}>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h3 className={`font-semibold text-lg mb-2 leading-snug ${darkMode ? 'text-white' : 'text-navy-600'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
    </div>
  );
}

export default function Services({ lang, darkMode }) {
  const [tab, setTab] = useState('library');
  const t     = translations[lang].services;
  const isRTL = lang === 'ar';

  const items = tab === 'library'
    ? t.library.map((s, i) => ({ ...s, ...libraryServices[i] }))
    : t.admin.map((s, i)   => ({ ...s, ...adminServices[i] }));

  return (
    <section id="services" className={`py-24 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`mb-12 ${isRTL ? 'text-right' : 'text-center'}`}>
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
            <div className="w-8 h-px bg-gold-500" />
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Services</span>
            <div className="w-8 h-px bg-gold-500" />
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-navy-600'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}>
            {t.title}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.subtitle}</p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className={`flex p-1 rounded-full border gap-0.5 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
            <button
              onClick={() => setTab('library')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === 'library' ? 'bg-navy-600 text-white shadow-sm' : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-navy-600'
              }`}
            >{t.libraryTitle}</button>
            <button
              onClick={() => setTab('admin')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === 'admin' ? 'bg-gold-500 text-white shadow-sm' : darkMode ? 'text-gray-300 hover:text-gold-400' : 'text-gray-600 hover:text-gold-500'
              }`}
            >{t.adminTitle}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ServiceCard key={i} icon={item.icon} title={item.title} desc={item.desc} color={item.color} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
