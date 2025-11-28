import React, { useState, useRef } from "react";
import { useLanguage } from "./LanguageContext";
import { useWishlist } from "./WishlistContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Globe, Heart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { t, language, toggleLanguage, dir } = useLanguage();
  const { wishlistItems } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const { cartCount } = useCart();

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: navRef }
  );

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.products, path: "/products" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.contact, path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-medical-500 to-medical-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight">
                Al-Andalus
              </span>
              <span className="text-xs text-medical-600 font-medium tracking-wider">
                MEDICAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-medical-600 relative py-2
                  ${isActive(link.path) ? "text-medical-600" : "text-gray-600"}
                `}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-medical-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
            >
              <Globe size={16} />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </button>

            <Link
              to="/wishlist"
              className="p-2 text-gray-600 hover:text-red-500 transition-colors relative"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </Link>

            <Link
              to="/cart"
              className="p-2 text-gray-600 hover:text-medical-600 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              className="px-5 py-2.5 bg-medical-600 hover:bg-medical-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              {t.nav.login}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLanguage} className="text-gray-600">
              <span className="font-bold">
                {language === "en" ? "AR" : "EN"}
              </span>
            </button>

            <Link to="/wishlist" className="p-2 text-gray-600 relative">
              <Heart size={24} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>

            <Link to="/cart" className="p-2 text-gray-600 relative">
  <ShoppingCart size={24} />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
      {cartCount}
    </span>
  )}
</Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium
                  ${
                    isActive(link.path)
                      ? "bg-medical-50 text-medical-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 bg-medical-600 text-white rounded-lg font-semibold"
              >
                {t.nav.login}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
