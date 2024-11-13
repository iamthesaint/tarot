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

  // 3 card draw with random orientation
  const drawThreeCards = () => {
    const selectedCards: DrawnCard[] = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
      const isUpright = Math.random() > 0.5; // true for upright, false for reversed
      selectedCards.push({ card, isUpright });
    }
    setDrawnCards(selectedCards);
  };

  // animation settings for each card
  const springs = useSpring({
    from: { opacity: 0, transform: "rotateY(90deg)" },
    to: { opacity: 1, transform: "rotateY(0deg)" },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="reading-container">
      <h1>Three-Card Tarot Reading</h1>
      <button onClick={drawThreeCards}>Draw 3 Cards</button>

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
