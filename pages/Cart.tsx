import React, { useState, useRef } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { PRODUCTS } from '../constants';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, X, MessageCircle, MapPin, User, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import emailjs from '@emailjs/browser';

// Type for a cart item
interface CartItem {
  productId: string;
  quantity: number;
}

const ADMIN_EMAIL = 'yousefsabry1298@gmail.com';

const Cart = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Initialize with some mock data for demonstration
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: '101', quantity: 1 },
    { productId: '103', quantity: 2 },
  ]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Helper to get product details
  const getProduct = (id: string) => PRODUCTS.find(p => p.id === id);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleManualQuantity = (productId: string, value: string) => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setCartItems(prev => prev.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProduct(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 500 ? 0 : 25; // Free shipping over 500
  const total = subtotal + shipping;

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Animation for Modal
  useGSAP(() => {
    if (isCheckoutOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: () => {
         if (overlayRef.current) overlayRef.current.style.display = 'none';
      }});
    }
  }, [isCheckoutOpen]);

  // Placeholder function to simulate email sending
  const sendOrderEmail = async (orderData: string) => {
    console.log(`%c[MOCK EMAIL SERVICE] Preparing to send email...`, "color: #0d9488; font-weight: bold");
    console.log(`%cTo: ${ADMIN_EMAIL}`, "color: #0d9488");
    console.log(`%cSubject: New Order Notification`, "color: #0d9488");
    console.log(`%cBody:\n${orderData}`, "color: #333");

    // Simulate network delay (1.5 seconds)
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  // داخل handleCheckoutSubmit بدل الدالة التجريبية sendOrderEmail
const handleCheckoutSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const itemsList = cartItems.map(item => {
    const product = getProduct(item.productId);
    const productName = product ? (product.name['en'] || product.name['ar']) : 'Unknown Item';
    return `- ${productName} (x${item.quantity}) - $${(product ? product.price * item.quantity : 0).toFixed(2)}`;
  }).join('\n');

  const totalFormatted = `$${total.toFixed(2)}`;

  const templateParams = {
    to_email: ADMIN_EMAIL,
    subject: 'New Order Notification',
    customer_name: customerInfo.name,
    customer_phone: customerInfo.phone,
    customer_address: customerInfo.address,
    order_items: itemsList,
    total_price: totalFormatted,
    shipping: shipping === 0 ? 'Free' : `$${shipping}`
  };

  try {
    const response = await emailjs.send(
      'service_q97reau',    // ضع هنا Service ID الخاص بك
      'template_qud2g4e',  // ضع هنا Template ID الخاص بك
      templateParams,
      'OGNhxEPfzcU3frNcr'  // ضع هنا Public Key
    );

    console.log("Email sent successfully:", response);

    alert(language === 'en' 
      ? `Order placed successfully! A notification has been sent to ${ADMIN_EMAIL}` 
      : `تم الطلب بنجاح! تم إرسال إشعار إلى ${ADMIN_EMAIL}`
    );

    setCartItems([]);
    setIsCheckoutOpen(false);
    setCustomerInfo({ name: '', phone: '', address: '' });

  } catch (error: any) {
    console.error("Failed to place order", error);
    alert(language === 'en' 
      ? `Something went wrong. ${error.text || ''}` 
      : `حدث خطأ ما. يرجى المحاولة مرة أخرى. ${error.text || ''}`
    );
  } finally {
    setIsSubmitting(false);
  }
};


  if (cartItems.length === 0 && !isCheckoutOpen) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.cart.empty}</h2>
            <p className="text-gray-500 mb-8">{t.hero.subtitle}</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-medical-600 text-white rounded-xl font-bold hover:bg-medical-700 transition-all shadow-lg hover:shadow-xl"
            >
              {dir === 'rtl' && <ArrowIcon size={20} />}
              {t.cart.continueShopping}
              {dir === 'ltr' && <ArrowIcon size={20} />}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{t.cart.title}</h1>
          <span className="bg-white px-4 py-1.5 rounded-full text-sm font-semibold text-gray-600 shadow-sm border border-gray-100">
            {cartItems.length} {t.cart.items}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;

              return (
                <div key={item.productId} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-medical-100 transition-colors flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl p-2 shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name[language]} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>

                  <div className="flex-grow text-center sm:text-start w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-medical-600 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                        <h3 className="text-lg font-bold text-gray-900">{product.name[language]}</h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.productId, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-medical-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleManualQuantity(item.productId, e.target.value)}
                            className="w-12 text-center font-bold text-gray-900 bg-transparent border-none focus:ring-0 focus:outline-none p-0 appearance-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        
                         <button 
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-medical-600 transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-xl font-bold text-medical-700">
                          ${(product.price * item.quantity).toFixed(2)}
                        </span>
                        
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.cart.remove}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t.cart.summary}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.shipping}</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? <span className="text-green-600">{t.cart.freeShipping}</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">{t.cart.total}</span>
                  <span className="text-2xl font-bold text-medical-700">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 bg-medical-600 text-white rounded-xl font-bold shadow-lg shadow-medical-200 hover:shadow-xl hover:bg-medical-700 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {t.cart.checkout}
                {dir === 'rtl' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </button>

              <div className="mt-6 text-center">
                 <Link to="/products" className="text-sm font-semibold text-gray-500 hover:text-medical-600 transition-colors">
                    {t.cart.continueShopping}
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden opacity-0"
        onClick={() => setIsCheckoutOpen(false)}
      ></div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div 
            ref={modalRef} 
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl pointer-events-auto overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-medical-600 p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag size={24} />
                {t.cart.checkout}
              </h3>
              <button 
                onClick={() => setIsCheckoutOpen(false)} 
                disabled={isSubmitting}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCheckoutSubmit} className="p-8 space-y-6">
              <div className="p-4 bg-blue-50 text-blue-800 rounded-xl text-sm flex gap-3 items-start border border-blue-100">
                 <CheckCircle className="shrink-0 mt-0.5" size={18} />
                 <p>{language === 'en' 
                    ? 'Please confirm your details. We will send the order details to the administration immediately.' 
                    : 'يرجى تأكيد بياناتك. سنقوم بإرسال تفاصيل الطلب إلى الإدارة فوراً.'}
                 </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <User size={16} className="text-medical-500"/> 
                  {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                </label>
                <input 
                  required
                  type="text" 
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white transition-all outline-none"
                  placeholder={language === 'en' ? 'Enter your name' : 'أدخل اسمك'}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} className="text-medical-500"/> 
                  {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                </label>
                <input 
                  required
                  type="tel" 
                  value={customerInfo.phone}
                  onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white transition-all outline-none"
                  placeholder={language === 'en' ? 'e.g., 0501234567' : 'مثال: 0501234567'}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-medical-500"/> 
                  {language === 'en' ? 'Delivery Address' : 'عنوان التوصيل'}
                </label>
                <textarea 
                  required
                  rows={3}
                  value={customerInfo.address}
                  onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white transition-all outline-none resize-none"
                  placeholder={language === 'en' ? 'City, Street, Building...' : 'المدينة، الحي، الشارع...'}
                  disabled={isSubmitting}
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-500 text-sm font-semibold">{t.cart.total}</span>
                <span className="text-xl font-bold text-medical-700">${total.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-medical-600 hover:bg-medical-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    {language === 'en' ? 'Processing...' : 'جاري المعالجة...'}
                  </>
                ) : (
                  <>
                    <Mail size={24} />
                    {language === 'en' ? 'Place Order' : 'تأكيد الطلب'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;