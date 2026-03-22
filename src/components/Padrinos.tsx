import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const padrinos = [
  { role: 'Padrinos de Honor', names: 'Juan Pérez & María García' },
  { role: 'Padrinos de Brindis', names: 'Carlos López & Ana Martínez' },
  { role: 'Padrinos de Pastel', names: 'Roberto Gómez & Lucía Sánchez' },
  { role: 'Padrinos de Recuerdos', names: 'Fernando Ruiz & Elena Torres' },
];

export default function Padrinos() {
  return (
    <section id="padrinos" className="py-24 bg-beige-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lavender-100 text-lavender-600 mb-6 border border-lavender-200"
          >
            <Heart className="w-6 h-6" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-lavender-900">Nuestros Padrinos</h2>
          <p className="text-lavender-700 italic">Personas especiales que me acompañan en este camino</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {padrinos.map((padrino, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-lavender-200 text-center shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-lavender-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-3">
                {padrino.role}
              </h3>
              <p className="text-xl md:text-2xl font-serif text-lavender-900">
                {padrino.names}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
