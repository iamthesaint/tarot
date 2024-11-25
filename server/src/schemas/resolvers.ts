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

interface ReadingArgs {
  readingData: {
    date: string;
    cards: Array<{
      card: {
        _id: string;
        name: string;
        description: string;
        suit: string;
        uprightMeaning: string;
        reversedMeaning: string;
        image: string;
      };
      isUpright: boolean;
      position: string;
    }>;
    reflections: Array<{
      thoughts: string;
    }>;
  };
  userId: string;
}

interface GetReadingArgs {
  userId?: string;
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

    //get saved readings
    getSavedReadings: async (
      _parent: any,
      _args: GetReadingArgs,
      context: any
    ) => {
      if (!context.user) {
        throw new Error("You must be logged in to view saved readings.");
      }
      return await Reading.find({ user: context.user._id })
        .populate({
          path: "cards.card",
          select:
            "_id name description suit uprightMeaning reversedMeaning image",
        })
        .populate("user", "_id username");
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

    //save reading
    saveReading: async (_parent: any, args: ReadingArgs, context: any) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      const { readingData } = args;

      try {
        const newReading = await Reading.create({
          // record the date and time of the reading when it was saved
          date: new Date().toISOString(),
          cards: readingData.cards.map((card) => ({
            card: card.card._id,
            isUpright: card.isUpright,
            position: card.position,
          })),
          reflections: readingData.reflections.map((reflection) => ({
            thoughts: reflection.thoughts,
          })),
          user: context.user._id,
        });

        return (await newReading.populate("user")).populate({
          path: "cards.card",
          select:
            "_id name description suit uprightMeaning reversedMeaning image",
        });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to save reading");
      }
    },

    deleteReading: async (
      _parent: any,
      { readingId }: { readingId: string },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      return await Reading.findOneAndDelete({
        _id: readingId,
        user: context.user._id,
      });      
    },
  },
};

export default resolvers;
