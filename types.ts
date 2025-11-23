export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface Translations {
  nav: {
    home: string;
    products: string;
    categories: string;
    about: string;
    contact: string;
    login: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
  };
  categories: {
    title: string;
    viewAll: string;
  };
  products: {
    title: string;
    addToCart: string;
    price: string;
  };
  about: {
    title: string;
    mission: string;
    vision: string;
  };
  footer: {
    rights: string;
    contactUs: string;
    quickLinks: string;
  };
  cart: {
    title: string;
    empty: string;
    items: string;
    quantity: string;
    total: string;
    subtotal: string;
    shipping: string;
    checkout: string;
    continueShopping: string;
    remove: string;
    summary: string;
    freeShipping: string;
  };
  wishlist: {
    title: string;
    empty: string;
    items: string;
    continueShopping: string;
    clear: string;
  };
}

export interface Category {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  icon: string;
  image: string;
}

export interface Product {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  category: string;
  price: number;
  image: string;
  description: {
    en: string;
    ar: string;
  };
  rating: number;
}