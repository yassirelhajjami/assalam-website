import { useState } from 'react';
import { translations } from '../data/translations';
import { libraryServices, adminServices } from '../data/services';

function ServiceCard({ icon: Icon, title, desc, color }) {
  return (
    <div
      className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-teal-200 transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="w-6 h-6" style={{ color }} strokeWidth={1.8} />
      </div>
      <h3 className="font-bold text-base text-gray-800 mb-1.5 leading-snug">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Services({ lang }) {
  const [tab, setTab] = useState('library');
  const t = translations[lang].services;

  const items = tab === 'library'
    ? t.library.map((s, i) => ({ ...s, ...libraryServices[i] }))
    : t.admin.map((s, i) => ({ ...s, ...adminServices[i] }));

  const tabLabels = {
    ar: { library: 'خدمات المكتبة', admin: 'الخدمات الإدارية' },
    fr: { library: 'Services Librairie', admin: 'Services Administratifs' },
    en: { library: 'Library Services', admin: 'Admin Services' },
  }[lang];

  return (
    <section id="services" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-100" />
          <h2 className="section-title whitespace-nowrap">{t.title}</h2>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {['library', 'admin'].map(key => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                tab === key
                  ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-700'
              }`}
            >
              {tabLabels[key]}
            </button>
          ))}
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <ServiceCard
              key={idx}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              color={item.color}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
