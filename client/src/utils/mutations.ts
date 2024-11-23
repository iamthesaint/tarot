import { gql } from "@apollo/client";

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

// save reading mutation
export const SAVE_READING = gql`
mutation SaveReading($readingData: ReadingInput!) {
  saveReading(readingData: $readingData) {
    _id
    reflections {
      thoughts
    }
    cards {
      card {
        _id
        name
      }
      isUpright
      position
    }
    date
    user {
      _id
      username
    }
  }
}
`;


// Mutation for logging in a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation for adding a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
