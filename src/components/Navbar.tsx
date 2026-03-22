import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Evento', href: '#detalles' },
  { name: 'Sesión', href: '#estudio' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Regalos & Vestimenta', href: '#regalos' },
  { name: 'Muro', href: '#muro' },
  { name: 'Confirmar', href: '#rsvp' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 py-3 md:px-8",
        isScrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-[0_10px_30px_rgba(177,156,217,0.1)] border-b border-lavender-200 py-2" 
          : "bg-white/10 backdrop-blur-[2px] border-b border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "font-serif text-lg md:text-2xl tracking-[0.2em] cursor-pointer flex-shrink-0",
            isScrolled ? "text-lavender-900" : "text-lavender-800"
          )}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          VIELKA
        </motion.span>

        <div className="flex items-center gap-2 md:gap-10 overflow-x-auto no-scrollbar py-1 flex-1 justify-end">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "text-[8px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold transition-all duration-300 whitespace-nowrap px-2 py-1 rounded-full",
                isScrolled 
                  ? "text-lavender-700 hover:text-lavender-900 hover:bg-lavender-100" 
                  : "text-lavender-800 hover:text-lavender-900 hover:bg-white/20"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
