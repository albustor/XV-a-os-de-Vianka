import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Calendar, 
  Image as ImageIcon, 
  Gift, 
  MessageSquare, 
  CheckCircle,
  X,
  Camera,
  Clock,
  Heart
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Inicio', href: '#inicio', icon: Home },
  { name: 'Evento', href: '#detalles', icon: Calendar },
  { name: 'Sesión', href: '#estudio', icon: Camera },
  { name: 'Galería', href: '#galeria', icon: ImageIcon },
  { name: 'Regalos & Vestimenta', href: '#regalos', icon: Gift },
  { name: 'Muro', href: '#muro', icon: MessageSquare },
  { name: 'Confirmar', href: '#rsvp', icon: CheckCircle },
];

const QuinceaneraIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 4c.5-1 1.5-1.5 2.5-1.5S16.5 3 17 4c0 1-1 2-2 2s-2-1-3-2z" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7" r="2" fill="currentColor" stroke="none" />
    <path d="M10 9c1-1 3-1 4 0 .5 1 .5 2 0 3l-1 1h-2l-1-1c-.5-1-.5-2 0-3z" fill="currentColor" stroke="none" />
    <path d="M7 14c-2 2-3 5-3 8h16c0-3-1-6-3-8-1-1-2-1.5-4-1.5s-3 .5-4 1.5z" fill="currentColor" stroke="none" />
    <path d="M12 14v8M8 17c1 1 3 2 4 2s3-1 4-2M6 20c2 1 4 1.5 6 1.5s4-.5 6-1.5" stroke="white" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('#inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(`#${current}`);
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
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100]">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-lavender-100 flex flex-col items-center py-2 transition-all duration-500",
          isOpen ? "h-auto" : "h-14 overflow-hidden"
        )}
      >
        {/* Toggle Button / Top Circle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 mb-2 mx-1",
            isOpen ? "bg-rose-200 text-white" : "bg-rose-100 text-rose-400"
          )}
        >
          {isOpen ? <X className="w-5 h-5" /> : <QuinceaneraIcon className="w-7 h-7" />}
        </button>

        {/* Icons List */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center gap-1 px-1"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group",
                    activeSection === item.href 
                      ? "bg-rose-50 text-rose-400" 
                      : "text-slate-400 hover:text-rose-400 hover:bg-rose-50/30"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  
                  {/* Tooltip (Desktop) */}
                  <span className="absolute right-full mr-4 px-2 py-1 bg-slate-800 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity hidden md:block uppercase tracking-widest">
                    {item.name}
                  </span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
