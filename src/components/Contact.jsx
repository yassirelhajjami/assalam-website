import { MapPin, Phone, Clock, Instagram, ExternalLink } from 'lucide-react';
import { translations } from '../data/translations';

export default function Contact({ lang }) {
  const t     = translations[lang].contact;
  const isRTL = lang === 'ar';

  return (
    <section id="contact" className="py-24 bg-navy-600 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-navy-500 rounded-full opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-navy-700 rounded-full opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
            <div className="w-8 h-px bg-gold-500" />
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">Contact</span>
            <div className="w-8 h-px bg-gold-500" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t.title}
          </h2>
          <p className="text-navy-200 text-lg">{t.subtitle}</p>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Address */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {lang === 'ar' ? 'العنوان' : lang === 'fr' ? 'Adresse' : 'Address'}
            </h3>
            <p className="text-navy-200 leading-relaxed">{t.address}</p>
          </div>

          {/* Phone */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mb-5">
              <Phone className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {lang === 'ar' ? 'الهاتف' : lang === 'fr' ? 'Téléphone' : 'Phone'}
            </h3>
            <a
              href="tel:0699165490"
              className="text-gold-400 text-xl font-bold hover:text-gold-300 transition-colors"
              dir="ltr"
            >
              {t.phone}
            </a>
          </div>

          {/* Hours */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mb-5">
              <Clock className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {lang === 'ar' ? 'الأوقات' : lang === 'fr' ? 'Horaires' : 'Hours'}
            </h3>
            <p className="text-navy-200">{t.hours1}</p>
            <p className="text-gold-400 font-semibold mt-1">{t.hours2}</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
          <a
            href="tel:0699165490"
            className="flex items-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-full transition-all hover:shadow-2xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5" />
            {t.callUs}
          </a>
          <a
            href="https://maps.google.com/?q=Librairie+Assalam+Tanger+Route+Principale"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            {t.directions}
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 transition-all"
          >
            <Instagram className="w-5 h-5" />
            {t.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
