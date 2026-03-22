import { useState, useEffect, useRef } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // The user wants the song: https://www.youtube.com/watch?v=13jQjFQmTFw
  // We assume the user will upload the mp3 to /public/music.mp3
  const audioSrc = '/music.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Audio playback failed:", err);
          alert("Por favor, interactúa con la página para activar la música.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isPlaying 
            ? 'bg-lavender-500 text-white animate-pulse' 
            : 'bg-white/80 backdrop-blur-md text-lavender-600 border border-lavender-200'
        }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
            >
              <Music2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -180 }}
            >
              <Music className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md text-lavender-500 border border-lavender-100 flex items-center justify-center shadow-lg"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      )}

      {/* Floating Note Animation */}
      {isPlaying && (
        <div className="absolute -top-12 left-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: -40 - Math.random() * 40,
                x: (Math.random() - 0.5) * 40
              }}
              transition={{ 
                duration: 2 + Math.random(), 
                repeat: Infinity,
                delay: i * 0.8
              }}
              className="absolute text-lavender-400"
            >
              <Music className="w-4 h-4" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
