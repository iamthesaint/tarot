export interface TarotCard {
    _id: string;
    name: string;
    description: string;
    suit: string;
    uprightMeaning: string;
    reversedMeaning: string;
    image: string;
  }
  
  export interface DrawnCard {
    card: TarotCard;
    isUpright: boolean;
    position: "past" | "present" | "future";
  }
  
  export interface Reflection {
    thoughts: string;
  }
  
  export interface Reading {
    _id: string;
    date: string;
    cards: DrawnCard[];
    reflections: Reflection[];
    user: {
      _id: string;
      username: string | null;
    };
  }
  