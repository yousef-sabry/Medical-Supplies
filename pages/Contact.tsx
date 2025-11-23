import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">{t.nav.contact}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{language === 'en' ? 'Call Us' : 'اتصل بنا'}</h3>
                    <p className="text-gray-600">+1 234 567 890</p>
                </div>
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{language === 'en' ? 'Email Us' : 'راسلنا'}</h3>
                    <p className="text-gray-600">info@alandalus-med.com</p>
                </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{language === 'en' ? 'Send us a message' : 'أرسل لنا رسالة'}</h2>
                <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Name' : 'الاسم'}</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</label>
                            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Subject' : 'الموضوع'}</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'en' ? 'Message' : 'الرسالة'}</label>
                        <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all"></textarea>
                    </div>
                    <button type="button" className="w-full bg-medical-600 text-white font-bold py-3 rounded-lg hover:bg-medical-700 transition-colors">
                        {language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;