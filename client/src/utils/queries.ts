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
<<<<<<< HEAD

export const GET_TAROT_CARDS = gql`
    query tarotCards {
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
=======
>>>>>>> 3c0392a9e290c35df51cd6ef293b3776859dd00e
