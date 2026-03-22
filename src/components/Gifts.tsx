import { Gift, Shirt, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Gifts() {
  return (
    <section id="regalos" className="py-24 bg-beige-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Dress Code */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center p-10 rounded-3xl bg-white/60 backdrop-blur-md shadow-sm border border-lavender-200"
          >
            <div className="w-16 h-16 rounded-full bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto mb-6">
              <Shirt className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif mb-4 text-lavender-900">Código de Vestimenta</h3>
            <p className="text-lavender-600 font-semibold mb-4 uppercase tracking-widest text-sm">Formal / Gala</p>
            <div className="space-y-4">
              <p className="text-lavender-700 text-sm leading-relaxed">
                Nos encantaría que nos acompañes luciendo tu mejor gala para esta noche especial.
              </p>
              <div className="pt-4 border-t border-lavender-100">
                <p className="text-rose-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">Dato Importante:</p>
                <p className="text-lavender-800 text-sm italic">
                  Los colores <span className="text-lavender-500 font-bold">Lila</span>, <span className="text-rose-400 font-bold">Rosado</span> y <span className="text-emerald-500 font-bold">Verde</span> están reservados exclusivamente para la quinceañera.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Gifts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-10 rounded-3xl bg-lavender-50/50 backdrop-blur-md shadow-sm border border-lavender-200 relative overflow-hidden"
          >
            {/* Decorative background element like the butterfly/leaf in image */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
                alt="Butterfly Decoration" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-16 h-16 rounded-full bg-white text-lavender-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <div className="relative">
                <Shirt className="w-8 h-8 opacity-20 absolute -top-1 -left-1" />
                <Gift className="w-8 h-8" />
              </div>
            </div>
            
            <h3 className="text-4xl font-serif mb-8 text-lavender-900 italic tracking-tight">Mesa de Regalos</h3>
            
            <div className="space-y-8">
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-12 h-12 border-2 border-lavender-300 rounded-lg flex items-center justify-center rotate-[-10deg] bg-white">
                  <Heart className="w-5 h-5 text-lavender-400 fill-lavender-400" />
                </div>
                <div className="w-12 h-12 border-2 border-lavender-300 rounded-lg flex items-center justify-center rotate-[5deg] -ml-4 mt-2 bg-white">
                  <Heart className="w-5 h-5 text-lavender-400 fill-lavender-400" />
                </div>
              </div>

              <p className="text-lavender-800 text-xl md:text-2xl font-serif italic leading-relaxed px-4">
                "Tu presencia es el mejor regalo. Si algo me deseas obsequiar, un regalo en sobre lo sabré apreciar."
              </p>
              
              <div className="pt-6 border-t border-lavender-200/50">
                <p className="text-lavender-600 font-semibold uppercase tracking-[0.3em] text-[10px] mb-2">Lluvia de Sobres</p>
                <p className="text-lavender-400 text-[9px] italic">Habrá un buzón en la recepción para tus sobres</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
