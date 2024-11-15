import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSpring, animated } from "react-spring";
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

const FlippableCard: React.FC<{
  card: TarotCard;
  index: number;
  onClick: () => void;
  selected: boolean;
  flipped: boolean;
}> = ({ card, index, onClick, selected, flipped }) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <animated.div
      onClick={onClick}
      className={`tarot-card ${selected ? "selected" : ""}`}
      style={{
        transform: `rotate(${index * 8 - 100}deg)`, // fan cards
        position: "absolute",
        left: "50%",
        top: "80%",
        transformOrigin: "bottom center",
      }}
    >
      <animated.div
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="card-back">✨</div>
      </animated.div>
      <animated.div
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateX(180deg)`),
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="card-details">
          <h3>{card.name}</h3>
          <p>{card.uprightMeaning}</p>
        </div>
      </animated.div>
    </animated.div>
  );
};

const TarotReading: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TAROT_CARDS, {
    onCompleted: (data) => {
      console.log("Fetched tarot cards:", data.tarotCards); // Log the fetched data
    },
  });

  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (data && data.tarotCards) {
      // Randomly select 50 unique cards from the full deck
      const shuffledDeck = [...data.tarotCards].sort(() => 0.5 - Math.random());
      const selectedDeck = shuffledDeck.slice(0, 50);
      setDeck(selectedDeck);
      setFlippedCards({});
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching cards</p>;

  const handleCardClick = (card: TarotCard) => {
    if (
      selectedCards.length < 3 &&
      !selectedCards.some((c) => c.card._id === card._id)
    ) {
      const isUpright = Math.random() > 0.5;
      const position = ["past", "present", "future"][selectedCards.length] as
        | "past"
        | "present"
        | "future";
      setSelectedCards([...selectedCards, { card, isUpright, position }]);
      setFlippedCards({ ...flippedCards, [card._id]: true });
    } else if (selectedCards.some((c) => c.card._id === card._id)) {
      setSelectedCards(selectedCards.filter((c) => c.card._id !== card._id));
      setFlippedCards({ ...flippedCards, [card._id]: false });
    }
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

  const resetReading = () => {
    setSelectedCards([]);
    setFlippedCards({});
  };

  return (
    <div className="reading-container">
      <h1>Unveil Your Path</h1>
      <div className="tarot-board">
        {deck.map((card, index) => (
          <FlippableCard
            key={card._id}
            card={card}
            index={index}
            onClick={() => handleCardClick(card)}
            selected={selectedCards.some((c) => c.card._id === card._id)}
            flipped={flippedCards[card._id] || false}
          />
        ))}
      </div>
      {selectedCards.length === 3 && (
        <div className="reading-results">
          {selectedCards.map((drawnCard, index) => (
            <div key={index} className="drawn-card">
              <h2>{drawnCard.position}</h2>
              <h3>{drawnCard.card.name}</h3>
              <p>{getPositionDescription(drawnCard)}</p>
            </div>
          ))}
          <button onClick={resetReading}>Reset Reading</button>
        </div>
      )}
    </div>
  );
};

export default TarotReading;
