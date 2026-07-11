import { useEffect, useState } from 'react';
import api from '../services/api';

const fallbackPicks = [
  {
    _id: 'fb1',
    title: 'How Quantum Ledgers Are Reshaping Corporate Settlement',
    excerpt: 'A deep dive into the distributed infrastructure powering enterprise transactions.',
    category: 'Corporate',
    author: 'Lunix Editorial Desk',
  },
  {
    _id: 'fb2',
    title: 'The Data Edge: Betting Models That Actually Beat the Line',
    excerpt: 'Inside the quantitative frameworks turning raw telemetry into predictions.',
    category: 'Betting',
    author: 'M. Okonkwo',
  },
  {
    _id: 'fb3',
    title: 'Ticketing Reimagined: From PDFs to Programmable Access',
    excerpt: 'Why static tickets are dying and dynamic credentials take their place.',
    category: 'Ticketing',
    author: 'Lunix Editorial Desk',
  },
];

const fallbackNews = [
  { _id: 'fn1', title: 'Lunix Expands Global Services Into Three New Regions', category: 'Corporate', author: 'Press Office' },
  { _id: 'fn2', title: 'Inside The Betting Desk: A Week Of Model Tuning', category: 'Betting', author: 'M. Okonkwo' },
  { _id: 'fn3', title: 'Ticketing Reimagined: Programmable Access At Scale', category: 'Ticketing', author: 'Product Team' },
  { _id: 'fn4', title: 'Leadership Roundtable: Building For The Next Decade', category: 'General', author: 'Lunix Editorial Desk' },
  { _id: 'fn5', title: 'The Partnership Playbook Behind Lunix Growth', category: 'Corporate', author: 'D. Reyes' },
];

const fallbackLeaders = [
  { _id: 'fl1', name: 'Elena Voss', role: 'Chief Executive Officer', bio: 'Steers enterprise platforms through hyper-growth.' },
  { _id: 'fl2', name: 'Marcus Adeyemi', role: 'Chief Technology Officer', bio: 'Distributed systems veteran focused on resilient architecture.' },
  { _id: 'fl3', name: 'Sofia Lindqvist', role: 'Head of Global Services', bio: 'Leads cross-continental delivery operations.' },
  { _id: 'fl4', name: 'Daniel Reyes', role: 'VP of Partnerships', bio: 'Architects strategic alliances into new markets.' },
];

const SectionHeader = ({ kicker, title, action }) => (
  <div className="flex items-end justify-between mb-8">
    <div>
      {kicker && (
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-f1-red mb-2">{kicker}</p>
      )}
      <h2 className="text-3xl md:text-4xl">{title}</h2>
    </div>
    {action}
  </div>
);

const MediaBlock = ({ item, className = '' }) =>
  item?.imageUrl ? (
    <img src={item.imageUrl} alt={item.title} className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div className={`h-full w-full flex items-center justify-center text-xs uppercase tracking-widest text-zinc-500 ${className}`}>
      Image
    </div>
  );

const Home = () => {
  const [picks, setPicks] = useState([]);
  const [news, setNews] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [picksRes, newsRes, leadersRes] = await Promise.all([
          api.get('/content/editors-picks'),
          api.get('/content/latest-news'),
          api.get('/content/leadership-team'),
        ]);
        if (!active) return;
        setPicks(picksRes.data.data?.length ? picksRes.data.data : fallbackPicks);
        setNews(newsRes.data.data?.length ? newsRes.data.data : fallbackNews);
        setLeaders(leadersRes.data.data?.length ? leadersRes.data.data : fallbackLeaders);
      } catch {
        if (!active) return;
        setPicks(fallbackPicks);
        setNews(fallbackNews);
        setLeaders(fallbackLeaders);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="bg-f1-dark text-white">
      {/* Hero */}
      <section className="relative w-full border-b-4 border-f1-red">
        <div className="w-full aspect-[21/9] md:aspect-[24/7] bg-gradient-to-br from-zinc-800 via-f1-dark to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-3xl">
          <span className="inline-block bg-f1-red text-white text-xs font-bold uppercase tracking-[0.2em] px-2 py-1 mb-4">
            Featured
          </span>
          <div className="border-l-4 border-f1-red pl-4">
            <h1 className="text-3xl md:text-6xl font-black uppercase leading-[1.05]">
              The Engine Behind Modern Enterprise
            </h1>
          </div>
          <p className="mt-4 text-zinc-300 max-w-xl">
            Settlement infrastructure, global services, and the people steering Lunix into its
            next era.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader kicker="About" title="Overview" />
        <p className="mt-2 max-w-3xl text-zinc-400 leading-relaxed">
          Lunix is a corporate platform engineered for clarity at scale. From settlement
          infrastructure to global service delivery, we build the systems that keep modern
          enterprises moving.
        </p>
      </section>

      {/* White separator */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px w-full bg-white" />
      </div>

      {/* Corporate structure */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader kicker="Organisation" title="Corporate structure" />
        <p className="mt-2 max-w-3xl text-zinc-400 leading-relaxed">
          A deliberate operating model: centralized strategy, distributed execution. Our
          structure is built to absorb complexity without losing velocity.
        </p>
      </section>

      {/* Editors Picture */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader
          kicker="Editor's Picks"
          title="Editors Picture"
          action={
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-f1-red hover:text-white transition-colors"
            >
              See all <span aria-hidden="true">&rsaquo;</span>
            </a>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {picks.map((pick) => (
            <article
              key={pick._id}
              className="group bg-f1-card-bg border-t-4 border-f1-red flex flex-col overflow-hidden hover:border-white transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <MediaBlock item={pick} className="group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-f1-red font-semibold">
                  {pick.category}
                </span>
                <h3 className="mt-2 text-lg font-black uppercase leading-snug text-white group-hover:text-f1-red transition-colors">
                  {pick.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 flex-1">{pick.excerpt}</p>
                {pick.author && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-zinc-500">{pick.author}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section className="bg-black border-y border-f1-grey-border">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <SectionHeader kicker="Latest" title="News Feed" />
          <ul className="divide-y divide-f1-grey-border">
            {news.map((item) => (
              <li key={item._id}>
                <a
                  href="#"
                  className="group flex items-center gap-4 py-4 hover:bg-f1-card-bg transition-colors"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-f1-card-bg">
                    <MediaBlock item={item} className="group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase tracking-widest text-f1-red font-semibold">
                      {item.category}
                    </span>
                    <h3 className="truncate text-base font-bold uppercase text-white group-hover:text-f1-red transition-colors">
                      {item.title}
                    </h3>
                    {item.author && (
                      <p className="text-xs uppercase tracking-wide text-zinc-500">{item.author}</p>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Global services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader kicker="Worldwide" title="Global services" />
        <p className="mt-2 max-w-3xl text-zinc-400 leading-relaxed">
          Always-on operations across regions. Lunix Global Services delivers consistent,
          policy-aware experiences wherever your users are.
        </p>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader kicker="The Team" title="Leadership" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div
              key={leader._id}
              className="group bg-f1-card-bg border-t-4 border-f1-red p-5 text-center hover:border-white transition-colors"
            >
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-zinc-700 to-f1-dark border border-f1-grey-border">
                {leader.imageUrl ? (
                  <img src={leader.imageUrl} alt={leader.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-zinc-400 text-sm font-black">
                    {leader.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-base font-black uppercase text-white">{leader.name}</h3>
              <p className="text-sm text-f1-red font-semibold">{leader.role}</p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Massive call-to-action banners */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="#"
            className="group flex items-center justify-between bg-black border border-white px-8 py-12 text-2xl font-black uppercase tracking-wide text-white transition-all duration-200 hover:bg-f1-red hover:border-f1-red"
          >
            <span>Lunix betting &gt;</span>
          </a>
          <a
            href="#"
            className="group flex items-center justify-between bg-black border border-white px-8 py-12 text-2xl font-black uppercase tracking-wide text-white transition-all duration-200 hover:bg-f1-red hover:border-f1-red"
          >
            <span>Lunix Tickets &#8599;</span>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
