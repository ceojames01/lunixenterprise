const Navbar = () => {
  const utilityLinks = ['Tickets', 'Editors Pick', 'Betting'];
  const mainLinks = ['Overview', 'Corporate structure', 'Global services', 'Leadership'];

  return (
    <header className="w-full">
      {/* Tier 1: Top utility bar */}
      <div className="bg-[#0b0b0f]">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-end gap-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {utilityLinks.map((link) => (
            <a key={link} href="#" className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Tier 2: Main nav (solid red) */}
      <div className="bg-f1-red">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="#" className="text-2xl font-black uppercase tracking-wider text-white">
            Lunix
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
            {mainLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/90 border-b-2 border-transparent hover:border-white pb-1 transition-colors"
              >
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

      {/* Tier 3: Sub-nav dynamic bar (white) */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4 text-zinc-900">
            <span className="font-semibold uppercase tracking-wide">E 1 | 15 July</span>
            <a href="#" className="font-bold text-zinc-900 hover:text-f1-red transition-colors">
              KUTUS &gt;
            </a>
          </div>

          <a
            href="#"
            className="inline-flex items-center px-5 py-2 bg-black text-white text-sm font-bold uppercase tracking-wide hover:bg-f1-red transition-colors"
          >
            Get Ticket
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
