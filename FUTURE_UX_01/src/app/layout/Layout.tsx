import { NavLink, Outlet, useLocation } from "react-router";
import { Flower2, Menu as MenuIcon, X, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservations", path: "/reservations" },
  ];

  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen flex flex-col font-['Inter',sans-serif] bg-[#0F0F0F] text-white">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0F0F0F]/95 backdrop-blur-sm border-b border-[#333] py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
          <NavLink to="/" className="flex items-center gap-2 group">
            <Flower2
              className={`w-8 h-8 transition-colors ${
                isScrolled || mobileMenuOpen ? "text-[#FF6B00]" : "text-white group-hover:text-[#FF6B00]"
              }`}
            />
            <span
              className={`text-2xl font-bold font-['Playfair_Display',serif] tracking-tight transition-colors text-white`}
            >
              Spice Garden
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide uppercase transition-colors ${
                    isActive
                      ? "text-[#FF6B00]"
                      : isScrolled
                        ? "text-[#BDBDBD] hover:text-[#FF6B00]"
                        : "text-white/90 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              className="relative text-white hover:text-[#FF6B00] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Mobile Menu Toggle & Cart */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <NavLink to="/cart" className="relative text-white">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <MenuIcon className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-[#0F0F0F] border-b border-[#333] shadow-lg md:hidden"
            >
              <nav className="flex flex-col items-center py-6 gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-lg font-medium uppercase tracking-wide ${
                        isActive ? "text-[#FF6B00]" : "text-[#BDBDBD] hover:text-[#FF6B00]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-[#0F0F0F] border-t border-[#333] py-16">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6">
              <Flower2 className="w-6 h-6 text-[#FF6B00]" />
              <span className="text-2xl font-bold font-['Playfair_Display',serif] text-white tracking-tight">
                Spice Garden
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-[#BDBDBD]">
              A culinary journey through aromatic spices and authentic flavors, crafted with passion and premium ingredients.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-['Playfair_Display',serif] text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-[#BDBDBD]">
              <li className="flex justify-between w-48 border-b border-[#333] pb-2">
                <span>Mon - Thu</span>
                <span>5pm - 10pm</span>
              </li>
              <li className="flex justify-between w-48 border-b border-[#333] pb-2">
                <span>Fri - Sat</span>
                <span>5pm - 11pm</span>
              </li>
              <li className="flex justify-between w-48 border-b border-[#333] pb-2">
                <span>Sunday</span>
                <span>4pm - 9pm</span>
              </li>
              <li className="pt-3">
                <NavLink to="/admin" className="text-[#FF6B00] hover:text-[#E56000] transition-colors text-xs uppercase tracking-wider">
                  Admin Panel →
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-['Playfair_Display',serif] text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-sm text-[#BDBDBD] text-center md:text-left">
              <li>45 MG Road, Connaught Place</li>
              <li>New Delhi, Delhi 110001</li>
              <li className="pt-2">
                <a href="mailto:info@spicegarden.com" className="hover:text-[#FF6B00] transition-colors">
                  info@spicegarden.com
                </a>
              </li>
              <li>
                <a href="tel:+911123456789" className="hover:text-[#FF6B00] transition-colors">
                  +91 11 2345 6789
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl mt-16 pt-8 border-t border-[#333] text-center text-sm text-[#BDBDBD]">
          <p>&copy; {new Date().getFullYear()} Spice Garden Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
