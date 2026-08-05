import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Concept', href: '#concept' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-sand-100/90 backdrop-blur-md border-sand-300/50 py-4 shadow-sm'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="#" className={`font-serif text-2xl tracking-widest uppercase transition-colors duration-500 ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
            Ballena
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/${link.href}`}
                    className={`text-sm uppercase tracking-widest hover:opacity-70 transition-all duration-300 ${
                      isScrolled ? 'text-stone-900' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/reserve"
              className={`px-6 py-2.5 text-xs uppercase tracking-widest border transition-all duration-300 ${
                isScrolled
                  ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-stone-900'
              }`}
            >
              Reservations
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden ${isScrolled ? 'text-stone-900' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-sand-100 flex flex-col justify-center items-center px-6"
          >
            <button
              className="absolute top-6 right-6 text-stone-900 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <ul className="flex flex-col items-center space-y-8 mb-12">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/${link.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-3xl text-stone-900 tracking-wider hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/reserve"
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-3 text-sm uppercase tracking-widest border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all"
            >
              Reservations
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
