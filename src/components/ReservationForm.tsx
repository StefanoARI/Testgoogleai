import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReservationForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create reservation');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-200 flex flex-col items-center justify-center py-24 px-6 relative">
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-6 md:left-12 flex items-center text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-widest text-xs font-semibold"
      >
        <ChevronLeft size={16} className="mr-2" />
        Return Home
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-sand-100 p-8 md:p-12 shadow-xl border border-sand-300"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-stone-900 mb-4">Make a Reservation</h1>
          <p className="text-stone-600 font-light">Join us for an unforgettable culinary experience.</p>
        </div>

        {success ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-serif text-green-700 mb-4">Request Received</h2>
            <p className="text-stone-600 font-light mb-8">We will contact you shortly to confirm your reservation.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-stone-900 text-sand-100 uppercase tracking-widest text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm border border-red-200">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Date</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Time</label>
                <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Guests</label>
                <select required name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                  <option value="9+">9+ Guests</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Special Requests (Optional)</label>
              <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={3} className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors resize-none" />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-stone-900 text-sand-100 uppercase tracking-widest text-xs font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50 mt-8"
            >
              {loading ? 'Submitting...' : 'Request Reservation'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
