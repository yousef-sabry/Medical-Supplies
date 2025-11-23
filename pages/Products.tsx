import React, { useState, useMemo, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { useLanguage } from '../components/LanguageContext';
import { Search, SlidersHorizontal, X, ChevronDown, Filter, Star, ArrowUpDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Products = () => {
  const { t, language, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(2000); // Default max price
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derive unique categories from available products
  const uniqueCategories = useMemo(() => {
    return ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name[language].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured (default order)
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy, language]);

  // Animation when list changes
  useGSAP(() => {
    gsap.fromTo(".product-item", 
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: "power2.out", clearProps: "all" }
    );
  }, { scope: containerRef, dependencies: [filteredProducts] });

  // Translation helpers for static UI elements in this page
  const ui = {
    filters: language === 'en' ? 'Filters' : 'تصفية',
    category: language === 'en' ? 'Categories' : 'الأقسام',
    price: language === 'en' ? 'Max Price' : 'أقصى سعر',
    searchPlaceholder: language === 'en' ? 'Search products...' : 'بحث عن منتجات...',
    noResults: language === 'en' ? 'No products found matching your criteria.' : 'لا توجد منتجات تطابق بحثك.',
    showing: language === 'en' ? 'Showing' : 'عرض',
    results: language === 'en' ? 'results' : 'نتائج',
    sort: {
      label: language === 'en' ? 'Sort by' : 'ترتيب حسب',
      featured: language === 'en' ? 'Featured' : 'المميزة',
      priceLow: language === 'en' ? 'Price: Low to High' : 'السعر: الأقل',
      priceHigh: language === 'en' ? 'Price: High to Low' : 'السعر: الأكثر',
      rating: language === 'en' ? 'Top Rated' : 'الأعلى تقييماً',
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20" ref={containerRef}>
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all"
              />
              <Search className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-3.5 text-gray-400 group-focus-within:text-medical-500 transition-colors`} size={20} />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 active:bg-gray-50"
              >
                <Filter size={18} />
                {ui.filters}
              </button>
              
              {/* Sort Dropdown */}
              <div className="relative flex-1 md:w-48">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <ArrowUpDown size={16} className="text-gray-400" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-medical-500 outline-none appearance-none cursor-pointer hover:border-medical-300 transition-colors"
                >
                  <option value="featured">{ui.sort.featured}</option>
                  <option value="price-low">{ui.sort.priceLow}</option>
                  <option value="price-high">{ui.sort.priceHigh}</option>
                  <option value="rating">{ui.sort.rating}</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8">
            {/* Category Filter */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-40">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-medical-500" />
                {ui.category}
              </h3>
              <div className="space-y-2">
                {uniqueCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedCategory === cat ? 'bg-medical-600 border-medical-600' : 'border-gray-300 group-hover:border-medical-400'}`}>
                      {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <input 
                      type="radio" 
                      name="category" 
                      className="hidden" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span className={`text-sm transition-colors ${selectedCategory === cat ? 'font-bold text-medical-700' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {cat === 'All' && language === 'ar' ? 'الكل' : cat}
                    </span>
                  </label>
                ))}
              </div>

              {/* Price Filter (Inside same sticky block if possible or separate) */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">{ui.price}</h3>
                <div className="px-2">
                    <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-medical-600"
                    />
                    <div className="flex justify-between mt-3 text-sm font-medium text-gray-600">
                    <span>$0</span>
                    <span className="text-medical-700 font-bold">${priceRange}</span>
                    </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-500 font-medium">
              {ui.showing} <span className="text-gray-900 font-bold">{filteredProducts.length}</span> {ui.results}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-item h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{language === 'en' ? 'No Matches' : 'لا توجد نتائج'}</h3>
                <p className="text-gray-500">{ui.noResults}</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setPriceRange(2000);}}
                  className="mt-6 text-medical-600 font-semibold hover:underline"
                >
                  {language === 'en' ? 'Clear all filters' : 'مسح كل التصفيات'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{ui.filters}</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">{ui.category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                          selectedCategory === cat 
                          ? 'bg-medical-50 border-medical-500 text-medical-700' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {cat === 'All' && language === 'ar' ? 'الكل' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <h4 className="font-bold text-gray-900 mb-3">{ui.price}</h4>
                   <div className="bg-gray-50 p-4 rounded-xl">
                      <input 
                        type="range" 
                        min="0" 
                        max="2000" 
                        step="50"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-medical-600"
                      />
                      <div className="flex justify-between mt-4 font-bold text-gray-900">
                        <span>$0</span>
                        <span>${priceRange}</span>
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-4 bg-medical-600 text-white rounded-xl font-bold shadow-lg"
                >
                  {language === 'en' ? `Show ${filteredProducts.length} Results` : `عرض ${filteredProducts.length} نتيجة`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;