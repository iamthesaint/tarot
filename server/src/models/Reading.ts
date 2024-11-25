import { type Document, model, Schema } from 'mongoose';
import { type ITarotCard } from './TarotCards.js';
import { type IUser } from './Users.js';

export interface DrawnCard {
    card: ITarotCard;
    isUpright: boolean;
    position: string;
}

export interface Reflection {
    thoughts: string;
}

interface IReading extends Document {
    cards: DrawnCard[];
    reflections: Reflection[];
    date: Date;
    // reference to user
    user: IUser['_id'];
}

const reflectionSchema: Schema = new Schema({
    thoughts: {
        type: String,
        required: true,
    },
});

const drawnCardSchema: Schema = new Schema({
    card: {
        type: Schema.Types.ObjectId,
        ref: 'TarotCard',
    },
    isUpright: {
        type: Boolean,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
});

const readingSchema: Schema = new Schema({
    cards: [drawnCardSchema],
    reflections: [reflectionSchema],
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});
  

const Reading = model<IReading>('Reading', readingSchema);


export { type IReading, readingSchema };
export default Reading;
