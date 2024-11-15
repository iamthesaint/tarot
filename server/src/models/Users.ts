import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import tarotCardSchema from './TarotCards';
import tarotCardSchema from './TarotCards.js';

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    isCorrectPassword: (password: string) => Promise<boolean>;
    savedCards: string[];
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    savedCards: [tarotCardSchema],
},
{   //set to virtuals to true to include virtuals when calling toJSON
    toJSON: {
        virtuals: true
    }
}
);

//hash user password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

//compare user password
userSchema.methods.isCorrectPassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
