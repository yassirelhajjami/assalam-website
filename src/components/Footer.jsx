import { MapPin, Phone, Clock, Instagram, Facebook, Youtube, Heart } from 'lucide-react';
import { translations } from '../data/translations';
import logoImg from '../../pic1.png';

export default function Footer({ lang }) {
  const t = translations[lang].footer;

  const navLinks = {
    ar: [
      { label: 'الرئيسية', id: 'hero' },
      { label: 'من نحن',   id: 'about' },
      { label: 'خدماتنا',  id: 'services' },
      { label: 'المعرض',   id: 'gallery' },
      { label: 'تواصل معنا', id: 'contact' },
    ],
    fr: [
      { label: 'Accueil',    id: 'hero' },
      { label: 'À propos',   id: 'about' },
      { label: 'Services',   id: 'services' },
      { label: 'Galerie',    id: 'gallery' },
      { label: 'Contact',    id: 'contact' },
    ],
    en: [
      { label: 'Home',     id: 'hero' },
      { label: 'About',    id: 'about' },
      { label: 'Services', id: 'services' },
      { label: 'Gallery',  id: 'gallery' },
      { label: 'Contact',  id: 'contact' },
    ],
  }[lang];

  const contactInfo = [
    { icon: MapPin, text: lang === 'ar' ? 'طنجة، المغرب' : lang === 'fr' ? 'Tanger, Maroc' : 'Tangier, Morocco' },
    { icon: Phone,  text: '06 99 16 54 90', href: 'tel:0699165490' },
    { icon: Clock,  text: lang === 'ar' ? 'السبت – الخميس: 08:00 – 20:00' : lang === 'fr' ? 'Sam–Jeu: 08h–20h' : 'Sat–Thu: 8am–8pm' },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Main columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <img src={logoImg} alt="Librairie Assalam" className="h-14 w-auto object-contain mb-4 brightness-200 invert" />
            <p className="text-teal-200 text-sm leading-relaxed mb-5 max-w-xs">
              {t.tagline}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/212699165490" target="_blank" rel="noopener" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.522 5.84L.057 23.71a.5.5 0 00.609.61l5.941-1.554A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.63-.49-5.15-1.34l-.36-.21-3.73.977.996-3.643-.232-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 relative">
              {lang === 'ar' ? 'روابط سريعة' : lang === 'fr' ? 'Liens Rapides' : 'Quick Links'}
              <div className="absolute -bottom-1.5 right-0 w-8 h-0.5 bg-gold-500" />
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, id }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-teal-200 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                    onClick={e => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="w-1 h-1 bg-teal-500 group-hover:bg-gold-400 rounded-full flex-shrink-0 transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 relative">
              {lang === 'ar' ? 'معلومات التواصل' : lang === 'fr' ? 'Informations' : 'Contact Info'}
              <div className="absolute -bottom-1.5 right-0 w-8 h-0.5 bg-gold-500" />
            </h4>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gold-400" strokeWidth={1.8} />
                  </div>
                  {href ? (
                    <a href={href} className="text-teal-200 hover:text-gold-400 text-sm transition-colors pt-1">{text}</a>
                  ) : (
                    <span className="text-teal-200 text-sm pt-1">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Divider + Copyright ── */}
        <div className="border-t border-teal-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-400">
          <p>
            © {year} مكتبة وراقة السلام — Librairie Assalam. {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}.
          </p>
          <p className="flex items-center gap-1">
            صُنع بـ <Heart className="w-3 h-3 text-red-400 fill-red-400" /> في طنجة، المغرب
          </p>
        </div>
      </div>
    </footer>
  );
}
