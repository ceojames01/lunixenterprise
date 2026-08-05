require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const { Schedule } = require('./src/models/Schedule');

const seedSchedule = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if one exists
    const existing = await Schedule.findOne();
    if (existing) {
      console.log('Schedule already exists:', existing.title);
    } else {
      await Schedule.create({
        title: 'FORMULA 1 AWS HUNGARIAN GRAND PRIX 2026',
        bannerImage: 'https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Hungary',
        isActive: true,
        sessions: [
          { date: '24', month: 'JUL', title: 'PRACTICE 1', time: '14:30 - 15:30' },
          { date: '24', month: 'JUL', title: 'PRACTICE 2', time: '18:00 - 19:00' },
          { date: '25', month: 'JUL', title: 'PRACTICE 3', time: '13:30 - 14:30' },
          { date: '25', month: 'JUL', title: 'QUALIFYING', time: '17:00 - 18:00' },
          { date: '26', month: 'JUL', title: 'RACE', time: '16:00' },
        ]
      });
      console.log('Seed successful');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedSchedule();
