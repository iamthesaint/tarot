// server/src/seeds/seed.ts

// server/seed.ts
import mongoose from 'mongoose';
import TarotCard from '../models/TarotCards.js';
import tarotData from '../seeds/tarotData.json';
<<<<<<< HEAD
// import cleanDB from '../seeds/cleanDb.js';
=======
>>>>>>> 3048c26baaa42248e80c73ed464a1176cc430f41
import db from '../config/connection';

// Define the cleanDB function
const cleanDB = async () => {
  await mongoose.connection.dropDatabase();
};

const seedDatabase = async () => {
  try {
    await db();
    // await cleanDB();

    await TarotCard.insertMany(tarotData);
    console.log('Successfully seeded tarot cards! 🌙 🪐');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
