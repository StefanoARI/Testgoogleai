import { motion } from 'motion/react';

export default function Concept() {
  return (
    <section id="concept" className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative aspect-[3/4] w-full max-w-md mx-auto"
        >
          <div className="absolute inset-0 bg-sand-300 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" />
          <img 
            src="https://images.unsplash.com/photo-1544025162-81111421550a?auto=format&fit=crop&q=80&w=1200" 
            alt="Fine dining plate" 
            className="relative z-10 w-full h-full object-cover grayscale-[20%]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <span className="text-sand-800 uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-tight mb-8">
            The kitchen moves <br/> <span className="italic text-sand-800">with the landscape.</span>
          </h2>
          <div className="space-y-6 text-stone-600 font-light leading-relaxed text-lg">
            <p>
              Set within the artistic embrace of Casa Ballena in San José del Cabo, our restaurant is a homage to the elements. We believe in food that reflects the art and energy of Los Cabos, blending coastal elegance with global sensibility.
            </p>
            <p>
              By marrying local ingredients from the sea and land with refined international techniques, Ballena offers a gathering place where every dish tells a story of time, presence, and craft. A Grupo Hunan experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
