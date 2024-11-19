<<<<<<< HEAD
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


=======
import { gql } from "@apollo/client";

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

// // Mutation for saving a book to the user's savedBooks
// export const SAVE_BOOK = gql`
//   mutation saveBook($book: BookInput!) {
//     saveBook(book: $book) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         title
//         authors
//         description
//         image
//         link
//       }
//     }
//   }
// `;

// // Mutation for removing a book from the user's savedBooks
// export const REMOVE_BOOK = gql`
//   mutation removeBook($bookId: ID!) {
//     removeBook(bookId: $bookId) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         title
//         authors
//         description
//         image
//         link
//       }
//     }
//   }
// `;
>>>>>>> 708da2e2bdcd3a5b830a6a4a421e58a5b7e5e927
