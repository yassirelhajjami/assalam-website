import { useState } from 'react';
import {
  ShoppingBag, Search, Menu, X, Phone, Heart,
  ChevronDown, Globe, User, Sun, Moon
} from 'lucide-react';
import { translations } from '../data/translations';
import logoImg from '../../pic1.png';

const LANGS = [
  { code: 'ar', label: 'ع' },
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

const getCategories = (lang) => {
  const cats = {
    ar: [
      { key: 'all',       label: 'جميع التصنيفات' },
      { key: 'livres',    label: 'كتب ومناهج' },
      { key: 'papeterie', label: 'أدوات قرطاسية ومدرسية' },
      { key: 'bureau',    label: 'أثاث مكتبي' },
      { key: 'print',     label: 'طباعة وتصوير' },
      { key: 'admin',     label: 'خدمات إدارية' },
    ],
    fr: [
      { key: 'all',       label: 'Toutes Catégories' },
      { key: 'livres',    label: 'Livres & Manuels' },
      { key: 'papeterie', label: 'Papeterie & Scolaire' },
      { key: 'bureau',    label: 'Mobilier de Bureau' },
      { key: 'print',     label: 'Impression & Copie' },
      { key: 'admin',     label: 'Services Admin' },
    ],
    en: [
      { key: 'all',       label: 'All Categories' },
      { key: 'livres',    label: 'Books & Textbooks' },
      { key: 'papeterie', label: 'Stationery & School' },
      { key: 'bureau',    label: 'Office Furniture' },
      { key: 'print',     label: 'Printing & Copying' },
      { key: 'admin',     label: 'Admin Services' },
    ],
  };
  return cats[lang] || cats.ar;
};

export default function Navbar({ lang, setLang, scrolled, scrollTo, page, setPage, cart, setStoreCat, darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[lang].nav;
  const categories = getCategories(lang);
  const totalItems = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const goHome = (id) => {
    if (page !== 'home') setPage('home');
    setTimeout(() => scrollTo(id), 50);
    setOpen(false);
  };

  const goStore = (catKey = 'all') => {
    if (setStoreCat) setStoreCat(catKey);
    setPage('store');
    setOpen(false);
    window.scrollTo(0,0);
  };

  const handleCategorySelect = (key) => {
    setOpen(false);
    if (key === 'print') {
      setPage('print-services');
      window.scrollTo(0,0);
    } else if (key === 'admin') {
      setPage('admin-services');
      window.scrollTo(0,0);
    } else {
      if (setStoreCat) setStoreCat(key);
      setPage('store');
      window.scrollTo(0,0);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
      {/* ── Top Utility Bar ── */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

          {/* LEFT: Cart + Wishlist + User + Language + Theme Switcher */}
          <div className="flex items-center gap-1">
            {/* Cart */}
            <button
              id="nav-cart-btn"
              onClick={() => goStore()}
              className="relative flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title={t.store}
            >
              <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-teal-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* User */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Dark Theme Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
              title={darkMode ? "Light Theme" : "Dark Theme"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-gold-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language */}
            <div className="hidden md:flex items-center gap-0.5 ml-1">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                    lang === code
                      ? 'bg-teal-700 text-white'
                      : 'text-gray-500 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* CENTER: Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => goHome('hero')}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <img src={logoImg} alt="مكتبة وراقة السلام" className="h-10 w-auto object-contain" />
          </button>

          {/* RIGHT: Search + Hamburger */}
          <div className="flex items-center gap-1">
            <button
              id="nav-search-btn"
              onClick={() => setSearchOpen(s => !s)}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="nav-menu-btn"
              onClick={() => setOpen(o => !o)}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar (expands on click) */}
        {searchOpen && (
          <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2.5 bg-white dark:bg-gray-900 animate-fade-in">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث عن منتج...' : lang === 'fr' ? 'Rechercher un produit...' : 'Search products...'}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-teal-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                dir="rtl"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Second Row: Category Navigation ── */}
      <nav className="hidden md:flex items-center justify-center h-11 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
        <div className="flex items-center gap-0">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleCategorySelect(key)}
              className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </button>
          ))}
          <a
            href="tel:0699165490"
            className="mr-4 flex items-center gap-1.5 px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-full transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            06 99 16 54 90
          </a>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl animate-slide-up">
          <div className="px-4 py-4 space-y-4">
            
            {/* Category links in a 2-column grid */}
            <div className="grid grid-cols-2 gap-2">
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className="flex items-center justify-center text-center py-2.5 px-3 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-gray-700 rounded-xl transition-all text-xs border border-transparent dark:border-gray-850"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Quick Actions (Wishlist & Profile) */}
            <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-xs border border-transparent dark:border-gray-800">
                <Heart className="w-4 h-4 text-gray-500" />
                {lang === 'ar' ? 'المفضلة' : lang === 'fr' ? 'Favoris' : 'Wishlist'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-55 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-xs border border-transparent dark:border-gray-800">
                <User className="w-4 h-4 text-gray-500" />
                {lang === 'ar' ? 'حسابي' : lang === 'fr' ? 'Mon Compte' : 'Account'}
              </button>
            </div>

            {/* Language Switcher in Drawer */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 px-1 text-start">
                {lang === 'ar' ? 'اللغة' : lang === 'fr' ? 'Langue' : 'Language'}
              </p>
              <div className="flex gap-1.5">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setOpen(false);
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border ${
                      lang === code
                        ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                        : 'bg-white dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-850 hover:text-teal-700 dark:text-gray-400'
                    }`}
                  >
                    {label === 'ع' ? 'العربية' : label === 'FR' ? 'Français' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact & Support */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <a
                href="tel:0699165490"
                className="flex items-center justify-center gap-2 w-full py-3 bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md hover:bg-teal-800 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {lang === 'ar' ? 'اتصل بنا: 0699165490' : lang === 'fr' ? 'Appeler: 06 99 16 54 90' : 'Call Us: 06 99 16 54 90'}
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
