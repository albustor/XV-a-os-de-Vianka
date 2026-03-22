import { MapPin, Clock, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function EventDetails() {
  const events = [
    {
      title: 'Ceremonia Religiosa',
      time: '19:00 hrs',
      location: 'Parroquia de San Francisco',
      address: 'Av. Principal 123, Ciudad de México',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: 'Recepción',
      time: '21:00 hrs',
      location: 'Salón de Eventos "El Castillo"',
      address: 'Calle de las Rosas 456, Ciudad de México',
      icon: <Clock className="w-6 h-6" />,
    }
  ];

  const mainLocation = {
    mapUrl: 'https://maps.google.com/maps?q=Salón+de+Eventos+El+Castillo+CDMX',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.539572621453!2d-99.1412!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92b75aa014d%3A0x1234567890abcdef!2sCastillo+de+Chapultepec!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx',
  };

  return (
    <section id="detalles" className="py-24 bg-beige-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1974&auto=format&fit=crop" 
          alt="Decorative" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-lavender-900 drop-shadow-sm">Detalles del Evento</h2>
          <p className="text-lavender-700 italic drop-shadow-sm">Acompáñanos en este día tan especial</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div 
              key={event.title}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-6 md:p-8 rounded-3xl border border-lavender-200 bg-white/60 backdrop-blur-sm flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-lavender-100 text-lavender-600 flex items-center justify-center mb-4 md:mb-6 border border-lavender-200">
                {event.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-2 text-lavender-900 drop-shadow-sm">{event.title}</h3>
              <p className="text-lavender-600 font-medium mb-4 tracking-widest text-sm md:text-base drop-shadow-sm">{event.time}</p>
              <div className="flex items-start justify-center gap-2 text-lavender-800">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-lavender-500 mt-1" />
                <div className="text-sm md:text-base">
                  <p className="font-semibold">{event.location}</p>
                  <p className="opacity-70">{event.address}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unified Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden border border-lavender-200 shadow-2xl bg-white/40"
        >
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-2 h-[300px] md:h-[400px] relative group cursor-pointer" onClick={() => window.open(mainLocation.mapUrl, '_blank')}>
              <iframe
                src={mainLocation.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-lavender-900/10 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                <div className="bg-lavender-600 text-white px-6 py-2 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest shadow-xl">
                  Ver Ubicación Completa
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center bg-beige-100/60 backdrop-blur-md">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 text-lavender-600 mb-4" />
              <h4 className="text-lg md:text-xl font-serif mb-4 text-lavender-900">Ubicación del Evento</h4>
              <p className="text-lavender-800 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
                Hemos seleccionado un lugar mágico para celebrar este momento inolvidable. Haz clic en el mapa para obtener indicaciones precisas.
              </p>
              <div className="flex flex-col gap-3 md:gap-4 w-full">
                <a 
                  href={mainLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-lavender-600 text-white rounded-full hover:bg-lavender-500 transition-all duration-300 text-[10px] md:text-xs uppercase tracking-widest font-bold shadow-lg"
                >
                  Abrir en Google Maps
                </a>
                <button 
                  onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 bg-transparent border border-lavender-400/50 text-lavender-700 rounded-full hover:bg-lavender-500/10 transition-all duration-300 text-[10px] md:text-xs uppercase tracking-widest font-bold"
                >
                  Confirmar Asistencia
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
