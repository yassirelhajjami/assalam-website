import { BookOpen, Pencil, Printer, Briefcase, FileText, Calculator, Package, Palette } from 'lucide-react';

const getCategories = (lang) => {
  const ar = [
    { icon: BookOpen,   bg: '#e6f4f1', color: '#1d7063', label: 'كتب ومناهج',         key: 'livres' },
    { icon: Pencil,     bg: '#fef9ec', color: '#C8A84B', label: 'أدوات مدرسية',        key: 'papeterie' },
    { icon: Printer,    bg: '#f0f4fe', color: '#4060c0', label: 'طباعة وتصوير',        key: 'print' },
    { icon: Briefcase,  bg: '#fdf0f5', color: '#b0305a', label: 'أثاث مكتبي',          key: 'bureau' },
    { icon: FileText,   bg: '#f0faf4', color: '#206040', label: 'خدمات إدارية',        key: 'admin' },
    { icon: Calculator, bg: '#f4f0fe', color: '#6030b0', label: 'لوازم الكومبيوتر',   key: 'tech' },
    { icon: Package,    bg: '#fff4e6', color: '#b06020', label: 'تغليف وتعبئة',        key: 'packing' },
    { icon: Palette,    bg: '#fef0ee', color: '#b04030', label: 'أدوات الرسم',         key: 'art' },
  ];
  const fr = [
    { icon: BookOpen,   bg: '#e6f4f1', color: '#1d7063', label: 'Livres & Manuels',    key: 'livres' },
    { icon: Pencil,     bg: '#fef9ec', color: '#C8A84B', label: 'Fournitures',          key: 'papeterie' },
    { icon: Printer,    bg: '#f0f4fe', color: '#4060c0', label: 'Impression',           key: 'print' },
    { icon: Briefcase,  bg: '#fdf0f5', color: '#b0305a', label: 'Mobilier Bureau',      key: 'bureau' },
    { icon: FileText,   bg: '#f0faf4', color: '#206040', label: 'Services Admin',       key: 'admin' },
    { icon: Calculator, bg: '#f4f0fe', color: '#6030b0', label: 'Informatique',         key: 'tech' },
    { icon: Package,    bg: '#fff4e6', color: '#b06020', label: 'Emballage',            key: 'packing' },
    { icon: Palette,    bg: '#fef0ee', color: '#b04030', label: 'Dessin & Art',         key: 'art' },
  ];
  const en = [
    { icon: BookOpen,   bg: '#e6f4f1', color: '#1d7063', label: 'Books',              key: 'livres' },
    { icon: Pencil,     bg: '#fef9ec', color: '#C8A84B', label: 'Stationery',         key: 'papeterie' },
    { icon: Printer,    bg: '#f0f4fe', color: '#4060c0', label: 'Printing',           key: 'print' },
    { icon: Briefcase,  bg: '#fdf0f5', color: '#b0305a', label: 'Furniture',          key: 'bureau' },
    { icon: FileText,   bg: '#f0faf4', color: '#206040', label: 'Admin Services',     key: 'admin' },
    { icon: Calculator, bg: '#f4f0fe', color: '#6030b0', label: 'Computer Supplies',  key: 'tech' },
    { icon: Package,    bg: '#fff4e6', color: '#b06020', label: 'Packaging',          key: 'packing' },
    { icon: Palette,    bg: '#fef0ee', color: '#b04030', label: 'Art & Drawing',      key: 'art' },
  ];
  return { ar, fr, en }[lang] || ar;
};

export default function CategoryIcons({ lang, onCategoryClick }) {
  const categories = getCategories(lang);
  const headings = { ar: 'أهم التصنيفات', fr: 'Catégories Principales', en: 'Top Categories' };

  return (
    <section className="bg-white dark:bg-gray-950 py-6 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{headings[lang]}</h2>
          <div className="h-px flex-1 mx-4 bg-gradient-to-l from-gray-200 dark:from-gray-800 to-transparent" />
        </div>

        {/* Horizontally scrollable icons */}
        <div className="relative">
          {/* Hide scrollbar but keep scroll */}
          <div
            className="flex gap-6 overflow-x-auto pb-1 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map(({ icon: Icon, bg, color, label, key }) => (
              <button
                key={key}
                id={`cat-${key}`}
                onClick={() => onCategoryClick(key)}
                className="flex flex-col items-center gap-2 min-w-max group cursor-pointer"
              >
                {/* Circle icon */}
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: bg,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color }} strokeWidth={1.5} />
                </div>
                {/* Label */}
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors text-center max-w-[72px] leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
