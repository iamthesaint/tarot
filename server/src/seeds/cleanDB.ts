import { TarotCard } from "../models/index.js";

const cleanDb = async (): Promise<void> => {
    try {
        await TarotCard.deleteMany({});
        console.log('Database cleaned.');
    } catch (error) {
        console.error('Error cleaning database:', error);
    }
    };


export default cleanDb;
