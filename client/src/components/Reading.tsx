// client/src/components/Reading.tsx

import React, { useState, useEffect } from "react";
import { fetchTarotCards } from "../utils/api";
import { useSpring, animated } from "react-spring";

interface TarotCard {
  _id: string;
  name: string;
  description: string;
  suit: string;
  uprightMeaning: string;
  reversedMeaning: string;
  image: string;
}

interface DrawnCard {
  card: TarotCard;
  isUpright: boolean;
  position: 'past' | 'present' | 'future';
}

const Reading: React.FC = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);

  // fetch tarot cards from the backend
  useEffect(() => {
    async function getCards() {
      try {
        const data = await fetchTarotCards();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
    getCards();
  }, []);

// 3 card drawing

const drawThreeCardReading = () => {
  const selectedCards: DrawnCard[] = (['past', 'present', 'future'] as ('past' | 'present' | 'future')[]).map((position) => {
    const card = cards[Math.floor(Math.random() * cards.length)];
    const isUpright = Math.random() > 0.5;
    return { card, isUpright, position };
  });
  setDrawnCards(selectedCards);
};

// get position
function getPositionDescription(card: DrawnCard): string {
  const { name, uprightMeaning, reversedMeaning } = card.card;
  const meaning = card.isUpright ? uprightMeaning : reversedMeaning;

switch (card.position) {
    case 'past':
      return `In the past position, ${name} represents ${meaning}. This drawing suggests that the past has has had a significant influence on the current situation, and has shaped things yet to come.`;
    case 'present':
      return `Currently, in the present space, ${name} indicates ${meaning}. This card represents the current state of affairs, and the energy surrounding the situation.`;
    case 'future':
      return `In the future, ${name} forecasts of ${meaning}. This card represents the potential outcome of the situation, and what may come to pass.`;
    default:
      return '';
  }
}

  // animation settings for each card
  const springs = useSpring({
    from: { opacity: 0, transform: "rotateY(90deg)" },
    to: { opacity: 1, transform: "rotateY(0deg)" },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="reading-container">
      <h1>Three-Card Tarot Reading</h1>
      <button onClick={drawThreeCardReading}>Draw 3 Cards...</button>

      <div className="reading-results">
        {drawnCards.map(({ card, isUpright }, index) => (
          <animated.div key={index} style={springs} className="card">
            <img
              src={card.image}
              alt={card.name}
              className={`card-image ${!isUpright ? "reversed" : ""}`}
            />
            <h2>{card.name}</h2>
            <p>
              <strong>{isUpright ? "Upright" : "Reversed"}:</strong>{" "}
              {isUpright ? card.uprightMeaning : card.reversedMeaning}
            </p>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Reading;
