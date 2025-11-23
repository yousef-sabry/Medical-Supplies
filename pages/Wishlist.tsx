import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useWishlist } from '../components/WishlistContext';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Heart, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { t, language, dir } = useLanguage();
  const { wishlistItems, clearWishlist } = useWishlist();

  // Filter products that are in the wishlist
  const wishlistedProducts = PRODUCTS.filter(p => wishlistItems.includes(p.id));

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  if (wishlistedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-300">
              <Heart size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.wishlist.empty}</h2>
            <p className="text-gray-500 mb-8">{t.hero.subtitle}</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-medical-600 text-white rounded-xl font-bold hover:bg-medical-700 transition-all shadow-lg hover:shadow-xl"
            >
              {dir === 'rtl' && <ArrowIcon size={20} />}
              {t.wishlist.continueShopping}
              {dir === 'ltr' && <ArrowIcon size={20} />}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.wishlist.title}</h1>
            <p className="text-gray-500">{wishlistItems.length} {t.wishlist.items}</p>
          </div>
          
          <button 
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 bg-white text-red-500 border border-red-100 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all text-sm font-semibold"
          >
            <Trash2 size={16} />
            {t.wishlist.clear}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;