const Footer = () => {
  const partners = ['Nova', 'Orbital', 'Vertex', 'Halcyon', 'Meridian'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Legal & Compliance', 'Cookie Settings'];

  return (
    <footer className="w-full">
      {/* Block 1: Shape Our Website (red CTA) */}
      <div className="bg-f1-red">
        <div className="max-w-7xl mx-auto px-4 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white max-w-2xl leading-none">
            Help Shape The Lunix Website
          </h2>
          <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 md:w-64 min-w-0 px-4 py-3 bg-f1-dark border border-black text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wide hover:bg-zinc-800 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Block 2: Our Partner (dark grey grid) */}
      <div className="bg-f1-dark border-b border-f1-grey-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-xl font-black uppercase tracking-wider text-white mb-6">
            Our Partner
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {partners.map((name) => (
              <div
                key={name}
                className="flex h-16 items-center justify-center bg-zinc-800/60 border border-f1-grey-border text-zinc-400 text-sm font-semibold grayscale"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Block 3: Footer links (pure black) */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-black uppercase tracking-wider text-white mb-4">Lunix</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Lunix Enterprise HQ
              <br />
              1 Velocity Plaza
              <br />
              Global Operations District
            </p>
          </div>

          <div>
            <h3 className="text-lg font-black uppercase tracking-wider text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-f1-red transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black uppercase tracking-wider text-white mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                <li key={social}>
                  <a href="#" className="text-zinc-400 hover:text-f1-red transition-colors">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-f1-grey-border">
          <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Lunix Enterprise. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
