import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2500")' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-stone-900/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-6"
        >
          Casa Ballena • San José del Cabo
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-white font-serif text-6xl md:text-8xl lg:text-9xl tracking-wide font-light"
        >
          Ballena
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/70 text-[10px] uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 w-full h-full bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
