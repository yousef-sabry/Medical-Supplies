import React, { useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { CATEGORIES } from '../constants';
import { ChevronRight, ChevronLeft, Activity, Stethoscope, Bed, Trash2, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: any = {
  'activity': Activity,
  'stethoscope': Stethoscope,
  'bed': Bed,
  'trash-2': Trash2,
  'flask': FlaskConical
};

const CategorySection = () => {
  const { t, language, dir } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const ChevronNext = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const ChevronPrev = dir === 'rtl' ? ChevronRight : ChevronLeft;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.categories.title}</h2>
            <div className="h-1 w-20 bg-medical-500 rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll(dir === 'rtl' ? 300 : -300)}
              className="p-2 rounded-full border border-gray-200 hover:bg-medical-50 hover:text-medical-600 transition-colors"
            >
              <ChevronPrev size={24} />
            </button>
            <button 
              onClick={() => scroll(dir === 'rtl' ? -300 : 300)}
              className="p-2 rounded-full bg-medical-600 text-white hover:bg-medical-700 transition-colors shadow-lg"
            >
              <ChevronNext size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon] || Activity;
            return (
              <Link 
                to={`/products?category=${category.id}`} 
                key={category.id}
                className="min-w-[280px] snap-start group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[4/5] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={category.image} 
                    alt={category.name[language]} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white group-hover:bg-medical-500 group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold text-white mb-1">{category.name[language]}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100 flex items-center gap-1">
                      {t.categories.viewAll} <ChevronNext size={14} />
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;