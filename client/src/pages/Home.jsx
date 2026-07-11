import { useEffect, useState } from 'react';
import api from '../services/api';

const fallbackPicks = [
  {
    _id: 'fb1',
    title: 'How Quantum Ledgers Are Reshaping Corporate Settlement',
    excerpt: 'A deep dive into the distributed infrastructure powering enterprise transactions.',
    category: 'Corporate',
  },
  {
    _id: 'fb2',
    title: 'The Data Edge: Betting Models That Actually Beat the Line',
    excerpt: 'Inside the quantitative frameworks turning raw telemetry into predictions.',
    category: 'Betting',
  },
  {
    _id: 'fb3',
    title: 'Ticketing Reimagined: From PDFs to Programmable Access',
    excerpt: 'Why static tickets are dying and dynamic credentials take their place.',
    category: 'Ticketing',
  },
];

const fallbackLeaders = [
  { _id: 'fl1', name: 'Elena Voss', role: 'Chief Executive Officer', bio: 'Steers enterprise platforms through hyper-growth.' },
  { _id: 'fl2', name: 'Marcus Adeyemi', role: 'Chief Technology Officer', bio: 'Distributed systems veteran focused on resilient architecture.' },
  { _id: 'fl3', name: 'Sofia Lindqvist', role: 'Head of Global Services', bio: 'Leads cross-continental delivery operations.' },
  { _id: 'fl4', name: 'Daniel Reyes', role: 'VP of Partnerships', bio: 'Architects strategic alliances into new markets.' },
];

const SectionHeading = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{children}</h2>
);

const Home = () => {
  const [picks, setPicks] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [picksRes, leadersRes] = await Promise.all([
          api.get('/content/editors-picks'),
          api.get('/content/leadership-team'),
        ]);
        if (!active) return;
        setPicks(picksRes.data.data?.length ? picksRes.data.data : fallbackPicks);
        setLeaders(leadersRes.data.data?.length ? leadersRes.data.data : fallbackLeaders);
      } catch {
        if (!active) return;
        setPicks(fallbackPicks);
        setLeaders(fallbackLeaders);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="bg-zinc-950 text-zinc-100">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="w-full h-[55vh] md:h-[60vh] rounded-lg bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-800 flex items-center justify-center">
          <span className="text-zinc-500 text-sm uppercase tracking-widest">
            Feature image / video placeholder
          </span>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-b border-zinc-900">
        <SectionHeading>Overview</SectionHeading>
        <p className="mt-4 max-w-3xl text-zinc-400 leading-relaxed">
          Lunix is a corporate platform engineered for clarity at scale. From settlement
          infrastructure to global service delivery, we build the systems that keep modern
          enterprises moving.
        </p>
      </section>

      {/* Corporate structure */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-b border-zinc-900">
        <SectionHeading>Corporate structure</SectionHeading>
        <p className="mt-4 max-w-3xl text-zinc-400 leading-relaxed">
          A deliberate operating model: centralized strategy, distributed execution. Our
          structure is built to absorb complexity without losing velocity.
        </p>
      </section>

      {/* Editors Picture */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-b border-zinc-900">
        <div className="flex items-end justify-between mb-8">
          <SectionHeading>Editors Picture</SectionHeading>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            See all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {picks.map((pick) => (
            <article
              key={pick._id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition-colors"
            >
              <div className="h-44 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Image</span>
              </div>
              <div className="p-5">
                <span className="text-[11px] uppercase tracking-widest text-zinc-500">
                  {pick.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white leading-snug">
                  {pick.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 line-clamp-3">{pick.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Global services */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-b border-zinc-900">
        <SectionHeading>Global services</SectionHeading>
        <p className="mt-4 max-w-3xl text-zinc-400 leading-relaxed">
          Always-on operations across regions. Lunix Global Services delivers consistent,
          policy-aware experiences wherever your users are.
        </p>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-b border-zinc-900">
        <SectionHeading>Leadership</SectionHeading>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div
              key={leader._id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-center"
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-500">
                {leader.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <h3 className="mt-4 font-semibold text-white">{leader.name}</h3>
              <p className="text-sm text-zinc-400">{leader.role}</p>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Action banners */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="#"
            className="group flex items-center justify-between border border-zinc-700 rounded-lg px-8 py-10 text-xl font-semibold text-white transition-all duration-200 hover:bg-white hover:text-zinc-950"
          >
            <span>Lunix betting &gt;</span>
            <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
              &gt;
            </span>
          </a>
          <a
            href="#"
            className="group flex items-center justify-between border border-zinc-700 rounded-lg px-8 py-10 text-xl font-semibold text-white transition-all duration-200 hover:bg-white hover:text-zinc-950"
          >
            <span>Lunix Tickets &#8599;</span>
            <span className="text-2xl transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
              &#8599;
            </span>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
