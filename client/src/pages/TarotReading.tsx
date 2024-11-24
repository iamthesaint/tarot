import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import ReadingModal from "../components/ReadingModal";
import { SAVE_READING } from "../utils/mutations";
import { GET_TAROT_CARDS } from "../utils/queries";
import { DrawnCard, TarotCard } from "../utils/types";
import "./TarotReading.css";

// tarot card type
// export interface TarotCard {
//   _id: string;
//   name: string;
//   description: string;
//   suit: string;
//   uprightMeaning: string;
//   reversedMeaning: string;
//   image: string;
// }

// drawn card type
// export interface DrawnCard {
//   card: TarotCard;
//   isUpright: boolean;
//   position: "past" | "present" | "future";
// }

// flippable card component
const FlippableCard: React.FC<{
  card: TarotCard;
  index: number;
  onClick: () => void;
  selected: boolean;
  flipped: boolean;
  canFlip: boolean;
  isUpright?: boolean;
  className?: string;
  position?: "past" | "present" | "future";
}> = ({
  card,
  index,
  onClick,
  selected,
  flipped,
  canFlip,
  isUpright,
  className,
}) => {
  const [{ x, y, transform, opacity }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    opacity: flipped && canFlip ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped && canFlip ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  }));

  const bind = useDrag(
    ({
      down,
      movement: [mx, my],
      memo = [x.get(), y.get()],
    }: {
      down: boolean;
      movement: [number, number];
      memo?: [number, number];
    }) => {
      api.start({ x: mx + memo[0], y: my + memo[1], immediate: down });
      return memo;
    }
  );

  useEffect(() => {
    if (canFlip) {
      api.start({
        transform: `perspective(600px) rotateY(${
          flipped && canFlip ? 0 : 0
        }deg)`,
        opacity: flipped ? 1 : 0,
      });
    }
  }, [flipped, canFlip]);



  return (
    <animated.div
      {...(!selected ? bind() : {})}
      onClick={onClick}
      className={`tarot-card ${selected ? "selected" : ""} ${className || ""}`}
      style={{
        x: selected ? undefined : x,
        y: selected ? undefined : y,
        transform: transform.to((t) => `${t} rotate(${index * 10 - 4}deg)`),
        left: "50%",
        top: "25%",
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
        <div className="card-back"></div>
      </animated.div>

      <div className="card-front">
        <img src={card.image} alt={card.name} />
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reflections, setReflections] = useState<string[]>([]);

  // save reading mutation
  const [saveReading] = useMutation(SAVE_READING);

  const handleSaveReading = () => {
    const readingData = {
      cards: selectedCards.map((drawnCard) => ({
        card: {
          _id: drawnCard.card._id,
          name: drawnCard.card.name,
          description: drawnCard.card.description,
          suit: drawnCard.card.suit,
          uprightMeaning: drawnCard.card.uprightMeaning,
          reversedMeaning: drawnCard.card.reversedMeaning,
          image: drawnCard.card.image,
        },
        isUpright: drawnCard.isUpright,
        position: drawnCard.position,
      })),
      reflections: reflections.map((thought) => ({
        thoughts: thought,
      })),
      date: new Date().toISOString(),
    };

    saveReading({ variables: { readingData } })
      .then((response) => {
        console.log("Saved reading:", response.data.saveReading);
      })
      .catch((err) => {
        console.error("Error saving reading:", err);
      });

    resetReading();
    // clear reflections
    setReflections([]);
  };

  useEffect(() => {
    if (selectedCards.length === 3) {
      setAllCardsDrawn(true);
      setTimeout(() => setIsModalOpen(true), 600);
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
      const position = ["past", "present", "future"][selectedCards.length] as
        | "past"
        | "present"
        | "future";
      setSelectedCards([...selectedCards, { card, isUpright, position }]);
      setFlippedCards({ ...flippedCards, [card._id]: true });
      if (selectedCards.length === 3) {
        setAllCardsDrawn(true);
        setTimeout(() => setIsModalOpen(true), 600);
    }
  }
};

  const resetReading = () => {
    setSelectedCards([]);
    setIsModalOpen(false);
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
    setReflections([]); // clear reflections
  };

  const getPositionDescription = (card: DrawnCard): string => {
    const { name, uprightMeaning, reversedMeaning } = card.card;
    const meaning = card.isUpright ? uprightMeaning : reversedMeaning;
    const position = card.isUpright ? "upright" : "reversed";

    switch (card.position) {
      case "past":
        return `Drawn in the ${position} position, ${name} represents ${meaning}. Pulling this card in the past space suggests that the past has had a significant influence on your current happenings, shaping things yet to come.`;
      case "present":
        return `${position} ${name} in the present space indicates ${meaning}. It represents the current state of affairs and the energy surrounding current situations.`;
      case "future":
        return `In the future, ${name} in the ${position} position forecasts ${meaning}. This drawing represents the potential outcome of the situation and what may come to pass.`;
      default:
        return "";
    }
  };

  return (
    <>
      <div className="nav-links">
        <a href="/">Return Home</a>
        <a href="account">My Account</a>
      </div>

      <div className="topbar">
      <h2 className="reading-title">Draw Your Tarot Cards</h2>
      <p className="reading-instructions">
        click on or drag your chosen cards from the deck - once you have drawn
        three cards, your tarot reading will be revealed.
      </p>
      </div>

      <div className="reading-container">
        <div className="tarot-board">
          {deck.map((card, index) => {
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
                isUpright={drawnCard.isUpright}
                position={drawnCard.position}
              />
            ))}
          </div>
        )}

        {selectedCards.length === 3 && (
          <ReadingModal
            isOpen={isModalOpen}
            onClose={resetReading}
            onSave={handleSaveReading}
          >
            {/* text reading section */}
            <h2 className="modal-title"><strong>Your Deck's Wisdom Revealed</strong></h2>
            <div className="reading-results">
              {/* cards display */}
              <div className="drawn-cards-modal">
                {selectedCards.map((drawnCard, index) => (
                  <FlippableCard
                    key={`${drawnCard.card._id}-${index}`}
                    card={drawnCard.card}
                    index={index}
                    onClick={() => {}}
                    selected
                    flipped
                    canFlip
                    isUpright={drawnCard.isUpright}
                    className="modal-card"
                    position={drawnCard.position}
                  />
                ))}
              </div>
              {selectedCards.map((drawnCard, index) => (
                <div key={`${drawnCard.card._id}-${index}`}>
                    <h3>{drawnCard.position.toUpperCase()}: {drawnCard.card.name} {drawnCard.isUpright ? "Upright" : "Reversed"}</h3>
                    <a href={`/cards/${drawnCard.card._id}`} style={{ fontFamily: "Unna, serif" }} target="_blank" rel="noopener noreferrer">
                    Learn more about {drawnCard.card.name}
                  </a>
                    <h6><i>Suit: {drawnCard.card.suit.toLowerCase()}</i></h6>
                    <p style={{ fontFamily: "Unna, serif" }}>{getPositionDescription(drawnCard).toLowerCase()}</p>
                    {index < selectedCards.length - 1 && <hr />} 
                </div>
              ))}
            </div>
            {/* reflection input */}
            <div className="reflection-input">
              <h3>Add a Reflection</h3>
              <textarea
                placeholder="how do these cards speak to your current path? what insights does this drawing awaken in you? reflect on your life's journey, record your thoughts here, and choose 'SAVE READING & REFLECTION' below."
                value={reflections.join("\n")}
                onChange={(e) => {
                  setReflections(e.target.value.split("\n"));
                }}
              />
            </div>
          </ReadingModal>
        )}
      </div>
    </>
  );
};

export default TarotReading;
