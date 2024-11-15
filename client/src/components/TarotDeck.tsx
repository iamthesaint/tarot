// import { useState } from "react";
// import { TarotCard } from "../pages/TarotReading";
// import { GET_TAROT_CARDS } from "../pages/TarotReading";
// import { useQuery } from "@apollo/client";
// import "./TarotDeck.css";

// const TarotDeck = () => {
//   const [deck, setDeck] = useState<TarotCard[]>([]);
//   const [card, setCard] = useState<TarotCard | null>(null);

//   // use graphql query to get tarot cards
//   useQuery(GET_TAROT_CARDS, {
//     onCompleted: (data) => {
//       setDeck(data.tarotCards);
//     },
//   });

//   const drawCard = () => {
//     const randomIndex = Math.floor(Math.random() * deck.length);
//     setCard(deck[randomIndex]);
//   };

// export default TarotDeck;