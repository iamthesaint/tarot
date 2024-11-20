import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import "./TarotReading.css";

// tarot card type
export interface TarotCard {
  _id: string;
  name: string;
  description: string;
  suit: string;
  uprightMeaning: string;
  reversedMeaning: string;
  image: string;
}

// drawn card type
export interface DrawnCard {
  card: TarotCard;
  isUpright: boolean;
  position: "past" | "present" | "future";
}

// get tarot cards query
export const GET_TAROT_CARDS = gql`
  query GetTarotCards {
    tarotCards {
      _id
      name
      description
      suit
      uprightMeaning
      reversedMeaning
      image
    }
  }
`;

// flippable card component
const FlippableCard: React.FC<{
  card: TarotCard;
  index: number;
  onClick: () => void;
  selected: boolean;
  flipped: boolean;
  canFlip: boolean;
  isUpright?: boolean;
}> = ({ card, index, onClick, selected, flipped, canFlip, isUpright }) => {
  const [{ x, y, transform, opacity }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    opacity: flipped && canFlip ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped && canFlip ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  }));

  const bind = useDrag(
    ({ down, movement: [mx, my], memo = [x.get(), y.get()] }) => {
      api.start({ x: mx + memo[0], y: my + memo[1], immediate: down });
      return memo;
    }
  );

  useEffect(() => {
    if (canFlip) {
      api.start({
        transform: `perspective(600px) rotateY(${flipped && canFlip ? 0 : 0}deg)`,
        opacity: flipped ? 1 : 0,
      });
    }
  }, [flipped, canFlip]);

  return (
    <animated.div
      {...(!selected ? bind() : {})}
      onClick={onClick}
      className={`tarot-card ${selected ? "selected" : ""}`}
      style={{
        x: selected ? undefined : x,
        y: selected ? undefined : y,
        transform: transform.to((t) => `${t} rotate(${index * 8 - 10}deg)`),
        left: "50%",
        top: "120px",
        transformOrigin: "bottom center",
        touchAction: "none",
      }}
    >
      <animated.div
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform: `perspective(600px) rotateX(0deg)`,
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="card-back">✨</div>
      </animated.div>

      <div className="card-front">
        <img
          src={card.image}
          alt={card.name}
        />
      </div>
    </animated.div>

  );
};

// tarot reading component
const TarotReading: React.FC = () => {
  const { loading, error } = useQuery(GET_TAROT_CARDS, {
    onCompleted: (data) => {
      if (data && data.tarotCards) {
        setDeck([...data.tarotCards].sort(() => Math.random() - 0.5));
      }
    },
  });
  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [allCardsDrawn, setAllCardsDrawn] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 3) {
      setAllCardsDrawn(true);
    }
  }, [selectedCards]);

  if (loading) return <p>🔮 Loading Your Cards...</p>;
  if (error) return <p>There Was an Error Reading Your Cards...</p>;

  const handleCardClick = (card: TarotCard) => {
    if (
      selectedCards.length < 3 &&
      !selectedCards.some((c) => c.card._id === card._id)
    ) {
      const isUpright = Math.random() > 0.5;
      console.log(`Card: ${card.name}, Is Upright: ${isUpright}`);
      console.log(`Image URL: ${card.image}`);
      const position = ["past", "present", "future"][selectedCards.length] as
        | "past"
        | "present"
        | "future";
      setSelectedCards([...selectedCards, { card, isUpright, position }]);
      setFlippedCards({ ...flippedCards, [card._id]: true });
    }
  };

  const resetReading = () => {
    setSelectedCards([]);
    setFlippedCards({});
    setDeck((prevDeck) => {
      // re-shuffle the deck and reset state
      const updatedDeck = [...prevDeck];
      selectedCards.forEach((drawnCard) => {
        updatedDeck.push(drawnCard.card); // put drawn cards back in the deck
      });
      return updatedDeck.sort(() => Math.random() - 0.5); // re-shuffle
    });
    setAllCardsDrawn(false); // make all cards drawn = false again
  };

  const getPositionDescription = (card: DrawnCard): string => {
    const { name, uprightMeaning, reversedMeaning } = card.card;
    const meaning = card.isUpright ? uprightMeaning : reversedMeaning;
    const position = card.isUpright ? "upright" : "reversed";

    switch (card.position) {
      case "past":
        return `Drawn in the ${position} position, ${name} represents ${meaning}. Pulling this card in the past space suggests that the past has had a significant influence on your current happenings, shaping things yet to come.`;
      case "present":
        return `Currently, ${position} ${name} in the present space indicates ${meaning}. It represents the current state of affairs and the energy surrounding current situations.`;
      case "future":
        return `In the future, ${name} in the ${position} position forecasts ${meaning}. This drawing represents the potential outcome of the situation and what may come to pass.`;
      default:
        return "";
    }
  };

  return (
    <div className="reading-container">
      <h1>Unveil Your Path</h1>
      <div className="tarot-board">
        {/* display the deck of cards */}
        {deck.map((card, index) => {
          // render a card if it's not part of the drawn cards (selectedCards)
          const isDrawn = selectedCards.some(
            (drawnCard) => drawnCard.card._id === card._id
          );
          return (
            !isDrawn && (
              <FlippableCard
                key={`${card._id}-${index}`}
                card={card}
                index={index}
                onClick={() => handleCardClick(card)}
                selected={false}
                flipped={false}
                canFlip={!allCardsDrawn}
              />
            )
          );
        })}
      </div>

      {selectedCards.length > 0 && (
        <div className="drawn-cards">
          {/* display the drawn cards */}
          {selectedCards.map((drawnCard, index) => (
            <FlippableCard
              key={`${drawnCard.card._id}-${index}`}
              card={drawnCard.card}
              index={index}
              onClick={() => {}}
              selected
              flipped
              canFlip
            />
          ))}
        </div>
      )}

      {selectedCards.length === 3 && (
        <div className="reading-results">
          {selectedCards.map((drawnCard, index) => (
            <div key={index} className="drawn-card">
              <h2>{drawnCard.position.toUpperCase()}</h2>
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
