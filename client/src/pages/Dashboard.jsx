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

const fallbackArticles = [
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

const SectionHeading = ({ children }) => (
  <h2 className="font-black text-2xl uppercase border-l-4 border-f1-red pl-3 tracking-wider">
    {children}
  </h2>
);

const MediaBlock = ({ item, className = '' }) =>
  item?.imageUrl ? (
    <img src={item.imageUrl} alt={item.title} className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div className={`h-full w-full flex items-center justify-center text-xs uppercase tracking-widest text-f1-text-muted ${className}`}>
      Image
    </div>
  );

const Dashboard = () => {
  const [picks, setPicks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [picksRes, articlesRes, leadersRes] = await Promise.all([
          api.get('/content/editors-picks'),
          api.get('/content/articles'),
          api.get('/content/leadership'),
        ]);
        if (!active) return;
        setPicks(picksRes.data.data?.length ? picksRes.data.data : fallbackPicks);
        setArticles(articlesRes.data.data?.length ? articlesRes.data.data : fallbackArticles);
        setLeaders(leadersRes.data.data?.length ? leadersRes.data.data : fallbackLeaders);
      } catch {
        if (!active) return;
        setPicks(fallbackPicks);
        setArticles(fallbackArticles);
        setLeaders(fallbackLeaders);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="bg-f1-asphalt text-white">
      {/* Hero media canvas */}
      <section className="relative w-full border-b-4 border-f1-red">
        <div className="w-full aspect-[21/9] md:min-h-[460px] bg-gradient-to-br from-zinc-800 via-f1-asphalt to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-12">
          <div className="bg-f1-black/80 border-l-4 border-f1-red p-4 max-w-xl backdrop-blur-sm">
            <span className="text-f1-red text-xs font-bold uppercase tracking-[0.2em]">Featured</span>
            <h1 className="text-3xl md:text-5xl font-black uppercase mt-2 leading-[1.05]">
              The Engine Behind Modern Enterprise
            </h1>
          </div>
        </div>
      </section>

      {/* Main layout track */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-16">
        {/* Section A: Overview */}
        <section>
          <SectionHeading>Overview</SectionHeading>
          <div className="h-px w-full bg-f1-border-grey mt-4" />
          <p className="mt-4 max-w-3xl text-f1-text-muted leading-relaxed">
            Lunix is a corporate platform engineered for clarity at scale. From settlement
            infrastructure to global service delivery, we build the systems that keep modern
            enterprises moving.
          </p>
        </section>

        {/* Section B: Corporate structure */}
        <section>
          <SectionHeading>Corporate structure</SectionHeading>
          <div className="h-px w-full bg-f1-border-grey mt-4" />
          <p className="mt-4 max-w-3xl text-f1-text-muted leading-relaxed">
            A deliberate operating model: centralized strategy, distributed execution. Our
            structure is built to absorb complexity without losing velocity.
          </p>
        </section>

        {/* Section C: Editors Picture */}
        <section>
          <div className="flex justify-between items-end w-full">
            <SectionHeading>Editors Picture</SectionHeading>
            <a
              href="#"
              className="text-f1-red text-xs uppercase tracking-widest font-bold font-sans hover:text-white transition-colors"
            >
              See all &gt;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {picks.map((pick) => (
              <article
                key={pick._id}
                className="bg-f1-card-bg rounded-none border-t-4 border-f1-red overflow-hidden group relative flex flex-col transition-all duration-300 hover:shadow-2xl"
              >
                <div className="h-48 overflow-hidden">
                  <MediaBlock
                    item={pick}
                    className="group-hover:scale-105 transition-transform duration-500 ease-linear"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-widest text-f1-red font-semibold">
                    {pick.category}
                  </span>
                  <h3 className="text-lg font-black uppercase leading-snug group-hover:text-f1-red transition-colors">
                    {pick.title}
                  </h3>
                  <p className="text-sm text-f1-text-muted">{pick.excerpt}</p>
                  {pick.author && (
                    <p className="text-xs uppercase tracking-wide text-f1-text-muted">{pick.author}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section>
          <SectionHeading>Latest Articles</SectionHeading>
          <ul className="mt-6 divide-y divide-f1-border-grey">
            {articles.slice(0, 5).map((item) => (
              <li key={item._id}>
                <a
                  href="#"
                  className="group flex items-center gap-4 py-4 hover:bg-f1-card-bg transition-colors"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-f1-card-bg">
                    <MediaBlock
                      item={item}
                      className="group-hover:scale-105 transition-transform duration-500 ease-linear"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase tracking-widest text-f1-red font-semibold">
                      {item.category}
                    </span>
                    <h3 className="truncate text-base font-bold uppercase text-white group-hover:text-f1-red transition-colors">
                      {item.title}
                    </h3>
                    {item.author && (
                      <p className="text-xs uppercase tracking-wide text-f1-text-muted">{item.author}</p>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Section D: Global services */}
        <section>
          <SectionHeading>Global services</SectionHeading>
          <div className="h-px w-full bg-f1-border-grey mt-4" />
          <p className="mt-4 max-w-3xl text-f1-text-muted leading-relaxed">
            Always-on operations across regions. Lunix Global Services delivers consistent,
            policy-aware experiences wherever your users are.
          </p>
        </section>

        {/* Section E: Leadership */}
        <section>
          <SectionHeading>Leadership</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {leaders.map((leader) => (
              <div
                key={leader._id}
                className="bg-f1-card-bg border-t-4 border-f1-red p-5 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-zinc-700 to-f1-asphalt border border-f1-border-grey">
                  {leader.imageUrl ? (
                    <img src={leader.imageUrl} alt={leader.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-f1-text-muted text-sm font-black">
                      {leader.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-base font-black uppercase text-white">{leader.name}</h3>
                <p className="text-sm text-f1-red font-semibold">{leader.role}</p>
                <p className="mt-2 text-xs text-f1-text-muted leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dual high-contrast banners */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <a
            href="#"
            className="border border-f1-border-grey bg-transparent p-6 flex justify-between items-center cursor-pointer group hover:bg-white hover:text-f1-asphalt transition-colors duration-200"
          >
            <span className="font-bold uppercase text-white group-hover:text-f1-asphalt">
              Lunix betting &gt;
            </span>
          </a>
          <a
            href="#"
            className="border border-f1-border-grey bg-transparent p-6 flex justify-between items-center cursor-pointer group hover:bg-white hover:text-f1-asphalt transition-colors duration-200"
          >
            <span className="font-bold uppercase text-white group-hover:text-f1-asphalt">
              Lunix Tickets &#8599;
            </span>
          </a>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
