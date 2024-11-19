import { gql } from '@apollo/client';


export const SAVE_CARD = gql`
    mutation saveCard($cardId: ID!) {
        saveCard(cardId: $cardId) {
        _id
        username
        email
        savedCards {
            _id
            name
            description
            suit
            uprightMeaning
            reversedMeaning
            image
        }
        }
    }
`;


export const SAVE_READING = gql`
    mutation saveReading($cards: [TarotCard] , $reflections: [String]) {
        saveReading(cards: $cards, reflections: $reflections) {
            _id
            reflections
            user {
                _id
                username
            }
        }
    }
`;


