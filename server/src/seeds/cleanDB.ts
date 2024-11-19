import { TarotCard } from "../models/index.js";

// need this file to clean the database before seeding it with new data or we end up with dupes and very large arrays
const cleanDb = async (): Promise<void> => {
    try {
        await TarotCard.deleteMany({});
        console.log('Database cleaned.');
    } catch (error) {
        console.error('Error cleaning database:', error);
    }
    };


export default cleanDb;
