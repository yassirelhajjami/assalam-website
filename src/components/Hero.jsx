import { Phone, MapPin, Star, ChevronDown, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';
import heroBg from '../images/portfolio-6.jpeg';

export default function Hero({ lang, scrollTo }) {
  const t    = translations[lang].hero;
  const isRTL = lang === 'ar';

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85" />
      </div>

      {/* Gold bottom border accent */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-32 right-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-10 w-64 h-64 bg-navy-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className={`max-w-3xl ${isRTL ? 'mr-0 ml-auto text-right' : ''}`}>

          {/* Arabic calligraphy badge */}
          <div className="inline-block mb-5">
            <span
              className="font-arabic text-gold-400 text-2xl font-bold tracking-wide"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              مكتبة وراقة السلام
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t.title}
            <br />
            <span className="text-gold-400">{t.subtitle}</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/75 mb-9 max-w-2xl leading-relaxed">
            {t.description}
          </p>

          {/* CTA buttons */}
          <div className={`flex flex-wrap gap-4 mb-12 ${isRTL ? 'justify-end' : ''}`}>
            <button
              onClick={() => scrollTo('services')}
              className="group flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-full transition-all hover:shadow-2xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
            >
              {t.cta}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <a
              href="tel:0699165490"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 transition-all backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              {t.phone}
            </a>
          </div>

          {/* Info badges */}
          <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : ''}`}>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm">
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
              <span className="font-semibold text-gold-300">4.7</span>
              <span className="text-white/60">— 67 avis Google</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>Route Principale, Tanger</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={() => scrollTo('services')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-gold-400 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
