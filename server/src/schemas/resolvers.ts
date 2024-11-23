// server/src/schemas/resolvers.ts
import User from "../models/Users.js";
import TarotCard from "../models/TarotCards.js";
import { signToken } from "../services/auth.js";
import Reading from "../models/Reading.js";

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
  Query: {
    //get user
    user: async (_parents: any, { userId }: UserArgs) => {
      return await User.findOne({ _id: userId });
    },
    //if user is authenticated, return user data
    me: async (_parents: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new Error("You need to be logged in!");
    },
    //get all tarot cards
    tarotCards: async () => {
      // steph added this
      return await TarotCard.find();
    },

    //get all readings
    readings: async (_parents: any, _args: any, context: any) => {
      if (context.user) {
        return Reading.find({ user: context.user._id });
      }
      throw new Error("You need to be logged in!");
    },
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
        const token = signToken(user?.username, user?.email, user?.id);
        return { token, user };
      }
      throw new Error();
    },

    //save card
    saveCard: async (
      _parents: unknown,
      { cardId }: { cardId: string },
      context: any
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedCards: cardId } },
          { new: true }
        );
      }
      throw new Error("You need to be logged in!");
    },

    //remove card
    removeCard: async (
      _parent: any,
      { cardId }: addTarotCardArgs,
      context: any
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCards: cardId } },
          { new: true }
        );
      }
      throw new Error("You need to be logged in!");
    },

    // save reading
    saveReading: async (_parent: any, { readingData }: { readingData: any }, context: any) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }
    
      try {
        const newReading = await Reading.create({
          cards: readingData.cards.map((drawnCard: any) => ({
            card: drawnCard.card,
            isUpright: drawnCard.isUpright,
            position: drawnCard.position,
          })),
          reflections: readingData.reflections.map((reflection: any) => ({
            thoughts: reflection.thoughts,
          })),
          date: readingData.date || new Date(),
          user: context.user._id,
        });
    
        return newReading.populate("user");
      } catch (err) {
        console.error(err);
        throw new Error("Failed to save reading");
      }
    }
  },
};


export default resolvers;
