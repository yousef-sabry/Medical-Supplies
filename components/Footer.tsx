import React from 'react';
import { useLanguage } from './LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 bg-gradient-to-br from-medical-500 to-medical-700 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  A
               </div>
               <span className="text-2xl font-bold">Al-Andalus</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === 'en' 
                ? 'Your trusted partner in healthcare excellence. Providing top-tier medical equipment to professionals worldwide.'
                : 'شريكك الموثوق في التميز بالرعاية الصحية. توفير أفضل المعدات الطبية للمهنيين حول العالم.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-medical-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-medical-600 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-medical-600 transition-colors"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-medical-400 transition-colors">{t.nav.home}</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">{t.nav.about}</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">{t.nav.products}</a></li>
              <li><a href="#" className="hover:text-medical-400 transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t.footer.contactUs}</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-medical-500 shrink-0 mt-1" />
                <span>محافظة المنوفية مدينة قويسنا امام مستشفي قويسنا العام</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-medical-500 shrink-0" />
                <span>01070603306</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-medical-500 shrink-0" />
                <span>info@alandalus-med.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter (Mock) */}
          <div>
            <h4 className="text-lg font-bold mb-6">{language === 'en' ? 'Newsletter' : 'النشرة البريدية'}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {language === 'en' ? 'Subscribe to get latest updates.' : 'اشترك للحصول على آخر التحديثات.'}
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 text-white px-4 py-3 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-medical-500"
              />
              <button className="bg-medical-600 px-4 py-3 rounded-r-lg hover:bg-medical-700 transition-colors font-bold">OK</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;