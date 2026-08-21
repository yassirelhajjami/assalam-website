import { useState } from 'react';
import { FileText, FileSpreadsheet, Globe, ChevronRight, HelpCircle, PhoneCall, Check } from 'lucide-react';

export default function AdminServicesPage({ lang, setPage }) {
  const [requestType, setRequestType] = useState('request');
  const [details, setDetails] = useState('');

  const t = {
    ar: {
      title: 'الخدمات الإدارية والكاتب العمومي',
      subtitle: 'نساعدكم في كتابة الطلبات الإدارية، حجز المواعيد الإلكترونية، والمراسلات الرسمية باحترافية.',
      goBack: 'العودة للرئيسية',
      serviceGrid: 'باقة خدماتنا الإدارية',
      requestForm: 'صياغة طلب إداري أو استفسار',
      formType: 'نوع الخدمة المطلوبة',
      formDesc: 'اكتب تفاصيل طلبك باختصار',
      formDescPlaceholder: 'مثلا: أريد كتابة طلب خطي لوالي الجهة من أجل الحصول على رخصة...',
      submitBtn: 'تواصل مع الكاتب العمومي عبر الواتساب',
      services: [
        {
          title: 'كتابة الطلبات والشكايات',
          desc: 'صياغة احترافية للطلبات الخطية، الشكايات، والمراسلات الموجهة للإدارات العمومية والخاصة باللغتين العربية والفرنسية.',
          icon: FileText,
          color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/10'
        },
        {
          title: 'حجز المواعيد الإلكترونية',
          desc: 'مساعدتكم في أخذ مواعيد جواز السفر، التأشيرات (Visa)، مواعيد الوكالة الوطنية للمحافظة العقارية، التضامن الاجتماعي (CNSS) وغيرها.',
          icon: FileSpreadsheet,
          color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/10'
        },
        {
          title: 'التسجيل في البوابات الرقمية',
          desc: 'تسجيل الطلاب في الجامعات والمدارس الوطنية، التسجيل في بوابات التشغيل (ANAPEC)، السجل الاجتماعي الموحد، وتعبئة الملفات الرقمية.',
          icon: Globe,
          color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10'
        }
      ]
    },
    fr: {
      title: 'Rédacteur Public & Services Administratifs',
      subtitle: 'Nous vous accompagnons dans la rédaction de vos demandes administratives et la prise de rendez-vous en ligne.',
      goBack: 'Retour à l\'accueil',
      serviceGrid: 'Nos Prestations Administratives',
      requestForm: 'Formuler une demande administrative',
      formType: 'Type de service',
      formDesc: 'Décrivez brièvement votre besoin',
      formDescPlaceholder: 'Exemple : Je souhaite rédiger une lettre de demande d\'autorisation de commerce pour la préfecture...',
      submitBtn: 'Contacter le rédacteur public via WhatsApp',
      services: [
        {
          title: 'Rédaction de demandes et plaintes',
          desc: 'Rédaction professionnelle de lettres administratives, recours et plaintes en arabe et en français pour tous les organismes.',
          icon: FileText,
          color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/10'
        },
        {
          title: 'Prise de rendez-vous en ligne',
          desc: 'Assistance pour vos rendez-vous de passeport, visas, conservation foncière, CNSS, AMO et autres services publics.',
          icon: FileSpreadsheet,
          color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/10'
        },
        {
          title: 'Inscription aux portails numériques',
          desc: 'Inscriptions scolaires, concours nationaux, portails de l\'emploi (ANAPEC), Registre Social Unique (RSU) et formulaires en ligne.',
          icon: Globe,
          color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10'
        }
      ]
    },
    en: {
      title: 'Administrative Services & Public Writer',
      subtitle: 'We assist you in drafting administrative letters, official requests, and booking online appointments.',
      goBack: 'Back to Home',
      serviceGrid: 'Our Administrative Packages',
      requestForm: 'Submit Administrative Inquiry',
      formType: 'Service Type',
      formDesc: 'Briefly describe your request details',
      formDescPlaceholder: 'Example: I need to write a request letter to the local municipality for a license...',
      submitBtn: 'Contact Public Writer via WhatsApp',
      services: [
        {
          title: 'Letter & Complaint Drafting',
          desc: 'Professional drafting of letters, official complaints, and correspondence in Arabic and French for public and private sectors.',
          icon: FileText,
          color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/10'
        },
        {
          title: 'Online Appointment Booking',
          desc: 'Assistance in booking passport appointments, visas, land registry appointments, CNSS, and other public administrative portals.',
          icon: FileSpreadsheet,
          color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/10'
        },
        {
          title: 'Digital Portal Registration',
          desc: 'Registration for universities, national exams, recruitment portals (ANAPEC), Unified Social Register, and online forms.',
          icon: Globe,
          color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10'
        }
      ]
    }
  }[lang] || { ar: {} };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = "212699165490";
    const typeLabel = requestType === 'request' 
      ? (lang === 'ar' ? 'كتابة طلب خطي/شكاية' : 'Rédaction de demande') 
      : requestType === 'appointment' 
        ? (lang === 'ar' ? 'حجز موعد إلكتروني' : 'Prise de rendez-vous') 
        : (lang === 'ar' ? 'تسجيل في بوابة رقمية' : 'Inscription en ligne');

    let text = "";
    if (lang === 'ar') {
      text = `السلام عليكم، أريد الاستعانة بخدمات الكاتب العمومي:\n`;
      text += `- نوع الخدمة: ${typeLabel}\n`;
      text += `- تفاصيل الطلب: ${details || 'مذكورة في المحادثة'}`;
    } else {
      text = `Bonjour, je souhaite solliciter les services du rédacteur public :\n`;
      text += `- Type de service : ${typeLabel}\n`;
      text += `- Détails de la demande : ${details || 'Explicités par message'}`;
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
        <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl mb-10 text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-700/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <FileText className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">{t.title}</h1>
            <p className="text-indigo-100 text-sm md:text-base leading-relaxed">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          
          {/* Left Columns: Services list */}
          <div className="lg:col-span-2 space-y-6 text-start">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              {t.serviceGrid}
            </h2>

            <div className="grid sm:grid-cols-1 gap-4">
              {t.services.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                    <div className={`p-3.5 rounded-xl shrink-0 ${service.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-800 dark:text-gray-250 mb-2">{service.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Custom Inquiry Form */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm text-start">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-indigo-600" />
              {t.requestForm}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.formType}</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl text-sm focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition-colors"
                >
                  <option value="request">{lang === 'ar' ? 'كتابة طلب خطي / شكاية' : 'Lettre administrative / Plainte'}</option>
                  <option value="appointment">{lang === 'ar' ? 'حجز موعد إلكتروني' : 'Prise de rendez-vous'}</option>
                  <option value="portal">{lang === 'ar' ? 'تسجيل في بوابة رقمية' : 'Inscription en ligne / ANAPEC'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.formDesc}</label>
                <textarea
                  required
                  rows="4"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={t.formDescPlaceholder}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {t.submitBtn}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
