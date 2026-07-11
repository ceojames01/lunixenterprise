require('dotenv').config();
const mongoose = require('mongoose');
const { Editorial } = require('../src/models/Editorial');
const { Leader } = require('../src/models/Leader');

const editorsPicks = [
  {
    title: 'How Quantum Ledgers Are Reshaping Corporate Settlement',
    excerpt:
      'A deep dive into the distributed infrastructure quietly powering the next generation of enterprise transactions.',
    content:
      'Financial institutions are piloting quantum-resistant ledgers to settle cross-border obligations in seconds. We examine the architecture, the risks, and what it means for the modern CFO.',
    imageUrl: '',
    category: 'Corporate',
    author: 'Lunix Editorial Desk',
    isEditorsPick: true,
  },
  {
    title: 'The Data Edge: Betting Models That Actually Beat the Line',
    excerpt:
      'Inside the quantitative frameworks that turn raw match telemetry into consistent, defensible predictions.',
    content:
      'We sat down with the quants behind Lunix Betting to understand how ensemble models and live ingestion separate signal from noise in volatile markets.',
    imageUrl: '',
    category: 'Betting',
    author: 'M. Okonkwo',
    isEditorsPick: true,
  },
  {
    title: 'Ticketing Reimagined: From PDFs to Programmable Access',
    excerpt:
      'Why static tickets are dying and dynamic, policy-aware credentials are taking their place.',
    content:
      'The ticketing stack is being rebuilt around programmability. We explore how Lunix Tickets uses signed credentials to cut fraud and unlock new fan experiences.',
    imageUrl: '',
    category: 'Ticketing',
    author: 'Lunix Editorial Desk',
    isEditorsPick: true,
  },
];

const leadership = [
  {
    name: 'Elena Voss',
    role: 'Chief Executive Officer',
    bio: 'Two decades steering enterprise platforms through hyper-growth. Believes infrastructure should be invisible.',
    imageUrl: '',
    order: 1,
  },
  {
    name: 'Marcus Adeyemi',
    role: 'Chief Technology Officer',
    bio: 'Distributed systems veteran focused on resilient, low-latency architecture across global regions.',
    imageUrl: '',
    order: 2,
  },
  {
    name: 'Sofia Lindqvist',
    role: 'Head of Global Services',
    bio: 'Leads the cross-continental delivery organization keeping Lunix operations always-on.',
    imageUrl: '',
    order: 3,
  },
  {
    name: 'Daniel Reyes',
    role: 'VP of Partnerships',
    bio: 'Architects the strategic alliances that extend the Lunix ecosystem into new markets.',
    imageUrl: '',
    order: 4,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected to MongoDB for seeding.');

    await Editorial.deleteMany({});
    await Leader.deleteMany({});
    console.log('Cleared existing Editorial and Leader collections.');

    await Editorial.insertMany(editorsPicks);
    await Leader.insertMany(leadership);
    console.log(
      `Seeded ${editorsPicks.length} Editorials and ${leadership.length} Leaders.`
    );

    console.log('Seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
