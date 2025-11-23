import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { useLanguage } from '../components/LanguageContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Hero />
      <CategorySection />
      
      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-medical-600 font-bold tracking-wider uppercase text-sm">Top Quality</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{t.products.title}</h2>
            <div className="h-1 w-24 bg-medical-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
                to="/products" 
                className="inline-block px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-medical-50 hover:border-medical-300 hover:text-medical-700 transition-all"
            >
                {t.categories.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="py-16 bg-medical-700 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <h2 className="text-3xl font-bold mb-6">
                 {t.hero.title}
             </h2>
             <p className="text-medical-100 max-w-2xl mx-auto mb-8 text-lg">
                 {t.about.mission}
             </p>
             <Link to="/contact" className="px-8 py-3 bg-white text-medical-800 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all">
                {t.nav.contact}
             </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;