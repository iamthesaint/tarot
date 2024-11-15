import React, { useState, useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
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
  dropAreaRef: React.RefObject<HTMLDivElement>;
}> = ({ card, index, onClick, selected, flipped, dropAreaRef }) => {
  const [dragging, setDragging] = useState(false);

  const [{ x, y, transform, opacity }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  }));

  const bind = useDrag(({ down, movement: [mx, my], memo = [x.get(), y.get()] }) => {
    setDragging(down);
    if (!down) {
      // check if the card is dropped within the drop area
      const dropArea = dropAreaRef?.current?.getBoundingClientRect();
      const cardArea = {
        left: memo[0] + mx,
        top: memo[1] + my,
        right: memo[0] + mx + 150, 
        bottom: memo[1] + my + 250,
      };

      if (
        dropArea &&
        cardArea.left >= dropArea.left &&
        cardArea.right <= dropArea.right &&
        cardArea.top >= dropArea.top &&
        cardArea.bottom <= dropArea.bottom
      ) {
        api.start({ x: mx + memo[0], y: my + memo[1] });
      } else {
        api.start({ x: 0, y: 0 });
      }
    } else {
      api.start({ x: mx + memo[0], y: my + memo[1] });
    }
    return memo;
  });

  return (
    <animated.div
    {...bind()}
    onClick={onClick}
    className={`tarot-card ${selected ? "selected" : ""}`}
    style={{
      x,
      y,
      transform: `rotate(${index * 8 - 100}deg)`, // fan cards
      position: "absolute",
      left: "65%",
      top: "100px",
      transformOrigin: "bottom center",
      touchAction: "none",
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
        <div className="card-back">✨
        </div>
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
      console.log("Fetched tarot cards:", data.tarotCards);
    },
  });

  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );
  const dropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.tarotCards) {
      // randomly select 50 unique cards from the full deck
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
    const position = card.isUpright ? "upright" : "reversed";

    switch (card.position) {
      case "past":
        return `Drawn in the past in the ${position} position, the ${name} represents ${meaning}. This drawing suggests that the past has had a significant influence on your current happenings, shaping things yet to come.`;
      case "present":
        return `Currently, ${position} ${name} in the present space indicates ${meaning}. It represents the current state of affairs and the energy surrounding current situations.`;
      case "future":
        return `In the future, ${name} in the ${position} position forecasts ${meaning}. This drawing represents the potential outcome of the situation and what may come to pass.`;
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
            dropAreaRef={dropAreaRef}
          />
        ))}
      </div>
      <div className="drop-area" ref={dropAreaRef}>
        <h2>Draw Three Cards and Drop Here:</h2>
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
