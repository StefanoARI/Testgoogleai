import { motion } from 'motion/react';

const menuHighlights = [
  {
    category: "To Share",
    items: [
      { name: "House Guacamole", description: "Pistachio, pomegranate, fresh totopos", price: "$18" },
      { name: "Bluefin Tuna Tostada", description: "Ponzu, avocado mousse, crispy leek", price: "$24" }
    ]
  },
  {
    category: "Fire To Chopsticks",
    items: [
      { name: "Lobster Spring Rolls", description: "Sweet chili ginger glaze, fresh herbs", price: "$28" },
      { name: "Kung Pao Chicken", description: "Peanuts, dry chili, scallions", price: "$32" }
    ]
  },
  {
    category: "Our Greens",
    items: [
      { name: "Burrata & Heirloom", description: "Balsamic caviar, basil oil, toasted pine nuts", price: "$22" },
      { name: "Charred Caesar", description: "Parmigiano Reggiano, anchovy dressing, sourdough croutons", price: "$19" }
    ]
  },
  {
    category: "Encore",
    items: [
      { name: "Five-Spice Chocolate Cake", description: "Dark chocolate ganache, mandatory sharing", price: "$16" },
      { name: "Tres Leches", description: "Vanilla bean, toasted meringue, berries", price: "$14" }
    ]
  }
];

export default function MenuHighlights() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-stone-900 text-sand-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-sand-300 uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">Gastronomy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">Selected Highlights</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {menuHighlights.map((section, sectionIdx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: sectionIdx * 0.1 }}
            >
              <h3 className="text-xl font-serif uppercase tracking-widest text-sand-300 mb-8 border-b border-sand-800 pb-4">
                {section.category}
              </h3>
              <ul className="space-y-8">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg tracking-wide">{item.name}</h4>
                      <span className="text-sand-300 font-serif">{item.price}</span>
                    </div>
                    <p className="text-sm text-stone-400 font-light">{item.description}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8 }}
           className="mt-20 flex justify-center"
        >
          <a href="#" className="px-8 py-4 border border-sand-300 text-sand-100 hover:bg-sand-300 hover:text-stone-900 transition-all duration-300 uppercase tracking-widest text-sm">
            View Full Menu
          </a>
        </motion.div>
      </div>
    </section>
  );
}
