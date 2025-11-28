import { Translations, Language, Category, Product } from './types';

export const TRANSLATIONS: Record<Language, Translations> = {
  [Language.EN]: {
    nav: {
      home: 'Home',
      products: 'Products',
      categories: 'Categories',
      about: 'About Us',
      contact: 'Contact',
      login: 'Login / Register',
    },
    hero: {
      title: 'Advanced Medical Solutions for a Better Life',
      subtitle: 'Al-Andalus Medical provides premium healthcare equipment and supplies trusted by professionals.',
      cta: 'Explore Products',
      secondaryCta: 'Our Services',
    },
    categories: {
      title: 'Browse by Category',
      viewAll: 'View All Categories',
    },
    products: {
      title: 'Featured Products',
      addToCart: 'Add to Cart',
      price: 'Price',
    },
    about: {
      title: 'About Al-Andalus',
      mission: 'Our Mission: To provide top-tier medical supplies ensuring safety and reliability.',
      vision: 'Our Vision: To be the leading medical distributor in the region.',
    },
    footer: {
      rights: '© 2024 Al-Andalus Medical. All rights reserved.',
      contactUs: 'Contact Us',
      quickLinks: 'Quick Links',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      items: 'items',
      quantity: 'Quantity',
      total: 'Total',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      checkout: 'Proceed to Checkout',
      continueShopping: 'Continue Shopping',
      remove: 'Remove',
      summary: 'Order Summary',
      freeShipping: 'Free',
    },
    wishlist: {
      title: 'My Wishlist',
      empty: 'Your wishlist is empty',
      items: 'saved items',
      continueShopping: 'Explore Products',
      clear: 'Clear Wishlist',
    },
  },
  [Language.AR]: {
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      categories: 'الأقسام',
      about: 'من نحن',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
    },
    hero: {
      title: 'حلول طبية متطورة لحياة أفضل',
      subtitle: 'الأندلس للمستلزمات الطبية توفر معدات ومستلزمات رعاية صحية متميزة يثق بها المحترفون.',
      cta: 'تصفح المنتجات',
      secondaryCta: 'خدماتنا',
    },
    categories: {
      title: 'تصفح حسب القسم',
      viewAll: 'عرض كل الأقسام',
    },
    products: {
      title: 'منتجات مميزة',
      addToCart: 'أضف للسلة',
      price: 'السعر',
    },
    about: {
      title: 'عن الأندلس',
      mission: 'مهمتنا: توفير مستلزمات طبية عالية الجودة لضمان السلامة والموثوقية.',
      vision: 'رؤيتنا: أن نكون الموزع الطبي الرائد في المنطقة.',
    },
    footer: {
      rights: '© 2025 الأندلس للمستلزمات الطبية. جميع الحقوق محفوظة. تم انشاء ذلك الموقع بواسطة يوسف صبري ',
      contactUs: 'اتصل بنا',
      quickLinks: 'روابط سريعة',
    },
    cart: {
      title: 'سلة المشتريات',
      empty: 'سلة المشتريات فارغة',
      items: 'عناصر',
      quantity: 'الكمية',
      total: 'الإجمالي',
      subtotal: 'المجموع الفرعي',
      shipping: 'الشحن',
      checkout: 'إتمام الشراء',
      continueShopping: 'متابعة التسوق',
      remove: 'حذف',
      summary: 'ملخص الطلب',
      freeShipping: 'مجاني',
    },
    wishlist: {
      title: 'قائمة المفضلة',
      empty: 'قائمة المفضلة فارغة',
      items: 'عناصر محفوظة',
      continueShopping: 'تصفح المنتجات',
      clear: 'مسح القائمة',
    },
  },
};

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: { en: 'Respirators', ar: 'أجهزة تنفس' },
    icon: 'activity',
    image: 'category1.jpg',
  },
  {
    id: '2',
    name: { en: 'Blood glucose meters and strips', ar: 'أجهزة وشرايط سكر' },
    icon: 'droplet',
    image: 'category2.jpg',
  },
  {
    id: '3',
    name: { en: 'Pressure devices', ar: 'أجهزة الضغط ' },
    icon: 'heart-pulse',
    image: 'category3.jpg',
  },
  {
    id: '4',
    name: { en: 'Wheelchairs', ar: 'كراسي متحركة' },
    icon: 'wheelchair',
    image: 'category4.jpg',
  },
  {
    id: '5',
    name: { en: 'Lab Equipment', ar: 'معدات معملية' },
    icon: 'flask',
    image: 'category5.jpg',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '101',
    name: { en: 'Digital Stethoscope', ar: 'سماعة طبية رقمية' },
    category: 'Lab Equipment',
    price: 150.00,
    rating: 4.8,
    image: 'product1.jpg',
    description: { en: 'High precision digital stethoscope for professionals.', ar: 'سماعة طبية رقمية عالية الدقة للمحترفين.' }
  },
  {
    id: '102',
    name: { en: 'Digital blood pressure monitor', ar: 'جهاز ضغط رقمي (ديجتال)' },
    category: 'Pressure devices',
    price: 320.50,
    rating: 4.9,
    image: 'product2.jpg',
    description: { en: 'High-accuracy digital blood pressure monitor with easy operation and clear instant readings.', ar: 'جهاز قياس ضغط رقمي عالي الدقة، سهل الاستخدام ويعرض النتائج فورًا بوضوح.' }
  },
  {
    id: '103',
    name: { en: 'Digital ventilator', ar: 'جهاز تنفس رقمي (ديجتال)' },
    category: 'Respirators',
    price: 800.00,
    rating: 4.5,
    image: 'product3.jpg',
    description: { en: 'Portable nebulizer that delivers a fine mist for easier and more effective breathing.', ar: 'جهاز بخاخ تنفس محمول يوفر رذاذًا ناعمًا لتسهيل عملية التنفس بفعالية وسهولة.' }
  },
  {
    id: '104',
    name: { en: 'Sugar requirements', ar: 'شرايط سكر' },
    category: 'Blood glucose meters and strips',
    price: 300.00,
    rating: 5.0,
    image: 'product4.jpg',
    description: { en: 'Accurate and easy-to-use glucose test strips for fast, reliable results.', ar: 'شرائط قياس سكر دقيقة وسهلة الاستخدام لنتائج سريعة وموثوقة' }
  },
];