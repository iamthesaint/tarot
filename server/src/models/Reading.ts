import { type Document, model, Schema } from 'mongoose';
import TarotCard from './TarotCards';

export interface IReadings extends Document {
  cards: TarotCard[];
  description: string;
  suit: string;
  uprightMeaning: string;
  reversedMeaning: string;
  image?: string;
}

export interface IReflections extends Document {