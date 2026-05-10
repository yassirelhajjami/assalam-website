import { useState } from 'react';
import { Menu, X, Phone, Moon, Sun, ShoppingBag } from 'lucide-react';
import { translations } from '../data/translations';
import logoImg from '../../pic1.png';

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
  { code: 'en', label: 'EN' },
];

export default function Navbar({ lang, setLang, scrolled, scrollTo, darkMode, setDarkMode, page, setPage }) {
  const [open, setOpen] = useState(false);
  const t = translations[lang].nav;

  const goHome = (id) => {
    if (page !== 'home') setPage('home');
    setTimeout(() => scrollTo(id), 50);
    setOpen(false);
  };

  const goStore = () => { setPage('store'); setOpen(false); };

  // Style helpers
  const solidBg = darkMode ? 'bg-gray-900 shadow-lg' : 'bg-white shadow-lg';
  const navBg   = scrolled || page === 'store' ? solidBg : 'bg-transparent';
  const textCol  = scrolled || page === 'store'
    ? darkMode ? 'text-gray-100' : 'text-navy-600'
    : 'text-white';
  const subCol   = scrolled || page === 'store'
    ? 'text-gold-500'
    : 'text-gold-300';
  const langBg   = scrolled || page === 'store'
    ? darkMode ? 'bg-gray-700' : 'bg-gray-100'
    : 'bg-white/10 backdrop-blur-sm';

  const NAV_LINKS = [
    { key: 'home',     action: () => goHome('hero') },
    { key: 'services', action: () => goHome('services') },
    { key: 'about',    action: () => goHome('about') },
    { key: 'gallery',  action: () => goHome('gallery') },
    { key: 'contact',  action: () => goHome('contact') },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={() => goHome('hero')} className="flex items-center gap-3 shrink-0">
            <img src={logoImg} alt="Assalam" className="h-12 w-auto object-contain" />
            <div className="hidden sm:block text-left">
              <p className={`font-bold text-base leading-tight ${textCol}`}>
                {lang === 'ar' ? 'مكتبة السلام' : 'Librairie Assalam'}
              </p>
              <p className={`text-xs ${subCol}`}>Tanger, Maroc</p>
            </div>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ key, action }) => (
              <button
                key={key}
                onClick={action}
                className={`text-sm font-medium transition-colors hover:text-gold-500 ${textCol}`}
              >
                {t[key]}
              </button>
            ))}
            {/* Store link */}
            <button
              onClick={goStore}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors px-3 py-1.5 rounded-full border ${
                page === 'store'
                  ? 'bg-gold-500 text-white border-gold-500'
                  : `border-current hover:bg-gold-500 hover:text-white hover:border-gold-500 ${textCol}`
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {t.store}
            </button>
          </nav>

          {/* Desktop right: lang + dark toggle + call */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language switcher */}
            <div className={`flex items-center rounded-full p-1 gap-0.5 ${langBg}`}>
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                    lang === code
                      ? 'bg-gold-500 text-white'
                      : `hover:text-gold-400 ${scrolled || page === 'store' ? (darkMode ? 'text-gray-300' : 'text-gray-600') : 'text-white/80'}`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                scrolled || page === 'store'
                  ? darkMode ? 'bg-gray-700 text-gold-400 hover:bg-gray-600' : 'bg-gray-100 text-navy-600 hover:bg-gray-200'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Phone CTA */}
            <a
              href="tel:0699165490"
              className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-full text-sm font-semibold transition-all"
            >
              <Phone className="w-4 h-4" />
              06 99 16 54 90
            </a>
          </div>

          {/* Mobile: lang + dark toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <div className={`flex items-center rounded-full p-1 gap-0.5 ${langBg}`}>
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all ${
                    lang === code ? 'bg-gold-500 text-white' : 'text-white/80 hover:text-gold-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setOpen(!open)} className={textCol}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={`md:hidden border-t shadow-xl ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="px-4 py-5 space-y-1">
            {NAV_LINKS.map(({ key, action }) => (
              <button
                key={key}
                onClick={action}
                className={`block w-full text-left py-3 px-2 font-medium border-b last:border-0 transition-colors hover:text-gold-500 ${
                  darkMode ? 'text-gray-200 border-gray-700' : 'text-gray-700 border-gray-50'
                }`}
              >
                {t[key]}
              </button>
            ))}
            <button
              onClick={goStore}
              className="flex items-center gap-2 w-full py-3 px-2 text-gold-500 font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              {t.store}
            </button>
            <a
              href="tel:0699165490"
              className="flex items-center justify-center gap-2 w-full py-3 mt-2 bg-gold-500 text-white rounded-full font-semibold"
            >
              <Phone className="w-4 h-4" />
              06 99 16 54 90
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
