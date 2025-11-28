import React from "react";
import { HashRouter, Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageContext";
import { WishlistProvider } from "./components/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { CartProvider } from "./context/CartContext";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <WishlistProvider>
        <CartProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center text-xl font-bold">
                      Page Not Found
                    </div>
                  }
                />
              </Route>
            </Routes>
          </HashRouter>
        </CartProvider>
      </WishlistProvider>
    </LanguageProvider>
  );
};

export default App;
