import React from 'react';
import { Product } from '../types';
import { useLanguage } from './LanguageContext';
import { useWishlist } from './WishlistContext';
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t, dir } = useLanguage();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isRtl = dir === 'rtl';
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
      {/* Badge & Wishlist */}
      <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20 flex flex-col gap-2`}>
         <span className="bg-medical-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
           New
         </span>
         {product.price > 100 && (
            <span className="bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              Premium
            </span>
         )}
      </div>
      
      <button 
        onClick={toggleWishlist}
        className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-20 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm transition-all duration-300
          ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'}
        `}
      >
        <Heart 
          size={20} 
          fill={isWishlisted ? "currentColor" : "none"} 
          className={`transform transition-transform ${isWishlisted ? 'scale-110' : 'group-hover:scale-110'}`} 
        />
      </button>

      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <img 
          src={product.image} 
          alt={product.name[language]} 
          className="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <Link to={`/products`} className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-xl hover:bg-medical-50">
                <Eye size={18} />
                <span>{language === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
            </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-medical-600 uppercase tracking-wider bg-medical-50 px-2 py-1 rounded-md">
                {product.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="text-xs font-bold text-gray-500 mt-0.5">{product.rating}</span>
            </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-medical-600 transition-colors">
            <Link to={`/products`}>
                {product.name[language]}
            </Link>
        </h3>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
            {product.description[language]}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-medium line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            
            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-medical-600 transition-colors shadow-lg shadow-gray-200 hover:shadow-medical-200 group/btn">
                <ShoppingCart size={20} className="transform group-hover/btn:-translate-y-0.5 transition-transform" />
                <span>{t.products.addToCart}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;