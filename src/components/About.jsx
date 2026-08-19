import { CheckCircle } from 'lucide-react';
import { translations } from '../data/translations';
import pic2 from '../../pic2.jpeg';

export default function About({ lang }) {
  const t = translations[lang].about;

  const stats = [
    { value: t.stat1?.number || '10+', label: t.stat1?.label || '' },
    { value: t.stat2?.number || '4.7★', label: t.stat2?.label || '' },
    { value: t.stat3?.number || '67', label: t.stat3?.label || '' },
  ];

  const features = [t.feature1, t.feature2, t.feature3, t.feature4].filter(Boolean);

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section heading */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gray-100 dark:bg-gray-850" />
          <h2 className="section-title whitespace-nowrap">
            {lang === 'ar' ? 'من نحن' : lang === 'fr' ? 'À propos' : 'About Us'}
          </h2>
          <div className="h-px flex-1 bg-gray-100 dark:bg-gray-850" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image with stats overlay */}
          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
            <img
              src={pic2}
              alt="Librairie Assalam"
              className="w-full h-80 lg:h-[420px] object-cover"
            />
            {/* Stats overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map(({ value, label }) => (
                  <div key={value}>
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-xs text-white/75 mt-0.5 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-snug">
              {t.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 text-sm">
              {t.description}
            </p>
            {t.description2 && (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                {t.description2}
              </p>
            )}

            {/* Feature checklist */}
            <div className="space-y-3 mt-4">
              {features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* Stats row (desktop dupe below text) */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/80">
              {stats.map(({ value, label }) => (
                <div key={value} className="text-center">
                  <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
