import { gql } from "@apollo/client";

// Query to get the authenticated user
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

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

// get saved readings query
export const GET_SAVED_READINGS = gql`
  query GetSavedReadings {
    getSavedReadings {
      _id
      date
      cards {
        isUpright
        position
        card {
          _id
          name
          description
          suit
          uprightMeaning
          reversedMeaning
          image
        }
      }
      reflections {
        thoughts
      }
      user {
        _id
        username
      }
    }
  }
`;
