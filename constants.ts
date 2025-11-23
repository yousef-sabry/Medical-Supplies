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
      rights: '© 2024 الأندلس للمستلزمات الطبية. جميع الحقوق محفوظة.',
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
    image: './assets/category1.jpg',
  },
  {
    id: '2',
    name: { en: 'Blood glucose meters and strips', ar: 'أجهزة وشرايط سكر' },
    icon: 'stethoscope',
    image: './assets/category2.jpg',
  },
  {
    id: '3',
    name: { en: 'Hospital Furniture', ar: 'أثاث المستشفيات' },
    icon: 'bed',
    image: 'https://picsum.photos/id/3/400/300',
  },
  {
    id: '4',
    name: { en: 'Disposables', ar: 'مستلزمات استهلاكية' },
    icon: 'trash-2',
    image: 'https://picsum.photos/id/4/400/300',
  },
  {
    id: '5',
    name: { en: 'Lab Equipment', ar: 'معدات معملية' },
    icon: 'flask',
    image: 'https://picsum.photos/id/5/400/300',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '101',
    name: { en: 'Digital Stethoscope', ar: 'سماعة طبية رقمية' },
    category: 'Diagnostic',
    price: 150.00,
    rating: 4.8,
    image: 'https://picsum.photos/id/201/300/300',
    description: { en: 'High precision digital stethoscope for professionals.', ar: 'سماعة طبية رقمية عالية الدقة للمحترفين.' }
  },
  {
    id: '102',
    name: { en: 'Surgical Kit Pro', ar: 'طقم جراحي احترافي' },
    category: 'Surgical',
    price: 320.50,
    rating: 4.9,
    image: 'https://picsum.photos/id/202/300/300',
    description: { en: 'Complete stainless steel surgical instrument set.', ar: 'طقم أدوات جراحية كامل من الفولاذ المقاوم للصدأ.' }
  },
  {
    id: '103',
    name: { en: 'Medical Face Masks', ar: 'كمامات طبية' },
    category: 'Disposables',
    price: 15.00,
    rating: 4.5,
    image: 'https://picsum.photos/id/203/300/300',
    description: { en: 'Box of 50 3-ply medical grade face masks.', ar: 'علبة 50 كمامة طبية ثلاثية الطبقات.' }
  },
  {
    id: '104',
    name: { en: 'Electric Hospital Bed', ar: 'سرير مستشفى كهربائي' },
    category: 'Furniture',
    price: 1200.00,
    rating: 5.0,
    image: 'https://picsum.photos/id/204/300/300',
    description: { en: 'Fully adjustable electric bed with remote control.', ar: 'سرير كهربائي قابل للتعديل بالكامل مع جهاز تحكم عن بعد.' }
  },
];