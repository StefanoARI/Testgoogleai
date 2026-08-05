import { motion } from 'motion/react';

const images = [
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200", // Fine dining interior
  "https://images.unsplash.com/photo-1574516315573-010bfcdb27b9?auto=format&fit=crop&q=80&w=800", // Cabo landscape/ocean
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800", // Food detail
  "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200", // Baja landscape
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-sand-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-6">Atmosphere</h2>
          <p className="text-stone-600 font-light max-w-2xl mx-auto text-lg">
            An intersection of art, architecture, and culinary excellence within Casa Ballena.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden bg-stone-200"
            >
              <img 
                src={images[0]} 
                alt="Restaurant interior" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="overflow-hidden bg-stone-200"
            >
              <img 
                src={images[1]} 
                alt="Coastal view" 
                className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-1000 grayscale-[30%]"
              />
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-4 md:gap-8 md:pt-24">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="overflow-hidden bg-stone-200"
            >
              <img 
                src={images[2]} 
                alt="Culinary detail" 
                className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="overflow-hidden bg-stone-200"
            >
              <img 
                src={images[3]} 
                alt="Architecture" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000 sepia-[20%]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
