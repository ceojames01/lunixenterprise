require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const { Schedule } = require('./src/models/Schedule');

const fixSchedule = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const schedule = await Schedule.findOne();
    if (schedule) {
      let modified = false;
      schedule.sessions.forEach(session => {
        if (session.date && session.date.includes(' ')) {
          const parts = session.date.split(' ');
          session.date = parts[0];
          session.month = parts.slice(1).join(' ');
          modified = true;
        }
      });
      if (modified) {
        await schedule.save();
        console.log('Successfully fixed schedule dates to be stacked vertically!');
      } else {
        console.log('No malformed dates found.');
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixSchedule();
