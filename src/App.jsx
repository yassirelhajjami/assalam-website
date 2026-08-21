import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';
import CategoryIcons      from './components/CategoryIcons';
import SchoolEntrySection from './components/SchoolEntrySection';
import Services           from './components/Services';
import About              from './components/About';
import Gallery            from './components/Gallery';
import Contact            from './components/Contact';
import Footer             from './components/Footer';
import Store              from './components/Store';
import AdminPanel         from './components/AdminPanel';
import PrintServicesPage  from './components/PrintServicesPage';
import AdminServicesPage  from './components/AdminServicesPage';
import { supabase }      from './supabaseClient';
import { translations }  from './data/translations';

const App = () => {
  const [lang, setLang]         = useState('ar');
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage]         = useState(() => {
    const path = window.location.pathname;
    if (path === '/assalam-admin') return 'admin';
    if (path === '/print-services') return 'print-services';
    if (path === '/admin-services') return 'admin-services';
    return 'home';
  });
  const [storeCat, setStoreCat] = useState('all');
  
  // Database content states
  const [dbProducts, setDbProducts] = useState([]);
  const [dbBanners, setDbBanners] = useState([]);
  const [dbSettings, setDbSettings] = useState([]);
  const [activeTranslations, setActiveTranslations] = useState(translations);

  // Fetch from Supabase
  const loadData = async () => {
    try {
      const { data: pData } = await supabase.from('products').select('*').order('id', { ascending: true });
      if (pData && pData.length > 0) setDbProducts(pData);

      const { data: bData } = await supabase.from('hero_banners').select('*').order('display_order', { ascending: true });
      if (bData && bData.length > 0) setDbBanners(bData);

      const { data: sData } = await supabase.from('website_settings').select('*');
      if (sData) {
        setDbSettings(sData);
        // Merge overrides
        const merged = JSON.parse(JSON.stringify(translations));
        sData.forEach(setting => {
          const parts = setting.key.split('.');
          ['ar', 'fr', 'en'].forEach(l => {
            if (!merged[l]) return;
            let curr = merged[l];
            for (let i = 0; i < parts.length - 1; i++) {
              if (!curr[parts[i]]) curr[parts[i]] = {};
              curr = curr[parts[i]];
            }
            const lastKey = parts[parts.length - 1];
            const valField = `value_${l}`;
            if (setting[valField]) {
              curr[lastKey] = setting[valField];
            }
          });
        });
        setActiveTranslations(merged);
      }
    } catch (err) {
      console.warn("Supabase fetch error. Using local mock fallbacks:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (page === 'admin') {
      if (path !== '/assalam-admin') window.history.pushState({}, '', '/assalam-admin');
    } else if (page === 'print-services') {
      if (path !== '/print-services') window.history.pushState({}, '', '/print-services');
    } else if (page === 'admin-services') {
      if (path !== '/admin-services') window.history.pushState({}, '', '/admin-services');
    } else {
      if (path === '/assalam-admin' || path === '/print-services' || path === '/admin-services') {
        window.history.pushState({}, '', '/');
      }
    }
  }, [page]);

  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('assalam_dark');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Sync theme to localStorage
  useEffect(() => {
    localStorage.setItem('assalam_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('assalam_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('assalam_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, qty) => {
    if (qty < 1) { removeFromCart(productId); return; }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Sync lang direction on html element
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="font-arabic text-gray-800 dark:text-gray-100 transition-colors duration-205">
      {page !== 'admin' && (
        <Navbar
          lang={lang} setLang={setLang}
          scrolled={scrolled} scrollTo={scrollTo}
          page={page} setPage={setPage}
          cart={cart}
          setStoreCat={setStoreCat}
          darkMode={darkMode} setDarkMode={setDarkMode}
          translations={activeTranslations}
        />
      )}

      {/* ── Floating Cart Button (visible on service pages when cart has items) ── */}
      {page !== 'admin' && page !== 'store' && cart.length > 0 && (
        <button
          onClick={() => { setPage('store'); window.scrollTo(0, 0); }}
          dir="ltr"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl shadow-xl font-bold text-sm transition-all animate-bounce-once"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="min-w-[20px] h-5 bg-white text-teal-700 text-[11px] font-bold rounded-full flex items-center justify-center px-1">
            {cart.reduce((sum, i) => sum + i.quantity, 0)}
          </span>
        </button>
      )}

      {page === 'admin' ? (
        <AdminPanel
          lang={lang}
          setPage={setPage}
          products={dbProducts}
          banners={dbBanners}
          customSettings={dbSettings}
          reloadData={loadData}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ) : page === 'print-services' ? (
        <PrintServicesPage
          lang={lang}
          setPage={setPage}
          translations={activeTranslations}
        />
      ) : page === 'admin-services' ? (
        <AdminServicesPage
          lang={lang}
          setPage={setPage}
        />
      ) : page === 'store' ? (
        <Store
          lang={lang}
          setPage={setPage}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
          clearCart={clearCart}
          initialCat={storeCat}
          darkMode={darkMode}
          translations={activeTranslations}
          dbProducts={dbProducts}
        />
      ) : (
        <>
          <Hero lang={lang} scrollTo={scrollTo} setPage={setPage} banners={dbBanners} translations={activeTranslations} />
          <CategoryIcons
            lang={lang}
            onCategoryClick={(catKey) => {
              if (catKey === 'print') { setPage('print-services'); }
              else if (catKey === 'admin') { setPage('admin-services'); }
              else { setStoreCat(catKey); setPage('store'); }
              window.scrollTo(0, 0);
            }}
          />
          <SchoolEntrySection 
            lang={lang} 
            onCtaClick={() => { setStoreCat('papeterie'); setPage('store'); window.scrollTo(0,0); }} 
            addToCart={addToCart}
            cart={cart}
            translations={activeTranslations}
            dbProducts={dbProducts}
          />
          <Services lang={lang} translations={activeTranslations} />
          <About    lang={lang} translations={activeTranslations} />
          <Gallery  lang={lang} setPage={setPage} translations={activeTranslations} />
          <Contact  lang={lang} translations={activeTranslations} />
          <Footer   lang={lang} scrollTo={scrollTo} setPage={setPage} translations={activeTranslations} />
        </>
      )}
    </div>
  );
};

export default App;
