// server/src/seeds/seed.ts

// server/seed.ts
import mongoose from 'mongoose';
import TarotCard from '../models/TarotCards.js';
import db from '../config/connection.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cleanDb from './cleanDB.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// read tarot data from the json file and insert it into the database
const dataPath = path.resolve(__dirname, '../../src/seeds/tarotData.json');
const tarotData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// console.log('tarotData:', tarotData);

const seedDatabase = async () => {
  try {
    await db();
    await cleanDb();

    await TarotCard.insertMany(tarotData);
    console.log('Successfully seeded tarot cards! 🌙 🪐');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();