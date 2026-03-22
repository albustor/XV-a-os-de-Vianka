import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <section className="py-24 bg-beige-50 text-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto p-12 rounded-3xl border border-lavender-200 bg-white/60 backdrop-blur-md shadow-2xl"
        >
          <CheckCircle2 className="w-16 h-16 text-lavender-600 mx-auto mb-6" />
          <h2 className="text-3xl font-serif mb-4 text-lavender-900">¡Gracias por confirmar!</h2>
          <p className="text-lavender-700">Tu asistencia ha sido registrada. ¡Nos vemos pronto!</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 bg-beige-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1974&auto=format&fit=crop" 
          alt="Event" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-lavender-900">Confirmar Asistencia</h2>
          <p className="text-lavender-700 italic text-sm md:text-base">Por favor, confirma antes del 1 de Octubre</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 bg-white/60 backdrop-blur-xl p-6 md:p-12 rounded-3xl border border-lavender-200 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-lavender-600 font-bold">Nombre Completo</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 bg-white/50 text-lavender-900 transition-all placeholder:text-lavender-300 text-sm"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-lavender-600 font-bold">¿Asistirás?</label>
              <select className="w-full px-4 py-3 rounded-lg border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 bg-white/50 text-lavender-900 transition-all text-sm">
                <option className="bg-white">Sí, asistiré con gusto</option>
                <option className="bg-white">No podré asistir</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-lavender-600 font-bold">Número de Invitados</label>
              <select className="w-full px-4 py-3 rounded-lg border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 bg-white/50 text-lavender-900 transition-all text-sm">
                <option className="bg-white">1 Persona</option>
                <option className="bg-white">2 Personas</option>
                <option className="bg-white">3 Personas</option>
                <option className="bg-white">4 Personas</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-lavender-600 font-bold">Restricciones Alimenticias</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 bg-white/50 text-lavender-900 transition-all placeholder:text-lavender-300 text-sm"
                placeholder="Ej. Vegetariano, Alergias"
              />
            </div>
          </div>

          <div className="pt-2 md:pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-lavender-600 text-white rounded-xl font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-lavender-500 transition-all active:scale-[0.98] disabled:opacity-70 border border-lavender-400/30 text-xs"
            >
              {loading ? 'Enviando...' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
