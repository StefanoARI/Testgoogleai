import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, LogOut, Check, X, Clock, RefreshCw } from 'lucide-react';

type Reservation = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReservations = async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reservations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      setReservations(data);
      setIsAuthenticated(true);
      setError('');
    } catch (err: any) {
      setError('Access denied. Please check your password.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReservations(password);
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-200 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-sand-100 p-8 shadow-xl border border-sand-300"
        >
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-stone-900 mb-2">Admin Portal</h1>
            <p className="text-stone-500 text-sm font-light">Enter password to access reservations.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-600 text-xs text-center">{error}</p>}
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full bg-transparent border-b border-stone-300 focus:border-stone-900 py-2 outline-none transition-colors text-center"
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-900 text-sand-100 uppercase tracking-widest text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          <button 
             onClick={() => navigate('/')} 
             className="w-full mt-6 flex justify-center items-center text-stone-500 hover:text-stone-900 transition-colors text-xs uppercase tracking-widest"
           >
             <ChevronLeft size={14} className="mr-1" /> Return Home
           </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 pb-6 border-b border-stone-300">
          <div>
            <h1 className="font-serif text-3xl text-stone-900">Reservations Dashboard</h1>
            <p className="text-stone-500 font-light mt-2">Manage all booking requests</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fetchReservations(password)}
              className="p-2 text-stone-500 hover:text-stone-900 transition-colors border border-transparent hover:border-stone-300 rounded-full"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                setPassword('');
              }}
              className="flex items-center gap-2 px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white transition-all text-xs uppercase tracking-widest font-semibold"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <div className="bg-white shadow-sm border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="text-xs text-stone-900 uppercase tracking-wider bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Guest</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Party</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-stone-400 font-light italic">
                      No reservations found.
                    </td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-stone-900">{res.name}</div>
                        {res.specialRequests && (
                          <div className="text-xs text-stone-400 mt-1 truncate max-w-[200px]" title={res.specialRequests}>
                            Note: {res.specialRequests}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div>{res.email}</div>
                        <div className="text-xs text-stone-400">{res.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{new Date(res.date).toLocaleDateString()}</div>
                        <div className="text-xs text-stone-400">{res.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          res.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                          res.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {res.status === 'confirmed' && <Check size={12} />}
                          {res.status === 'cancelled' && <X size={12} />}
                          {res.status === 'pending' && <Clock size={12} />}
                          <span className="capitalize">{res.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {res.status !== 'confirmed' && (
                          <button 
                            onClick={() => updateStatus(res.id, 'confirmed')}
                            className="inline-flex p-1.5 text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200 rounded transition-colors"
                            title="Confirm"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button 
                            onClick={() => updateStatus(res.id, 'cancelled')}
                            className="inline-flex p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded transition-colors"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
