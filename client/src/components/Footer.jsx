const Footer = () => {
  const partners = ['Nova', 'Orbital', 'Vertex', 'Halcyon', 'Meridian'];
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
      {/* Block 1: Website feedback ribbon */}
      <div className="bg-f1-red text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-center gap-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase">Help Shape The Lunix Website</h2>
          <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 md:w-64 min-w-0 px-4 py-2 bg-f1-black border border-black text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-black text-white font-bold uppercase tracking-wide hover:bg-zinc-800 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Block 2: Corporate partners strip */}
      <div className="bg-f1-black py-8 border-b border-f1-border-grey">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-white mb-4">Our Partner</h3>
          <div className="flex flex-wrap gap-4">
            {partners.map((name) => (
              <div
                key={name}
                className="flex h-12 px-6 items-center justify-center bg-zinc-900 border border-f1-border-grey text-zinc-400 text-sm font-semibold grayscale"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Block 3: F1-style links base */}
      <div className="bg-[#000000] py-12 text-sm text-f1-text-muted">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
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
        <div className="border-t border-f1-border-grey mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            &copy; {new Date().getFullYear()} Lunix Enterprise. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
