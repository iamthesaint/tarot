import { type Document, model, Schema } from 'mongoose';

interface ITarotCard extends Document {
  name: string;
  description: string;
  suit: string;
  uprightMeaning: string;
  reversedMeaning: string;
  image?: string;
}

const tarotCardSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  suit: { type: String, required: true },
  uprightMeaning: { type: String, required: true },
  reversedMeaning: { type: String, required: true },
  image: { type: String, required: true },
});

const TarotCard = model<ITarotCard>('TarotCard', tarotCardSchema);

export {type ITarotCard, tarotCardSchema};
export default TarotCard;