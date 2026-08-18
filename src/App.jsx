import { useState, useEffect } from 'react';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import CategoryIcons from './components/CategoryIcons';
import Services      from './components/Services';
import About         from './components/About';
import Gallery       from './components/Gallery';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import Store         from './components/Store';

const App = () => {
  const [lang, setLang]         = useState('ar');
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage]         = useState('home');

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
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="font-arabic">
      <Navbar
        lang={lang} setLang={setLang}
        scrolled={scrolled} scrollTo={scrollTo}
        page={page} setPage={setPage}
        cart={cart}
      />

      {page === 'store' ? (
        <Store
          lang={lang}
          setPage={setPage}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
          clearCart={clearCart}
        />
      ) : (
        <>
          <Hero lang={lang} scrollTo={scrollTo} setPage={setPage} />
          <CategoryIcons lang={lang} onCategoryClick={() => setPage('store')} />
          <Services lang={lang} />
          <About    lang={lang} />
          <Gallery  lang={lang} setPage={setPage} />
          <Contact  lang={lang} />
          <Footer   lang={lang} scrollTo={scrollTo} setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default App;
