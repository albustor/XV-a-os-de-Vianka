import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { motion } from 'motion/react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = new Date('2026-10-15T19:00:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft({
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 bg-beige-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
          alt="Celebration" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-5xl font-serif mb-16 text-lavender-800 tracking-widest drop-shadow-sm"
        >
          Faltan solo...
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {items.map((item, index) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border border-lavender-300/30 flex items-center justify-center mb-4 md:mb-6 bg-white/40 backdrop-blur-md shadow-2xl relative group">
                <div className="absolute inset-0 rounded-full border border-lavender-400/20 scale-110 group-hover:scale-125 transition-transform duration-700" />
                <span className="text-2xl sm:text-3xl md:text-5xl font-serif text-lavender-700 drop-shadow-lg">{item.value}</span>
              </div>
              <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] text-lavender-600 font-bold drop-shadow-sm">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
