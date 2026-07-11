const Footer = () => {
  const partners = ['Nova', 'Orbital', 'Vertex', 'Halcyon', 'Meridian'];

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Block 1: Shape Our Website */}
        <div>
          <h3 className="text-lg font-bold text-white">Shape Our Website</h3>
          <p className="mt-3 text-sm text-zinc-500">
            Tell us what to build next, or join the newsletter for product updates.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 min-w-0 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-zinc-950 text-sm font-semibold rounded-md hover:bg-zinc-200 transition-colors"
            >
              Send
            </button>
          </form>
        </div>

        {/* Block 2: Our Partner */}
        <div>
          <h3 className="text-lg font-bold text-white">Our Partner</h3>
          <div className="mt-4 flex flex-wrap gap-4">
            {partners.map((name) => (
              <div
                key={name}
                className="flex h-12 w-24 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 text-sm font-medium"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Block 3: Footer */}
        <div>
          <h3 className="text-lg font-bold text-white">Footer</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Legal &amp; Compliance
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Lunix Enterprise. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
