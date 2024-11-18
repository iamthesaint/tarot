// server/src/schemas/resolvers.ts
import User from "../models/Users";
import Reading from "../models/Reading";
import { signToken } from "../services/auth";

interface addTarotCardArgs {
    _id: string;
    name: string;
    description: string;
    suit: string;
    uprightMeaning: string;
    reversedMeaning: string;
    image: string;
    cardId: string; // Added cardId property
}

interface UserArgs {
    userId: string;
    email: string;
    password: string;
}

const resolvers = {
    Query: { //get user
        user: async (_parents: any, { userId }: UserArgs) => {
            return await User.findOne({ _id: userId });
    },
    //if user is authenticated, return user data
    me: async (_parents: any, _args: any, context: any) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id });
        }
        throw new Error('You need to be logged in!');
    }
    },


    Mutation: {
        //add user
        addUser: async (_parents: any, args: any) => {
            const user = await User.create(args);
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        //login
        login: async (_parents: unknown, args: any) => {
            const { email, password } = args;
            const user = await User.findOne({ email });
            const passwordMatch = await user?.isCorrectPassword(password);
            if (passwordMatch && user) {
                const token = signToken(user?.username, user?.email, user?.id)
                return { token, user };
            }
            throw new Error
        },

        //save card   //todo: do I call the "card" from Reading.ts or TarotCards.ts?
        saveCard: async (_parents: unknown, { cardId }: { cardId: string }, context: any) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedCards: cardId } },
                    { new: true }
                );
            }
            throw new Error('You need to be logged in!');
        },
        //remove card
        removeCard: async (_parent: any, { cardId }: addTarotCardArgs, context: any) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedCards: cardId } },
                    { new: true }
                );
            }
            throw new Error('You need to be logged in!');
        },
        // Save Reading
        saveReading: async (_parent: any, args: any, context: any) => {
            if (context.user) {
                return Reading.create({ ...args, user: context.user._id });
            }
        },
    }
};

export default resolvers;

