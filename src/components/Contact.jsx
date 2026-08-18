import { MapPin, Phone, Clock, Instagram, ExternalLink, MessageCircle } from 'lucide-react';
import { translations } from '../data/translations';

export default function Contact({ lang }) {
  const t = translations[lang].contact;

  const cards = [
    {
      icon: MapPin,
      color: '#1d7063',
      bg: '#e6f4f1',
      label: lang === 'ar' ? 'العنوان' : lang === 'fr' ? 'Adresse' : 'Address',
      content: <p className="text-sm text-gray-600 leading-relaxed mt-1">{t.address}</p>,
    },
    {
      icon: Phone,
      color: '#C8A84B',
      bg: '#fef9ec',
      label: lang === 'ar' ? 'الهاتف' : lang === 'fr' ? 'Téléphone' : 'Phone',
      content: (
        <a href="tel:0699165490" className="text-lg font-bold text-gold-600 hover:text-gold-700 transition-colors mt-1 block" dir="ltr">
          {t.phone}
        </a>
      ),
    },
    {
      icon: Clock,
      color: '#1d5048',
      bg: '#f0faf4',
      label: lang === 'ar' ? 'أوقات العمل' : lang === 'fr' ? 'Horaires' : 'Working Hours',
      content: (
        <div className="mt-1">
          <p className="text-sm text-gray-600">{t.hours1}</p>
          <p className="text-sm font-bold text-teal-700 mt-0.5">{t.hours2}</p>
        </div>
      ),
    },
  ];

  return (
    <section id="contact" className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-200" />
          <h2 className="section-title whitespace-nowrap">{t.title}</h2>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <p className="text-center text-gray-500 text-sm mb-8 -mt-4">{t.subtitle}</p>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {cards.map(({ icon: Icon, color, bg, label, content }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 transition-all duration-300"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-gray-800">{label}</h3>
              </div>
              {content}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/212699165490"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3 bg-[#25D366] hover:bg-[#20b85a] text-white font-bold rounded-xl transition-all text-sm shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href="tel:0699165490"
            className="flex items-center gap-2.5 px-7 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition-all text-sm shadow-sm"
          >
            <Phone className="w-4 h-4" />
            {t.callUs}
          </a>
          <a
            href="https://maps.google.com/?q=Librairie+Assalam+Tanger+Route+Principale"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3 bg-white border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-bold rounded-xl transition-all text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            {t.directions}
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl transition-all text-sm shadow-sm"
          >
            <Instagram className="w-4 h-4" />
            {t.instagram}
          </a>
        </div>

      </div>
    </section>
  );
}
