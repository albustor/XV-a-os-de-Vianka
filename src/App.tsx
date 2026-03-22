import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import ProfessionalGallery from './components/ProfessionalGallery';
import Gifts from './components/Gifts';
import Navbar from './components/Navbar';
import FloatingMenu from './components/FloatingMenu';
import SocialWall from './components/SocialWall';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Music } from 'lucide-react';

export default function App() {
  return (
    <main className="relative min-h-screen bg-beige-50">
      <Navbar />
      <FloatingMenu />
      <MusicPlayer />

      <Hero />
      
      {/* Phrase Section */}
      <section className="py-24 bg-beige-100 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" 
            alt="Floral Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="mb-8 flex justify-center items-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-lavender-400/50" />
            <Music className="mx-6 text-lavender-500 w-6 h-6" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-lavender-400/50" />
          </div>
          <p className="text-xl md:text-3xl font-serif italic text-lavender-800 leading-relaxed mb-10 px-4 drop-shadow-sm">
            "He aprendido que estar con quienes quiero es suficiente para ser feliz. Ten por seguro que el tiempo y estas letras se borrarán, pero el recuerdo de tu presencia esta noche nunca lo olvidaré."
          </p>
          <p className="text-lg md:text-2xl font-serif text-lavender-700 mb-12 tracking-wide drop-shadow-sm">
            Tenemos el agrado de invitarle a los XV años de <span className="text-lavender-900 font-bold">Vielka Contreras Ángulo</span>
          </p>
          <div className="inline-block px-8 py-2 border-y border-lavender-300/30">
            <p className="text-lavender-600 font-serif text-2xl tracking-widest">— Vielka</p>
          </div>
        </motion.div>
      </section>

      <Countdown />
      <EventDetails />
      <ProfessionalGallery />
      <Gallery />
      <Gifts />
      <SocialWall />
      <RSVP />

      {/* Footer */}
      <footer className="py-16 bg-beige-200 text-lavender-700/60 text-center text-[10px] tracking-[0.4em] uppercase border-t border-lavender-100">
        <p className="mb-4">Vielka &bull; XV Años &bull; 2026</p>
        <div className="w-8 h-[1px] bg-lavender-300 mx-auto mb-4" />
        <p className="opacity-60">Hecho con amor para un día inolvidable</p>
      </footer>
    </main>
  );
}

