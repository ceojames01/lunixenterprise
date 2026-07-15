import { User, ExternalLink, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Navbar = () => {
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchEvent = async () => {
      try {
        const res = await api.get('/content/next-event');
        if (active && res.data?.data) {
          setNextEvent(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch next event', error);
      }
    };
    fetchEvent();
    return () => { active = false; };
  }, []);
  const utilityLinks = ['Tickets', 'Editors Pick', 'Betting'];
  const mainLinks = ['Overview', 'Corporate structure', 'Global services', 'Leadership'];

  return (
    <header className="w-full">
      {/* Tier 1: Top utility ribbon */}
      <div className="bg-f1-black border-b border-f1-border-grey">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-end gap-5 text-[11px] font-bold text-white uppercase">
          {utilityLinks.map((link) => (
            <a key={link} href="#" className="hover:text-f1-text-muted transition-colors">
              {link}
            </a>
          ))}
          <span className="text-zinc-600 font-normal">|</span>
          <Link
            to="/login"
            className="flex items-center justify-center bg-f1-red text-white px-5 py-1.5 rounded-full hover:brightness-110 transition-all normal-case text-[12px]"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Tier 2: Main brand banner */}
      <div className="bg-f1-red">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center">
            <img src="/logo.png" alt="Lunix Logo" className="h-20 w-auto object-contain" />
          </a>

          <nav className="hidden md:flex flex-1 justify-center gap-8 text-sm font-bold uppercase tracking-wide text-white">
            {mainLinks.map((link) => (
              <a key={link} href="#" className="hover:text-f1-black transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="text-sm font-black uppercase tracking-wide text-white hover:underline"
          >
            Contact HQ
          </a>
        </div>
      </div>

      {/* Tier 3: Event Banner */}
      <div className="bg-black text-white border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <span className="text-zinc-400 font-semibold text-[10px] md:text-xs tracking-wider uppercase">
              {nextEvent?.eventCode || 'E 1'} | {nextEvent?.dateRange || '15 July'}
            </span>
            <a href={nextEvent?.ticketLink || '#'} className="flex items-center gap-1 font-bold text-sm md:text-base hover:text-zinc-300 transition-colors mt-0.5">
              <span>{nextEvent?.location || 'KUTUS'}</span>
              <ChevronRight size={16} className="stroke-[3]" />
            </a>
          </div>

          <a
            href={nextEvent?.ticketLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#B3BFFF] text-black w-10 h-8 rounded hover:bg-indigo-300 transition-colors duration-200"
          >
            <ExternalLink size={18} className="stroke-[2.5]" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
