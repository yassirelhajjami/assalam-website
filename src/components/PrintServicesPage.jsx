import { useState } from 'react';
import { Printer, FileText, Upload, ChevronRight, Calculator, FileCheck, Check } from 'lucide-react';

export default function PrintServicesPage({ lang, setPage, translations }) {
  const [file, setFile] = useState(null);
  const [numCopies, setNumCopies] = useState(1);
  const [colorMode, setColorMode] = useState('bw'); // bw or color
  const [paperSize, setPaperSize] = useState('a4'); // a4 or a3
  const [binding, setBinding] = useState(false);
  const [doubleSided, setDoubleSided] = useState(true);

  const t = {
    ar: {
      title: 'خدمات الطباعة والتصوير',
      subtitle: 'اطبع مستنداتك، بحوثك المدرسية وبطاقاتك بجودة عالية وبأفضل الأسعار.',
      priceList: 'قائمة الأسعار',
      calculator: 'حاسبة التكلفة التقريبية',
      serviceName: 'الخدمة',
      price: 'السعر',
      bwPrint: 'طباعة أسود وأبيض (A4)',
      colorPrint: 'طباعة ملونة (A4)',
      copy: 'نسخ أوراق / فوتوكوبي',
      bind: 'تجليد الكتب وسلك سبيغال',
      scan: 'سكانر ورقمنة الملفات',
      orderForm: 'طلب طباعة سريع عبر الواتساب',
      uploadLabel: 'اختر الملف (PDF، Word، صور)',
      copies: 'عدد النسخ',
      color: 'نوع الطباعة',
      size: 'حجم الورق',
      bindingOpt: 'إضافة تجليد (سلك بلاستيكي)',
      doubleSidedOpt: 'طباعة على الوجهين',
      submitBtn: 'أرسل الطلب والملف عبر الواتساب',
      calcTotal: 'التكلفة الإجمالية التقديرية',
      goBack: 'العودة للرئيسية',
      details: 'تفاصيل الطباعة'
    },
    fr: {
      title: 'Services d\'Impression & Copie',
      subtitle: 'Imprimez vos documents, rapports scolaires et dossiers professionnels avec une qualité premium.',
      priceList: 'Tarifs des Prestations',
      calculator: 'Simulateur de Tarifs',
      serviceName: 'Prestation',
      price: 'Tarif',
      bwPrint: 'Impression Noir & Blanc (A4)',
      colorPrint: 'Impression Couleur (A4)',
      copy: 'Photocopie de documents',
      bind: 'Reliure spirale / Dossiers',
      scan: 'Numérisation & Scanner',
      orderForm: 'Envoyer un fichier pour impression',
      uploadLabel: 'Choisir le fichier (PDF, Word, Image)',
      copies: 'Nombre de copies',
      color: 'Type d\'impression',
      size: 'Format papier',
      bindingOpt: 'Ajouter une reliure',
      doubleSidedOpt: 'Impression Recto-Verso',
      submitBtn: 'Envoyer la commande via WhatsApp',
      calcTotal: 'Estimation tarifaire totale',
      goBack: 'Retour à l\'accueil',
      details: 'Détails de l\'impression'
    },
    en: {
      title: 'Printing & Copying Services',
      subtitle: 'Print your school reports, business documents, and forms in high-quality and great prices.',
      priceList: 'Services & Pricing',
      calculator: 'Price Estimator',
      serviceName: 'Service',
      price: 'Price',
      bwPrint: 'Black & White Printing (A4)',
      colorPrint: 'Color Printing (A4)',
      copy: 'Photocopy / Duplicating',
      bind: 'Book Binding & Spiral',
      scan: 'Scanning & Document Digitizing',
      orderForm: 'Send Print Job via WhatsApp',
      uploadLabel: 'Choose file (PDF, Word, Image)',
      copies: 'Number of copies',
      color: 'Color Options',
      size: 'Paper Size',
      bindingOpt: 'Add binder cover/spiral',
      doubleSidedOpt: 'Double-sided printing',
      submitBtn: 'Submit Order via WhatsApp',
      calcTotal: 'Estimated Total Cost',
      goBack: 'Back to Home',
      details: 'Printing details'
    }
  }[lang] || { ar: {} };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Cost calculator
  const unitPrice = colorMode === 'color' ? 2.00 : 0.50;
  const sizeMultiplier = paperSize === 'a3' ? 2 : 1;
  const bindingCost = binding ? 10.00 : 0.00;
  const estimatedCost = (unitPrice * sizeMultiplier * numCopies) + bindingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = "212699165490";
    const bindingText = binding ? (lang === 'ar' ? 'نعم' : 'Oui') : (lang === 'ar' ? 'لا' : 'Non');
    const sideText = doubleSided ? (lang === 'ar' ? 'على الوجهين (Recto-Verso)' : 'Recto-Verso') : (lang === 'ar' ? 'وجه واحد' : 'Recto uniquement');
    const colorText = colorMode === 'color' ? (lang === 'ar' ? 'ملون (Couleur)' : 'Couleur') : (lang === 'ar' ? 'أسود وأبيض' : 'Noir & Blanc');
    
    let text = "";
    if (lang === 'ar') {
      text = `السلام عليكم، أريد طلب طباعة مستند:\n`;
      text += `- الملف: ${file ? file.name : 'مستند خارجي'}\n`;
      text += `- اللون: ${colorText}\n`;
      text += `- عدد النسخ: ${numCopies}\n`;
      text += `- حجم الورق: ${paperSize.toUpperCase()}\n`;
      text += `- طريقة الطباعة: ${sideText}\n`;
      text += `- إضافة تجليد: ${bindingText}\n`;
      text += `- التكلفة التقديرية: ${estimatedCost.toFixed(2)} درهم`;
    } else {
      text = `Bonjour, je souhaite commander une impression de document :\n`;
      text += `- Fichier : ${file ? file.name : 'Document externe'}\n`;
      text += `- Couleur : ${colorText}\n`;
      text += `- Copies : ${numCopies}\n`;
      text += `- Format : ${paperSize.toUpperCase()}\n`;
      text += `- Mode : ${sideText}\n`;
      text += `- Reliure : ${bindingText}\n`;
      text += `- Tarif Estimé : ${estimatedCost.toFixed(2)} DH`;
    }

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <button onClick={() => setPage('home')} className="hover:text-teal-600 transition-colors">
            {t.goBack}
          </button>
          <ChevronRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          <span className="font-bold text-gray-600 dark:text-gray-300">{t.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-teal-800 to-emerald-950 text-white rounded-3xl p-8 md:p-12 shadow-xl mb-10 text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-teal-700/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Printer className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">{t.title}</h1>
            <p className="text-teal-100 text-sm md:text-base leading-relaxed">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          
          {/* Column 1: Pricing list */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm text-start">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-600" />
              {t.priceList}
            </h2>

            <div className="space-y-4">
              {[
                { name: t.bwPrint, price: '0.50 DH' },
                { name: t.colorPrint, price: '2.00 DH' },
                { name: t.copy, price: '0.50 DH' },
                { name: t.bind, price: '10.00 DH' },
                { name: t.scan, price: '2.00 DH' }
              ].map((service, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{service.name}</span>
                  <span className="text-sm font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full">{service.price}</span>
                </div>
              ))}
            </div>

            {/* Simulated Calculator Preview */}
            <div className="mt-8 p-5 bg-teal-50/50 dark:bg-teal-950/10 border border-teal-100/40 dark:border-teal-900/40 rounded-2xl">
              <h3 className="font-bold text-sm text-gray-850 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Calculator className="w-4.5 h-4.5 text-teal-600" />
                {t.calculator}
              </h3>
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{t.copies} ({numCopies})</span>
                  <span>x {unitPrice.toFixed(2)} DH</span>
                </div>
                {binding && (
                  <div className="flex justify-between">
                    <span>{t.bindingOpt}</span>
                    <span>+10.00 DH</span>
                  </div>
                )}
                <div className="h-px bg-teal-200/40 dark:bg-teal-800/40 my-3" />
                <div className="flex justify-between items-center text-sm font-bold text-gray-800 dark:text-gray-100">
                  <span>{t.calcTotal}</span>
                  <span className="text-teal-750 dark:text-teal-400 text-base">{estimatedCost.toFixed(2)} DH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Printing upload form */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm text-start">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-teal-600" />
              {t.orderForm}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* File Upload Button */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.uploadLabel}</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center hover:border-teal-500 hover:bg-gray-50 dark:hover:bg-gray-950/20 transition-all cursor-pointer relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-gray-400" />
                    {file ? (
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 truncate max-w-[250px]">{file.name}</span>
                    ) : (
                      <span className="text-xs text-gray-400">{lang === 'ar' ? 'انقر أو اسحب ملفك هنا' : 'Click or drag your file here'}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Input params */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.copies}</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={numCopies}
                    onChange={(e) => setNumCopies(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.color}</label>
                  <select
                    value={colorMode}
                    onChange={(e) => setColorMode(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-955 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  >
                    <option value="bw">{lang === 'ar' ? 'أسود وأبيض' : 'Noir & Blanc'}</option>
                    <option value="color">{lang === 'ar' ? 'ملون' : 'Couleur'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.size}</label>
                  <select
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-955 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none"
                  >
                    <option value="a4">A4</option>
                    <option value="a3">A3</option>
                  </select>
                </div>
                
                {/* Double sided */}
                <div className="flex flex-col justify-end pb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={doubleSided}
                      onChange={(e) => setDoubleSided(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{t.doubleSidedOpt}</span>
                  </label>
                </div>
              </div>

              {/* Binding option */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={binding}
                    onChange={(e) => setBinding(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{t.bindingOpt} (+10.00 DH)</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                {t.submitBtn}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
