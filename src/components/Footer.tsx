import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="reservations" className="bg-stone-950 text-sand-200 py-24 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-serif text-3xl tracking-widest uppercase mb-6 text-white">Ballena</h2>
          <p className="text-stone-400 font-light text-sm max-w-xs leading-relaxed mb-8">
            An intersection of art, gastronomy, and the natural elements of Los Cabos. A Grupo Hunan concept located in Casa Ballena.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 border border-stone-800 rounded-full hover:bg-white hover:text-stone-900 transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="uppercase tracking-[0.2em] text-xs font-semibold mb-8 text-sand-300">Visit Us</h3>
          <ul className="space-y-6 text-sm font-light text-stone-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 mt-0.5 text-stone-500" />
              <span>Casa Ballena, <br/>San José del Cabo, <br/>B.C.S., Mexico</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-stone-500" />
              <span>+52 (624) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-stone-500" />
              <span>reservations@ballenacabo.com</span>
            </li>
          </ul>
        </div>

        {/* Hours & Booking */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="uppercase tracking-[0.2em] text-xs font-semibold mb-8 text-sand-300">Hours</h3>
          <ul className="space-y-3 text-sm font-light text-stone-400 mb-10">
            <li><span className="text-sand-200">Wed - Sun:</span> 5:30 PM - 11:00 PM</li>
            <li><span className="text-sand-200">Mon & Tue:</span> Closed</li>
          </ul>
          
          <a href="/reserve" className="w-full text-center px-8 py-4 bg-white text-stone-900 uppercase tracking-widest text-xs font-semibold hover:bg-sand-200 transition-colors">
            Make a Reservation
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-stone-600 uppercase tracking-wider">
        <p>&copy; {new Date().getFullYear()} Ballena Cabo. All Rights Reserved.</p>
        <p>A Grupo Hunan Experience</p>
      </div>
    </footer>
  );
}
