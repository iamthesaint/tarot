import React, { useState } from "react";
// import { useSprings, animated } from "@react-spring/web";
import { useQuery, gql } from "@apollo/client";
import "./TarotReading.css";

export interface TarotCard {
  _id: string;
  name: string;
  description: string;
  suit: string;
  uprightMeaning: string;
  reversedMeaning: string;
}

export interface DrawnCard {
  card: TarotCard;
  isUpright: boolean;
  position: "past" | "present" | "future";
}

export const GET_TAROT_CARDS = gql`
  query GetTarotCards {
    tarotCards {
      _id
      name
      description
      suit
      uprightMeaning
      reversedMeaning
    }
  }
`;

const TarotReading: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TAROT_CARDS);
  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching cards</p>;

  const cards = data.tarotCards;

  // const handleCardClick = (card: TarotCard) => {
  //   if (selectedCards.length < 3) {
  //     const isUpright = Math.random() > 0.5;
  //     const position = ["past", "present", "future"][selectedCards.length] as "past" | "present" | "future";
  //     setSelectedCards([...selectedCards, { card, isUpright, position }]);
  //   }
  // };

  const drawThreeCards = () => {
    const drawnCards: DrawnCard[] = [];
    while (drawnCards.length < 3) {
      const card = cards[Math.floor(Math.random() * cards.length)];
      const isUpright = Math.random() > 0.5;
      const position = ["past", "present", "future"][drawnCards.length] as "past" | "present" | "future";
      drawnCards.push({ card, isUpright, position });
    }
    setSelectedCards(drawnCards);
  };

  const getPositionDescription = (card: DrawnCard): string => {
    const { name, uprightMeaning, reversedMeaning } = card.card;
    const meaning = card.isUpright ? uprightMeaning : reversedMeaning;

    switch (card.position) {
      case "past":
        return `In the past position, ${name} represents ${meaning}. This drawing suggests that the past has had a significant influence on the current situation, shaping things yet to come.`;
      case "present":
        return `Currently, in the present space, ${name} indicates ${meaning}. This card represents the current state of affairs and the energy surrounding the situation.`;
      case "future":
        return `In the future, ${name} forecasts ${meaning}. This card represents the potential outcome of the situation and what may come to pass.`;
      default:
        return "";
    }
  };

  return (
    <div className="reading-container">
    <h1>Unveil Your Path</h1>
    <button onClick={() => drawThreeCards()}>Draw Three Cards</button>
    <div className="drawn-cards">
      {selectedCards.map((card: DrawnCard) => (
        <div key={card.card._id} className="drawn-card">
          <h3>{card.card.name}</h3>
          <p>{getPositionDescription(card)}</p>
        </div>
      ))}

      {selectedCards.length === 3 && (
        <button onClick={() => setSelectedCards([])}>Reset Reading</button>
      )}
    </div>
  </div>
  );
}

export default TarotReading;