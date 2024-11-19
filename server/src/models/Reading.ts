import { type Document, model, Schema } from 'mongoose';
import { type ITarotCard, tarotCardSchema } from './TarotCards.js';
import { type IUser } from './Users.js';

export interface DrawnCard {
    card: ITarotCard;
    isUpright: boolean;
    position: 'past' | 'present' | 'future';
}

export interface Reflection {
    thoughts: string;
}

interface IReading extends Document {
    cards: DrawnCard[];
    date: string;
    reflections: Reflection[];
    user: IUser;
}

const readingSchema: Schema = new Schema({
    cards: [tarotCardSchema],
    date: { type: Date, default: Date.now },
    reflections: [{ thoughts: String }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Reading = model<IReading>('Reading', readingSchema);


export { type IReading, readingSchema };
export default Reading;
