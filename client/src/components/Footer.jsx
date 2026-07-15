import { useEffect, useState } from 'react';
import api from '../services/api';

const Footer = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    let active = true;
    const fetchPartners = async () => {
      try {
        const res = await api.get('/content/partners');
        if (active && res.data?.data) {
          setPartners(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch partners', error);
      }
    };
    fetchPartners();
    return () => { active = false; };
  }, []);

  const columns = [
    {
      title: 'Company',
      links: ['About Lunix', 'Careers', 'Press Office', 'Investor Relations'],
    },
    {
      title: 'Explore',
      links: ['Overview', 'Corporate structure', 'Global services', 'Leadership'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Accessibility'],
    },
    {
      title: 'Connect',
      links: ['Twitter', 'LinkedIn', 'Instagram', 'YouTube'],
    },
  ];

  return (
    <footer className="w-full">
      {/* Block Tier 1: Feedback callout strip */}
      <div className="bg-[#000000] pt-12 pb-6 px-4 md:px-8 border-b border-f1-black">
        <div className="bg-f1-red text-white rounded-xl py-12 md:py-20 px-8 md:px-16 flex flex-col items-start max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-[5.5rem] font-black uppercase leading-[0.95] tracking-tight">
            HELP SHAPE THE LUNIX<br className="hidden md:block" /> WEBSITE
          </h2>
          <p className="mt-6 mb-8 text-[15px] font-medium tracking-wide">
            Take a few minutes to tell us what you think.
          </p>
          <button className="bg-white text-black font-extrabold text-[15px] py-2.5 px-8 rounded-full hover:bg-zinc-200 transition-colors">
            Let's go
          </button>
        </div>
      </div>

      {/* Block Tier 2: Partners banner grid */}
      <div className="bg-[#111115] py-12 px-4 md:px-8 border-b border-f1-border-grey">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-3xl md:text-[2rem] font-black uppercase tracking-tighter text-white">OUR PARTNERS</h3>
            <a href="#" className="text-white text-[15px] font-bold hover:text-f1-red transition-colors">View all</a>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 md:gap-16 mt-2">
            {partners.length > 0 ? partners.map((partner) => (
              partner.link && partner.link !== '#' ? (
                <a key={partner._id} href={partner.link} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0">
                  <img src={partner.imageUrl} alt={partner.name} className="h-8 md:h-12 object-contain" />
                </a>
              ) : (
                <div key={partner._id} className="opacity-70 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0">
                  <img src={partner.imageUrl} alt={partner.name} className="h-8 md:h-12 object-contain" />
                </div>
              )
            )) : (
              <p className="text-zinc-500 text-sm">No partners available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Block Tier 3: Primary links base */}
      <div className="bg-[#000000] py-14 px-8 text-xs text-f1-text-muted font-medium font-sans border-t border-f1-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-black uppercase mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-f1-red transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto border-t border-f1-border-grey mt-8 pt-6">
          &copy; {new Date().getFullYear()} Lunix Enterprise. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
