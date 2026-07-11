const Navbar = () => {
  const utilityLinks = ['Tickets', 'Editors Pick', 'Betting'];
  const mainLinks = ['Overview', 'Corporate structure', 'Global services', 'Leadership'];

  return (
    <header className="w-full bg-zinc-950 text-zinc-300 border-b border-zinc-800">
      {/* Tier 1: Top utility bar */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-end gap-6 text-xs">
          {utilityLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Tier 2: Main nav */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="#" className="text-2xl font-extrabold tracking-tight text-white">
            Lunix
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {mainLinks.map((link) => (
              <a key={link} href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="text-sm font-medium text-white hover:text-zinc-300 transition-colors"
          >
            Contact HQ
          </a>
        </div>
      </div>

      {/* Tier 3: Sub-nav / action bar */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4 text-zinc-400">
            <span>E 1 | 15 July</span>
            <a href="#" className="font-semibold text-zinc-200 hover:text-white transition-colors">
              KUTUS &gt;
            </a>
          </div>

          <a
            href="#"
            className="inline-flex items-center px-5 py-2 bg-white text-zinc-950 text-sm font-semibold rounded-sm hover:bg-zinc-200 transition-colors"
          >
            Get Ticket
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
