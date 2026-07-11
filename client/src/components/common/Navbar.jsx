const Navbar = () => {
  const utilityLinks = ['Tickets', 'Editors Pick', 'Betting'];
  const mainLinks = ['Overview', 'Corporate structure', 'Global services', 'Leadership'];

  return (
    <header className="w-full">
      {/* Tier 1: Top utility ribbon */}
      <div className="bg-f1-black border-b border-f1-border-grey">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-end gap-5 text-[11px] font-semibold text-f1-text-muted uppercase">
          {utilityLinks.map((link) => (
            <a key={link} href="#" className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Tier 2: Main brand banner */}
      <div className="bg-f1-red">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <a href="#" className="text-white font-black text-2xl tracking-tighter italic">
            LUNIX
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

      {/* Tier 3: Sub-nav action strip */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-4 text-sm text-f1-asphalt">
          <div className="flex items-center gap-3">
            <span className="font-semibold uppercase tracking-wide">E 1 | 15 July</span>
            <a href="#" className="font-black text-xs tracking-wider text-f1-asphalt hover:text-f1-red transition-colors">
              KUTUS &gt;
            </a>
          </div>

          <a
            href="#"
            className="inline-flex items-center bg-f1-black text-white px-5 py-2 uppercase font-black tracking-widest text-[11px] hover:bg-f1-red transition-colors duration-200"
          >
            Get Ticket
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
