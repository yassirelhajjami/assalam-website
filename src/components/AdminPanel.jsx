import { useState, useEffect } from 'react';
import {
  Plus, Trash2, Edit, Save, LogOut, Lock, Mail, Image,
  Folder, Layers, MessageSquare, Phone, MapPin, Eye, ShoppingCart, RefreshCw,
  Sun, Moon, ClipboardList, CheckCircle, Clock, XCircle, ChevronDown
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { translations } from '../data/translations';

export default function AdminPanel({ lang, setPage, products, banners, customSettings, reloadData, darkMode, setDarkMode }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      setOrders(data || []);
    } catch (e) { console.error(e); }
    finally { setOrdersLoading(false); }
  };

  const updateOrderStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    await supabase.from('orders').delete().eq('id', id);
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // Product Form State
  const [prodId, setProdId] = useState(null);
  const [prodCategory, setProdCategory] = useState('papeterie');
  const [prodSubcategory, setProdSubcategory] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [prodNameAr, setProdNameAr] = useState('');
  const [prodNameFr, setProdNameFr] = useState('');
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodDescAr, setProdDescAr] = useState('');
  const [prodDescFr, setProdDescFr] = useState('');
  const [prodDescEn, setProdDescEn] = useState('');
  const [prodPriceAr, setProdPriceAr] = useState('');
  const [prodPriceFr, setProdPriceFr] = useState('');
  const [prodPriceEn, setProdPriceEn] = useState('');
  const [prodPriceNum, setProdPriceNum] = useState('');
  const [prodRating, setProdRating] = useState(5);
  const [prodFile, setProdFile] = useState(null);

  // Banner Form State
  const [bannerId, setBannerId] = useState(null);
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerTitleAr, setBannerTitleAr] = useState('');
  const [bannerTitleFr, setBannerTitleFr] = useState('');
  const [bannerTitleEn, setBannerTitleEn] = useState('');
  const [bannerSubtitleAr, setBannerSubtitleAr] = useState('');
  const [bannerSubtitleFr, setBannerSubtitleFr] = useState('');
  const [bannerSubtitleEn, setBannerSubtitleEn] = useState('');
  const [bannerDisplayOrder, setBannerDisplayOrder] = useState(0);
  const [bannerFile, setBannerFile] = useState(null);

  // Settings/Titles Form State
  const [settingKey, setSettingKey] = useState('');
  const [settingValAr, setSettingValAr] = useState('');
  const [settingValFr, setSettingValFr] = useState('');
  const [settingValEn, setSettingValEn] = useState('');

  // Check current session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Image Upload Helper
  const uploadImage = async (file, bucketPath) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${bucketPath}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assalam-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('assalam-assets')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error(err);
      alert("Failed to upload to storage bucket. Please ensure you created an 'assalam-assets' public storage bucket in Supabase. Using fallback URL placeholder instead.");
      return "";
    }
  };

  // ── Products CRUD ──
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = prodImageUrl;
    if (prodFile) {
      const uploadedUrl = await uploadImage(prodFile, 'products');
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    }

    if (!finalImageUrl) {
      alert("Please provide an image URL or upload a file.");
      setLoading(false);
      return;
    }

    const payload = {
      category: prodCategory,
      subcategory: prodSubcategory || null,
      image_url: finalImageUrl,
      name_ar: prodNameAr,
      name_fr: prodNameFr,
      name_en: prodNameEn,
      desc_ar: prodDescAr || null,
      desc_fr: prodDescFr || null,
      desc_en: prodDescEn || null,
      price_ar: prodPriceAr,
      price_fr: prodPriceFr,
      price_en: prodPriceEn,
      price_num: parseFloat(prodPriceNum) || 0,
      rating: parseInt(prodRating) || 5
    };

    try {
      if (prodId) {
        // Update
        const { error } = await supabase.from('products').update(payload).eq('id', prodId);
        if (error) throw error;
        alert("Product updated successfully!");
      } else {
        // Create
        const { error } = await supabase.from('products').insert([payload]);
        if (error) throw error;
        alert("Product created successfully!");
      }
      resetProdForm();
      reloadData();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleEditProduct = (p) => {
    setProdId(p.id);
    setProdCategory(p.category);
    setProdSubcategory(p.subcategory || '');
    setProdImageUrl(p.image_url);
    setProdNameAr(p.name_ar);
    setProdNameFr(p.name_fr);
    setProdNameEn(p.name_en);
    setProdDescAr(p.desc_ar || '');
    setProdDescFr(p.desc_fr || '');
    setProdDescEn(p.desc_en || '');
    setProdPriceAr(p.price_ar);
    setProdPriceFr(p.price_fr);
    setProdPriceEn(p.price_en);
    setProdPriceNum(p.price_num);
    setProdRating(p.rating);
    setProdFile(null);
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      alert("Product deleted!");
      reloadData();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const resetProdForm = () => {
    setProdId(null);
    setProdCategory('papeterie');
    setProdSubcategory('');
    setProdImageUrl('');
    setProdNameAr('');
    setProdNameFr('');
    setProdNameEn('');
    setProdDescAr('');
    setProdDescFr('');
    setProdDescEn('');
    setProdPriceAr('');
    setProdPriceFr('');
    setProdPriceEn('');
    setProdPriceNum('');
    setProdRating(5);
    setProdFile(null);
  };

  // ── Banners CRUD ──
  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = bannerImageUrl;
    if (bannerFile) {
      const uploadedUrl = await uploadImage(bannerFile, 'banners');
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    }

    if (!finalImageUrl) {
      alert("Please provide an image URL or upload a file.");
      setLoading(false);
      return;
    }

    const payload = {
      image_url: finalImageUrl,
      title_ar: bannerTitleAr || null,
      title_fr: bannerTitleFr || null,
      title_en: bannerTitleEn || null,
      subtitle_ar: bannerSubtitleAr || null,
      subtitle_fr: bannerSubtitleFr || null,
      subtitle_en: bannerSubtitleEn || null,
      display_order: parseInt(bannerDisplayOrder) || 0
    };

    try {
      if (bannerId) {
        const { error } = await supabase.from('hero_banners').update(payload).eq('id', bannerId);
        if (error) throw error;
        alert("Banner updated successfully!");
      } else {
        const { error } = await supabase.from('hero_banners').insert([payload]);
        if (error) throw error;
        alert("Banner created successfully!");
      }
      resetBannerForm();
      reloadData();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleEditBanner = (b) => {
    setBannerId(b.id);
    setBannerImageUrl(b.image_url);
    setBannerTitleAr(b.title_ar || '');
    setBannerTitleFr(b.title_fr || '');
    setBannerTitleEn(b.title_en || '');
    setBannerSubtitleAr(b.subtitle_ar || '');
    setBannerSubtitleFr(b.subtitle_fr || '');
    setBannerSubtitleEn(b.subtitle_en || '');
    setBannerDisplayOrder(b.display_order);
    setBannerFile(null);
  };

  const handleDeleteBanner = async (id) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('hero_banners').delete().eq('id', id);
      if (error) throw error;
      alert("Banner deleted!");
      reloadData();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const resetBannerForm = () => {
    setBannerId(null);
    setBannerImageUrl('');
    setBannerTitleAr('');
    setBannerTitleFr('');
    setBannerTitleEn('');
    setBannerSubtitleAr('');
    setBannerSubtitleFr('');
    setBannerSubtitleEn('');
    setBannerDisplayOrder(0);
    setBannerFile(null);
  };

  // ── Settings CRUD ──
  const handleSettingSubmit = async (e) => {
    e.preventDefault();
    if (!settingKey) { alert("Key is required"); return; }
    setLoading(true);

    const payload = {
      key: settingKey,
      value_ar: settingValAr,
      value_fr: settingValFr,
      value_en: settingValEn,
      updated_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase.from('website_settings').upsert(payload);
      if (error) throw error;
      alert("Setting saved successfully!");
      setSettingKey('');
      setSettingValAr('');
      setSettingValFr('');
      setSettingValEn('');
      reloadData();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleEditSetting = (s) => {
    setSettingKey(s.key);
    setSettingValAr(s.value_ar);
    setSettingValFr(s.value_fr);
    setSettingValEn(s.value_en);
  };

  const handleDeleteSetting = async (key) => {
    if (!confirm("Are you sure you want to delete this key setting?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('website_settings').delete().eq('key', key);
      if (error) throw error;
      alert("Setting deleted!");
      reloadData();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const seedDefaultProducts = async () => {
    setLoading(true);
    try {
      const productsToSeed = [
        {
          category: 'bureau',
          subcategory: '',
          image_url: '/images/products/desk.jpg',
          name_ar: 'طاولة مكتب',
          name_fr: 'Bureau de Travail',
          name_en: 'Work Desk',
          desc_ar: 'مكتب عصري مريح، مثالي للعمل من المنزل.',
          desc_fr: 'Bureau ergonomique moderne, idéal pour le home office.',
          desc_en: 'Modern ergonomic desk, ideal for home office.',
          price_ar: 'ابتداءً من 450 درهم',
          price_fr: 'À partir de 450 DH',
          price_en: 'From 450 MAD',
          price_num: 450,
          rating: 5
        },
        {
          category: 'bureau',
          subcategory: '',
          image_url: '/images/products/chair.jpg',
          name_ar: 'كرسي مكتبي',
          name_fr: 'Chaise de Bureau',
          name_en: 'Office Chair',
          desc_ar: 'كرسي مريح مع مساند يد قابلة للتعديل.',
          desc_fr: 'Chaise confortable avec accoudoirs réglables.',
          desc_en: 'Comfortable chair with adjustable armrests.',
          price_ar: 'ابتداءً من 350 درهم',
          price_fr: 'À partir de 350 DH',
          price_en: 'From 350 MAD',
          price_num: 350,
          rating: 4
        },
        {
          category: 'bureau',
          subcategory: '',
          image_url: '/images/products/cabinet.jpg',
          name_ar: 'خزانة تصنيف',
          name_fr: 'Armoire de Classement',
          name_en: 'Filing Cabinet',
          desc_ar: 'خزانة متينة لتخزين وأرشفة وثائقك الهامة.',
          desc_fr: 'Armoire robuste pour rangement et archivage.',
          desc_en: 'Sturdy cabinet for storing and archiving documents.',
          price_ar: 'ابتداءً من 600 درهم',
          price_fr: 'À partir de 600 DH',
          price_en: 'From 600 MAD',
          price_num: 600,
          rating: 5
        },
        {
          category: 'bureau',
          subcategory: '',
          image_url: '/images/products/lamp.jpg',
          name_ar: 'مصباح مكتبي LED',
          name_fr: 'Lampe de Bureau LED',
          name_en: 'LED Desk Lamp',
          desc_ar: 'إضاءة LED قابلة للتعديل، تحمي عينيك.',
          desc_fr: 'إضاءة LED قابلة للتعديل، تحمي عينيك.',
          desc_en: 'Adjustable LED lighting that protects your eyes.',
          price_ar: 'ابتداءً من 80 درهم',
          price_fr: 'À partir de 80 DH',
          price_en: 'From 80 MAD',
          price_num: 80,
          rating: 4
        },
        {
          category: 'bureau',
          subcategory: '',
          image_url: '/images/products/shelf.jpg',
          name_ar: 'رف كتب',
          name_fr: 'Étagère à Livres',
          name_en: 'Bookshelf',
          desc_ar: 'رف متين من الخشب، مثالي لتنظيم كتبك.',
          desc_fr: 'Étagère solide en bois, pour vos livres et dossiers.',
          desc_en: 'Solid wood shelf, perfect for books and folders.',
          price_ar: 'ابتداءً من 200 درهم',
          price_fr: 'À partir de 200 DH',
          price_en: 'From 200 MAD',
          price_num: 200,
          rating: 5
        },
        {
          category: 'bureau',
          subcategory: '',
          image_url: '/images/products/stand.jpg',
          name_ar: 'حامل متعدد الوظائف',
          name_fr: 'Support Multifonction',
          name_en: 'Multifunction Stand',
          desc_ar: 'حامل للشاشة أو الكتب أو الوثائق.',
          desc_fr: 'Support pour écran, livres ou documents.',
          desc_en: 'Stand for monitor, books, or documents.',
          price_ar: 'ابتداءً من 120 درهم',
          price_fr: 'À partir de 120 DH',
          price_en: 'From 120 MAD',
          price_num: 120,
          rating: 4
        },
        {
          category: 'papeterie',
          subcategory: 'pens',
          image_url: '/images/products/pens.jpg',
          name_ar: 'قلم قابل للمسح SBC الأصلي',
          name_fr: 'Stylo effaçable original SBC',
          name_en: 'SBC Original Erasable Pen',
          desc_ar: 'قلم حبر جاف قابل للمسح بجودة عالية، مثالي للكتابة المدرسية.',
          desc_fr: "Stylo gel effaçable haute qualité, idéal pour l'école.",
          desc_en: 'High quality erasable gel ink pen, perfect for school.',
          price_ar: '3.45 درهم',
          price_fr: '3.45 DH',
          price_en: '3.45 MAD',
          price_num: 3.45,
          rating: 5
        },
        {
          category: 'papeterie',
          subcategory: 'notebooks',
          image_url: '/images/products/paper.jpg',
          name_ar: 'دفتر جامعة عربي فاخر A4',
          name_fr: 'Cahier universitaire A4 luxe',
          name_en: 'Premium College Notebook A4',
          desc_ar: 'دفتر جامعي فاخر ذو جودة عالية بسلك معدني متين.',
          desc_fr: 'Cahier de qualité supérieure avec spirale métallique.',
          desc_en: 'High quality notebook with durable metallic spiral.',
          price_ar: '17.25 درهم',
          price_fr: '17.25 DH',
          price_en: '17.25 MAD',
          price_num: 17.25,
          rating: 5
        },
        {
          category: 'papeterie',
          subcategory: 'notebooks',
          image_url: '/images/products/paper.jpg',
          name_ar: 'دفتر جامعة كرافت A5 - A4',
          name_fr: 'Cahier Kraft A5 - A4',
          name_en: 'Kraft College Notebook A5/A4',
          desc_ar: 'دفتر كرافت بيئي أنيق، غلاف سميك متين.',
          desc_fr: 'Cahier en papier kraft authentique, couverture rigide.',
          desc_en: 'Chic environmental kraft paper college notebook.',
          price_ar: '7.48 درهم',
          price_fr: '7.48 DH',
          price_en: '7.48 MAD',
          price_num: 7.48,
          rating: 4
        },
        {
          category: 'papeterie',
          subcategory: 'covers',
          image_url: '/images/products/folder.jpg',
          name_ar: 'تجليد ذاتي اللصق SBC الأصلي',
          name_fr: 'Couvre livre adhésif SBC',
          name_en: 'SBC Self-Adhesive Book Cover',
          desc_ar: 'بلاستيك شفاف لاصق لتجليد الكتب وحمايتها.',
          desc_fr: 'Rouleau de plastique adhésif transparent pour couvrir les livres.',
          desc_en: 'Clear plastic self-adhesive wrap to protect school books.',
          price_ar: '8.05 درهم',
          price_fr: '8.05 DH',
          price_en: '8.05 MAD',
          price_num: 8.05,
          rating: 5
        },
        {
          category: 'papeterie',
          subcategory: 'bags',
          image_url: '/images/products/shelf.jpg',
          name_ar: 'حقيبة مدرسية متكاملة للبنات',
          name_fr: 'Sac à dos complet filles',
          name_en: 'Complete School Bag Set Girl',
          desc_ar: 'طقم حقيبة مدرسية متكامل يشمل المقلمية وحافظة الطعام.',
          desc_fr: 'Ensemble complet comprenant sac à dos, trousse et boîte à lunch.',
          desc_en: 'Durable school backpack combo with lunchbox and pencil case.',
          price_ar: '149.00 درهم',
          price_fr: '149.00 DH',
          price_en: '149.00 MAD',
          price_num: 149,
          rating: 5
        },
        {
          category: 'papeterie',
          subcategory: 'bags',
          image_url: '/images/products/folder.jpg',
          name_ar: 'حقيبة مدرسية متكاملة للأولاد',
          name_fr: 'Sac à dos complet garçons',
          name_en: 'Complete School Bag Set Boy',
          desc_ar: 'حقيبة ظهر متينة بجيوب متعددة وتصميم رياضي.',
          desc_fr: 'Ensemble de sac à dos solide avec compartiments multiples.',
          desc_en: 'Sporty multi-compartment school bag set for boys.',
          price_ar: '149.00 درهم',
          price_fr: '149.00 DH',
          price_en: '149.00 MAD',
          price_num: 149,
          rating: 5
        },
        {
          category: 'papeterie',
          subcategory: 'colors',
          image_url: '/images/products/pens.jpg',
          name_ar: 'ألوان خشبية SBC 24 لون',
          name_fr: 'Crayons de couleur SBC 24',
          name_en: 'SBC Colored Pencils 24 Pack',
          desc_ar: 'علبة ألوان خشبية ناصعة لجميع الأنشطة الفنية المدرسية.',
          desc_fr: 'Boîte de 24 crayons de couleur de qualité professionnelle.',
          desc_en: 'Vibrant coloring pencils box for arts and crafts.',
          price_ar: '24.00 درهم',
          price_fr: '24.00 DH',
          price_en: '24.00 MAD',
          price_num: 24,
          rating: 4
        }
      ];
      const { error } = await supabase.from('products').insert(productsToSeed);
      if (error) throw error;
      alert("Seeded 13 default catalog products successfully!");
      reloadData();
    } catch (err) {
      alert("Products seeding failed: " + err.message);
    }
    setLoading(false);
  };

  const seedDefaultBanners = async () => {
    setLoading(true);
    try {
      const bannersToSeed = [
        { image_url: '/images/ourads/ad1.jpeg', display_order: 1 },
        { image_url: '/images/ourads/ad2.jpeg', display_order: 2 },
        { image_url: '/images/ourads/ad5.jpeg', display_order: 3 },
        { image_url: '/images/ourads/ad6.jpeg', display_order: 4 },
        { image_url: '/images/ourads/ad7.jpeg', display_order: 5 },
        { image_url: '/images/ourads/ad8.jpeg', display_order: 6 }
      ];
      const { error } = await supabase.from('hero_banners').insert(bannersToSeed);
      if (error) throw error;
      alert("Seeded default banners successfully!");
      reloadData();
    } catch (err) {
      alert("Banners seeding failed: " + err.message);
    }
    setLoading(false);
  };

  const seedDefaultSettings = async () => {
    setLoading(true);
    try {
      const settingsToSeed = [
        { key: 'hero.sub', value_ar: 'مكتبة وراقة السلام — طنجة', value_fr: 'Librairie Assalam — Tanger', value_en: 'Assalam Library — Tangier' },
        { key: 'about.title', value_ar: 'من نحن - مكتبتنا', value_fr: 'À propos de notre librairie', value_en: 'About our library' },
        { key: 'about.description', value_ar: 'مكتبة السلام متواجدة في طنجة، المغرب، تقدم لزبنائها الكتب والأدوات المدرسية والخدمات الإدارية.', value_fr: 'Située sur la Route Principale de Tanger, la Librairie Assalam est bien plus qu\'une simple librairie. C\'est un espace dédié à l\'éducation, à la culture et aux services de proximité.', value_en: 'Located on the Main Road of Tangier, Assalam Library is more than just a bookstore. It is a space dedicated to education, culture, and local community services.' },
        { key: 'about.image', value_ar: '/pic2.jpeg', value_fr: '/pic2.jpeg', value_en: '/pic2.jpeg' },
        { key: 'gallery.promo1.label', value_ar: 'أدوات مدرسية', value_fr: 'Fournitures Scolaires', value_en: 'School Supplies' },
        { key: 'gallery.promo1.img', value_ar: '/images/ourads/ad3.jpeg', value_fr: '/images/ourads/ad3.jpeg', value_en: '/images/ourads/ad3.jpeg' },
        { key: 'gallery.promo2.label', value_ar: 'أثاث مكتبي', value_fr: 'Mobilier de Bureau', value_en: 'Office Furniture' },
        { key: 'gallery.promo2.img', value_ar: '/images/ourads/ad4.jpeg', value_fr: '/images/ourads/ad4.jpeg', value_en: '/images/ourads/ad4.jpeg' },
        { key: 'gallery.promo3.label', value_ar: 'خدمات الطباعة', value_fr: 'Services Impression', value_en: 'Printing Services' },
        { key: 'gallery.promo3.img', value_ar: '/images/ourads/ad8.jpeg', value_fr: '/images/ourads/ad8.jpeg', value_en: '/images/ourads/ad8.jpeg' },
        { key: 'gallery.mini1.img', value_ar: '/images/ourads/ad9.jpeg', value_fr: '/images/ourads/ad9.jpeg', value_en: '/images/ourads/ad9.jpeg' },
        { key: 'gallery.mini2.img', value_ar: '/images/ourads/ad10.jpeg', value_fr: '/images/ourads/ad10.jpeg', value_en: '/images/ourads/ad10.jpeg' },
        { key: 'gallery.mini3.img', value_ar: '/images/ourads/ad11.jpeg', value_fr: '/images/ourads/ad11.jpeg', value_en: '/images/ourads/ad11.jpeg' }
      ];
      const { error } = await supabase.from('website_settings').upsert(settingsToSeed);
      if (error) throw error;
      alert("Website text and layout parameters seeded successfully!");
      reloadData();
    } catch (err) {
      alert("Layout seeding failed: " + err.message);
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <RefreshCw className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  // ── Authentication Login Page ──
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 pt-[100px] pb-20">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 relative">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
          </button>
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-100 dark:border-teal-900/40">
              <Lock className="w-7 h-7 text-teal-700 dark:text-teal-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {lang === 'ar' ? 'لوحة التحكم للمسؤول' : lang === 'fr' ? 'Connexion Admin' : 'Admin Panel Access'}
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
              {lang === 'ar' ? 'سجل الدخول لإدارة المنتجات، الصور والنصوص' : 'Sign in to manage products, banners, and titles'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" dir="ltr">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 text-left">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none focus:border-teal-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 text-left">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-955 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none focus:border-teal-600 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              {lang === 'ar' ? 'دخول' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <button
              onClick={() => setPage('home')}
              className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline"
            >
              {lang === 'ar' ? '← العودة للرئيسية' : '← Back to Home'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Admin Panel Authenticated View ──
  return (
    <div className="min-h-screen pt-[90px] pb-20 bg-gray-50 dark:bg-gray-950 transition-colors" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Dashboard Utility */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-600" />
              Website Admin Panel
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Logged in as {user.email}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 hover:text-teal-650 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 rounded-xl transition-all border border-gray-200/40 dark:border-gray-800 flex items-center justify-center"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={() => setPage('home')}
              className="px-4 py-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-600 dark:text-gray-300 rounded-xl transition-all border border-gray-200/40 dark:border-gray-800"
            >
              Go to Website
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </button>
          </div>
        </div>

        {/* Tab switch buttons */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 gap-2">
          {['products', 'orders', 'banners', 'settings', 'recovery'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); if (tab === 'orders') fetchOrders(); }}
              className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-teal-700 text-teal-700 dark:text-teal-400'
                  : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'products' ? 'Products Catalog'
                : tab === 'orders' ? '📦 Orders'
                : tab === 'banners' ? 'Hero Banners'
                : tab === 'settings' ? 'Text & Titles'
                : 'Setup Recovery'}
            </button>
          ))}
        </div>

        {/* ── TAB: ORDERS ── */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-teal-600" />
                Customer Orders
                <span className="ml-1 px-2 py-0.5 text-xs bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-full font-bold">{orders.length}</span>
              </h2>
              <button onClick={fetchOrders} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 text-gray-600 dark:text-gray-300 rounded-xl border border-gray-200/40 dark:border-gray-800 transition-all">
                <RefreshCw className={`w-3.5 h-3.5 ${ordersLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {ordersLoading ? (
              <div className="text-center py-16 text-gray-400">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center gap-3 text-gray-400">
                <ClipboardList className="w-14 h-14 text-gray-200 dark:text-gray-800" />
                <p className="font-medium">No orders yet</p>
                <p className="text-xs text-gray-400">Orders from customers will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-800 dark:text-gray-100">#{order.id} — {order.customer_name}</span>
                          <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                            order.status === 'completed' ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
                            : order.status === 'cancelled' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                          }`}>
                            {order.status === 'completed' ? '✓ Completed' : order.status === 'cancelled' ? '✗ Cancelled' : '⏳ Pending'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>📞 {order.customer_phone}</span>
                          {order.customer_city && <span>📍 {order.customer_city}</span>}
                          <span>🕐 {new Date(order.created_at).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        {order.notes && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 italic">"{order.notes}"</p>}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl text-xs font-semibold focus:outline-none"
                        >
                          <option value="pending">⏳ Pending</option>
                          <option value="completed">✓ Completed</option>
                          <option value="cancelled">✗ Cancelled</option>
                        </select>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          title="Delete order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 space-y-1.5">
                      {(Array.isArray(order.items) ? order.items : []).map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-300">{item.quantity}× {item.name}</span>
                          <span className="font-semibold text-teal-700 dark:text-teal-400">{item.price}</span>
                        </div>
                      ))}
                      <div className="pt-1.5 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm font-bold text-gray-800 dark:text-gray-100">
                        <span>Total</span>
                        <span>{order.total_amount} DH{order.has_on_demand ? '+' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 1: PRODUCTS MANAGER ── */}
        {activeTab === 'products' && (

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Form Column */}
            <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl shadow-sm lg:col-span-1">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600" />
                {prodId ? "Edit Product" : "Add New Product"}
              </h2>

              <form onSubmit={handleProductSubmit} className="space-y-3.5 text-left">
                {/* Category selection */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  >
                    <option value="papeterie">Stationery / School (قرطاسية)</option>
                    <option value="bureau">Office Furniture (أثاث مكتب)</option>
                    <option value="livres">Books (كتب ومدرسي)</option>
                  </select>
                </div>

                {prodCategory === 'papeterie' && (
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subcategory</label>
                    <select
                      value={prodSubcategory}
                      onChange={(e) => setProdSubcategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                    >
                      <option value="">None / General</option>
                      <option value="notebooks">Notebooks & Paper</option>
                      <option value="bags">Sacks & Trousses</option>
                      <option value="colors">Colors</option>
                      <option value="pens">Pens & Erasers</option>
                      <option value="covers">Book Covers</option>
                    </select>
                  </div>
                )}

                {/* Multilingual names */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="العربية: اسم المنتج"
                    value={prodNameAr}
                    onChange={(e) => setProdNameAr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:border-teal-600 focus:outline-none text-right"
                    dir="rtl"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Français: Nom du produit"
                    value={prodNameFr}
                    onChange={(e) => setProdNameFr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:border-teal-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="English: Product Name"
                    value={prodNameEn}
                    onChange={(e) => setProdNameEn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:border-teal-600 focus:outline-none"
                  />
                </div>

                {/* Multilingual descriptions */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Description (Optional)</label>
                  <textarea
                    placeholder="العربية: وصف المنتج"
                    value={prodDescAr}
                    onChange={(e) => setProdDescAr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:border-teal-600 focus:outline-none text-right"
                    rows={2}
                    dir="rtl"
                  />
                  <textarea
                    placeholder="Français: Description"
                    value={prodDescFr}
                    onChange={(e) => setProdDescFr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:border-teal-600 focus:outline-none"
                    rows={2}
                  />
                  <textarea
                    placeholder="English: Description"
                    value={prodDescEn}
                    onChange={(e) => setProdDescEn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:border-teal-600 focus:outline-none"
                    rows={2}
                  />
                </div>

                {/* Multilingual Prices */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Display Prices</label>
                  <input
                    type="text"
                    required
                    placeholder="Arabic Price (e.g. 15 درهم)"
                    value={prodPriceAr}
                    onChange={(e) => setProdPriceAr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="French Price (e.g. 15.00 DH)"
                    value={prodPriceFr}
                    onChange={(e) => setProdPriceFr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="English Price (e.g. 15.00 MAD)"
                    value={prodPriceEn}
                    onChange={(e) => setProdPriceEn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                {/* Numeric price (for checkout computations) */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Numeric Price (DH)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 15.00"
                      value={prodPriceNum}
                      onChange={(e) => setProdPriceNum(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      required
                      value={prodRating}
                      onChange={(e) => setProdRating(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Image upload / URL */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter image link URL"
                    value={prodImageUrl}
                    onChange={(e) => setProdImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none mb-1.5"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">Or Upload:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProdFile(e.target.files[0] || null)}
                      className="text-xs text-gray-500"
                    />
                  </div>
                </div>

                {/* Submit / Reset buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Product
                  </button>
                  {prodId && (
                    <button
                      type="button"
                      onClick={resetProdForm}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-250 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Table Column */}
            <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm lg:col-span-2 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Products Catalog ({products.length})</h2>
                <button onClick={reloadData} className="text-gray-400 hover:text-teal-600 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto max-h-[620px] no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-950 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100 dark:border-gray-800 font-bold">
                      <th className="px-5 py-3.5">Image</th>
                      <th className="px-5 py-3.5">Name (FR)</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Price</th>
                      <th className="px-5 py-3.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-950/20 text-gray-700 dark:text-gray-300">
                        <td className="px-5 py-2.5">
                          <img src={p.image_url} alt={p.name_fr} className="w-10 h-10 object-cover rounded-lg border dark:border-gray-800" />
                        </td>
                        <td className="px-5 py-2.5 font-semibold text-gray-800 dark:text-gray-100 max-w-[180px] truncate">
                          {p.name_fr}
                        </td>
                        <td className="px-5 py-2.5 capitalize">
                          {p.category} {p.subcategory && `(${p.subcategory})`}
                        </td>
                        <td className="px-5 py-2.5 font-bold text-teal-700 dark:text-teal-400">
                          {p.price_fr}
                        </td>
                        <td className="px-5 py-2.5 text-center">
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => handleEditProduct(p)}
                              className="p-1.5 text-gray-400 hover:text-teal-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-5 py-8 text-center text-gray-400">No database products found. Run SQL seeds in Supabase.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 2: HERO BANNERS MANAGER ── */}
        {activeTab === 'banners' && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Form Column */}
            <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl shadow-sm lg:col-span-1">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600" />
                {bannerId ? "Edit Slide" : "Add Banner Slide"}
              </h2>

              <form onSubmit={handleBannerSubmit} className="space-y-3.5 text-left">
                {/* Titles */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Banner Title (Optional)</label>
                  <input
                    type="text"
                    placeholder="العربية: العنوان الرئيسي"
                    value={bannerTitleAr}
                    onChange={(e) => setBannerTitleAr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none text-right"
                    dir="rtl"
                  />
                  <input
                    type="text"
                    placeholder="Français: Titre"
                    value={bannerTitleFr}
                    onChange={(e) => setBannerTitleFr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="English: Title"
                    value={bannerTitleEn}
                    onChange={(e) => setBannerTitleEn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                {/* Subtitles */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Banner Subtitle (Optional)</label>
                  <input
                    type="text"
                    placeholder="العربية: العنوان الفرعي"
                    value={bannerSubtitleAr}
                    onChange={(e) => setBannerSubtitleAr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none text-right"
                    dir="rtl"
                  />
                  <input
                    type="text"
                    placeholder="Français: Sous-titre"
                    value={bannerSubtitleFr}
                    onChange={(e) => setBannerSubtitleFr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="English: Subtitle"
                    value={bannerSubtitleEn}
                    onChange={(e) => setBannerSubtitleEn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                {/* Display order */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    required
                    placeholder="0"
                    value={bannerDisplayOrder}
                    onChange={(e) => setBannerDisplayOrder(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                {/* Banner Image URL / Upload */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter banner image URL"
                    value={bannerImageUrl}
                    onChange={(e) => setBannerImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none mb-1.5"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">Or Upload:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBannerFile(e.target.files[0] || null)}
                      className="text-xs text-gray-500"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Banner
                  </button>
                  {bannerId && (
                    <button
                      type="button"
                      onClick={resetBannerForm}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Banner List Column */}
            <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm lg:col-span-2 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Hero Slide Banners ({banners.length})</h2>
                <button onClick={reloadData} className="text-gray-400 hover:text-teal-600 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[620px] overflow-y-auto no-scrollbar">
                {banners.map(b => (
                  <div key={b.id} className="relative rounded-xl overflow-hidden border border-gray-250 dark:border-gray-800 shadow-sm group">
                    <img src={b.image_url} alt="Slide Preview" className="w-full h-36 object-cover" />
                    <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
                      <h4 className="font-bold text-sm truncate">{b.title_fr || "No Title (FR)"}</h4>
                      <p className="text-[10px] text-white/80 truncate mt-0.5">{b.subtitle_fr || "No Subtitle"}</p>
                      <span className="absolute top-2.5 left-2.5 bg-black/50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Order: {b.display_order}
                      </span>

                      {/* Hover action block */}
                      <div className="absolute top-2 right-2 flex gap-1 bg-black/30 backdrop-blur-sm p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditBanner(b)}
                          className="p-1 text-white hover:text-teal-400 transition-colors"
                          title="Edit Banner"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(b.id)}
                          className="p-1 text-white hover:text-red-400 transition-colors"
                          title="Delete Banner"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {banners.length === 0 && (
                  <div className="col-span-2 py-10 text-center text-gray-400 text-xs">No database banner slides found. Set up SQL tables in Supabase.</div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 3: TEXT SETTINGS MANAGER ── */}
        {activeTab === 'settings' && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Form Column */}
            <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl shadow-sm lg:col-span-1 text-left">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600" />
                Add/Edit Website Title
              </h2>

              <form onSubmit={handleSettingSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Setting Key</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. hero.sub"
                    value={settingKey}
                    onChange={(e) => setSettingKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    Standard Keys: `hero.sub` (Hero Subtitle), `contact.phone` (Phone Number), `footer.tagline` (Footer Slogan).
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Custom Value</label>
                  <input
                    type="text"
                    required
                    placeholder="Arabic Translation (العربية)"
                    value={settingValAr}
                    onChange={(e) => setSettingValAr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none text-right"
                    dir="rtl"
                  />
                  <input
                    type="text"
                    required
                    placeholder="French Translation (Français)"
                    value={settingValFr}
                    onChange={(e) => setSettingValFr(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="English Translation (English)"
                    value={settingValEn}
                    onChange={(e) => setSettingValEn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Setting Key
                </button>
              </form>
            </div>

            {/* List Column */}
            <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm lg:col-span-2 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Custom Settings Overrides ({customSettings.length})</h2>
                <button onClick={reloadData} className="text-gray-400 hover:text-teal-600 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto max-h-[620px] no-scrollbar">
                <table className="w-full text-left border-collapse border-b">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-950 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100 dark:border-gray-800 font-bold">
                      <th className="px-5 py-3.5">Setting Key</th>
                      <th className="px-5 py-3.5">Arabic</th>
                      <th className="px-5 py-3.5">French</th>
                      <th className="px-5 py-3.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                    {customSettings.map(s => (
                      <tr key={s.key} className="hover:bg-gray-50/50 dark:hover:bg-gray-950/20 text-gray-700 dark:text-gray-300">
                        <td className="px-5 py-3.5 font-bold text-gray-800 dark:text-gray-100">{s.key}</td>
                        <td className="px-5 py-3.5 text-right font-medium" dir="rtl">{s.value_ar}</td>
                        <td className="px-5 py-3.5 truncate max-w-[150px]">{s.value_fr}</td>
                        <td className="px-5 py-3.5 text-center">
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => handleEditSetting(s)}
                              className="p-1.5 text-gray-400 hover:text-teal-600 rounded-lg"
                              title="Edit Setting"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSetting(s.key)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                              title="Delete Setting"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {customSettings.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-5 py-8 text-center text-gray-400">No settings overrides found in database. The site will use local defaults.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 4: SEEDING & RECOVERY ── */}
        {activeTab === 'recovery' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-8 rounded-2xl shadow-sm text-left max-w-2xl">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
              Database Seeding & Setup Recovery
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
              Use these tools to populate your blank Supabase database with the default website content. This allows the administrator to edit every default product, slide, and title in isolation instead of loading local mock code.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">Seed Default Products Catalog</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Inserts the 13 standard bookstore products (desk, chairs, SBC pens, college notebooks) into the database.</p>
                </div>
                <button
                  onClick={seedDefaultProducts}
                  disabled={loading}
                  className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
                >
                  Seed Products
                </button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-955 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">Seed Default Hero Banners</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Inserts the 6 default slide pictures (ad1, ad2, ad5, ad6, ad7, ad8) into the banners database.</p>
                </div>
                <button
                  onClick={seedDefaultBanners}
                  disabled={loading}
                  className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
                >
                  Seed Banners
                </button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-955 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">Seed Default Section Titles</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Seeds layout content (about text, gallery links, contact information, operational hours) into settings overrides.</p>
                </div>
                <button
                  onClick={seedDefaultSettings}
                  disabled={loading}
                  className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
                >
                  Seed Layout Data
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
