import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { Shield, Users, Trophy } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-medical-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
                {t.hero.subtitle}
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <img 
                    src="https://picsum.photos/id/1060/600/400" 
                    alt="About Us" 
                    className="rounded-2xl shadow-xl"
                />
            </div>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Shield className="text-medical-500" />
                        {language === 'en' ? 'Our Mission' : 'مهمتنا'}
                    </h3>
                    <p className="text-gray-600">{t.about.mission}</p>
                </div>
                
                 <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Trophy className="text-medical-500" />
                        {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
                    </h3>
                    <p className="text-gray-600">{t.about.vision}</p>
                </div>

                 <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Users className="text-medical-500" />
                        {language === 'en' ? 'Who We Are' : 'من نحن'}
                    </h3>
                    <p className="text-gray-600">
                        {language === 'en' 
                        ? 'We are a dedicated team of professionals committed to delivering the best healthcare solutions.' 
                        : 'نحن فريق متفاني من المحترفين الملتزمين بتقديم أفضل حلول الرعاية الصحية.'}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;