import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-beige-50">
      {/* Enchanted Forest Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop"
          alt="Enchanted Forest"
          className="w-full h-full object-cover opacity-80 scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Magical Light Rays & Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-lavender-900/20 via-transparent to-beige-100/50" />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(255,255,255,0.4)_0%,_transparent_70%)]" />
      </div>

      {/* Floating Butterflies (Simulated) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              x: [null, (Math.random() - 0.5) * 200 + "px"],
              y: [null, (Math.random() - 0.5) * 200 + "px"],
              opacity: [0, 0.8, 0],
              rotate: [0, 20, -20, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute"
          >
            <div className="w-4 h-4 bg-gold-400 rounded-full blur-[2px] shadow-[0_0_10px_#d4af37]" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <span className="text-lavender-700 uppercase text-[9px] md:text-xs tracking-[0.6em] mb-4 block font-bold drop-shadow-sm">
              Estás Invitado a
            </span>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
              <div className="h-[1px] w-8 md:w-12 bg-lavender-400/50" />
              <span className="text-lavender-600 font-serif italic text-lg md:text-2xl tracking-widest drop-shadow-sm">Mis Quince Años</span>
              <div className="h-[1px] w-8 md:w-12 bg-lavender-400/50" />
            </div>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl md:text-[11rem] text-lavender-900 font-serif mb-8 md:mb-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] leading-none tracking-tighter">
            Vielka
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="space-y-6"
          >
            <p className="text-lavender-800 text-lg md:text-2xl font-serif italic tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-10 drop-shadow-sm">
              Sábado, 15 de Octubre
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-12">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(177, 156, 217, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('detalles')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-4 bg-white/50 backdrop-blur-sm border border-lavender-300 text-lavender-700 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 hover:bg-lavender-50"
              >
                Ver Detalles
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#967bb6" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-4 bg-lavender-500 text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-[0_10px_20px_rgba(177,156,217,0.3)] transition-all duration-500 border border-lavender-400/30"
              >
                Confirmar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-lavender-500/80 via-lavender-500/20 to-transparent" />
      </motion.div>
    </section>
  );
}
