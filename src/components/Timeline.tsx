import { motion } from 'motion/react';
import { Clock, Church, Music, Utensils, Star } from 'lucide-react';

const events = [
  { time: '19:00', title: 'Ceremonia', icon: Church, description: 'Parroquia de San Francisco' },
  { time: '21:00', title: 'Recepción', icon: Utensils, description: 'Salón de Eventos "El Castillo"' },
  { time: '22:00', title: 'Vals', icon: Music, description: 'Momento mágico con mi padre' },
  { time: '23:00', title: 'Cena', icon: Utensils, description: 'Banquete especial' },
  { time: '00:00', title: 'Baile', icon: Star, description: '¡A celebrar toda la noche!' },
];

export default function Timeline() {
  return (
    <section id="itinerario" className="py-24 bg-beige-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lavender-100 text-lavender-600 mb-6 border border-lavender-200"
          >
            <Clock className="w-6 h-6" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-lavender-900">Itinerario</h2>
          <p className="text-lavender-700 italic">Cronograma de nuestra celebración</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-lavender-200 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1 text-center md:text-right w-full">
                  {index % 2 === 0 ? (
                    <div className="md:pr-12">
                      <span className="text-lavender-500 font-bold tracking-widest text-sm">{event.time}</span>
                      <h3 className="text-xl font-serif text-lavender-900 mt-1">{event.title}</h3>
                      <p className="text-lavender-600 text-sm mt-2">{event.description}</p>
                    </div>
                  ) : (
                    <div className="md:pl-12 text-center md:text-left">
                      <span className="text-lavender-500 font-bold tracking-widest text-sm">{event.time}</span>
                      <h3 className="text-xl font-serif text-lavender-900 mt-1">{event.title}</h3>
                      <p className="text-lavender-600 text-sm mt-2">{event.description}</p>
                    </div>
                  )}
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border border-lavender-200 flex items-center justify-center shadow-lg text-lavender-600">
                    <event.icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
