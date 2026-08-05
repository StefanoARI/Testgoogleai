import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Concept from './components/Concept';
import MenuHighlights from './components/MenuHighlights';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ReservationForm from './components/ReservationForm';

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Concept />
        <MenuHighlights />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-sand-100 selection:bg-stone-900 selection:text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/reserve" element={<ReservationForm />} />
      </Routes>
    </div>
  );
}
