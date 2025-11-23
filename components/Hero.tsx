import React, { useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight, ArrowLeft, ShieldCheck, Truck, Clock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t, language, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(textRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    })
    .from(imageRef.current, {
      x: dir === 'rtl' ? -50 : 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    }, "-=0.6");

  }, { scope: containerRef, dependencies: [language] });

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-medical-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div ref={textRef} className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-medical-100 text-medical-700 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-medical-500 animate-pulse"></span>
              {language === 'en' ? '#1 Medical Supplier' : 'المورد الطبي الأول'}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t.hero.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-medical-600' : ''}> {word} </span>
              ))}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="flex items-center gap-2 px-8 py-4 bg-medical-600 text-white rounded-xl font-semibold shadow-lg shadow-medical-200 hover:shadow-xl hover:bg-medical-700 transition-all transform hover:-translate-y-1">
                {t.hero.cta}
                <ArrowIcon size={20} />
              </Link>
              <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                {t.hero.secondaryCta}
              </button>
            </div>

            <div className="pt-8 flex items-center gap-6 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-medical-500" size={18} />
                <span>{language === 'en' ? 'Certified Quality' : 'جودة معتمدة'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="text-medical-500" size={18} />
                <span>{language === 'en' ? 'Fast Delivery' : 'توصيل سريع'}</span>
              </div>
               <div className="flex items-center gap-2">
                <Clock className="text-medical-500" size={18} />
                <span>{language === 'en' ? '24/7 Support' : 'دعم 24/7'}</span>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div ref={imageRef} className="relative lg:h-[600px] flex items-center justify-center">
             <div className="relative w-full aspect-square max-w-md lg:max-w-full">
                {/* Abstract Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-medical-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-100 h-80 mx-auto">
  <img 
    src="../assets/photo1.jpg" 
    alt="Medical Professional" 
    className="w-full h-full object-cover"
  />
                  
                  {/* Floating Card */}
                  <div className={`absolute bottom-6 ${dir === 'ltr' ? 'left-6' : 'right-6'} bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-xs`}>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{language === 'en' ? 'Trusted by 500+ Hospitals' : 'موثوق من 500+ مستشفى'}</p>
                      <div className="flex text-yellow-400 text-xs mt-0.5">★★★★★</div>
                    </div>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;