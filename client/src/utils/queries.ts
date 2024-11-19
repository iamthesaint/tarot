<<<<<<< HEAD
// client/src/utils/

import { gql } from '@apollo/client';
=======
import { gql } from "@apollo/client";

// Query to get the authenticated user's information along with their saved books
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
>>>>>>> 708da2e2bdcd3a5b830a6a4a421e58a5b7e5e927
