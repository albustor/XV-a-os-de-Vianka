import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

const photos = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    caption: "Sesión en Estudio"
  },
  {
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
    caption: "Momentos Especiales"
  },
  {
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    caption: "Elegancia"
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    caption: "Celebración"
  },
  {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    caption: "Sonrisas"
  },
  {
    url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1974&auto=format&fit=crop",
    caption: "Vielka"
  }
];

export default function ProfessionalGallery() {
  return (
    <section id="estudio" className="py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-lavender-100 text-lavender-600 mb-6 border border-lavender-200"
          >
            <Camera className="w-6 h-6 md:w-8 md:h-8" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-lavender-900 drop-shadow-sm">Sesión Profesional</h2>
          <p className="text-lavender-700 italic max-w-2xl mx-auto text-sm md:text-base px-4 drop-shadow-sm">
            Capturando la esencia y belleza de Vielka en esta etapa tan importante. 
            Fotografías tomadas en <span className="text-lavender-600 font-semibold">Curiol Studio</span>.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl shadow-2xl cursor-pointer border border-lavender-100"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                <p className="text-lavender-100 font-serif italic tracking-wider text-sm md:text-base drop-shadow-sm">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
