require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const { User } = require('../src/models/User');

const seedAdmin = async () => {
  try {
    // connect to DB using the env variable
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lunix');
    
    let admin = await User.findOne({ email: 'admin@lunix.com' });
    if (!admin) {
      await User.create({
        name: 'Admin',
        email: 'admin@lunix.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin user:', err);
    process.exit(1);
  }
};

seedAdmin();
