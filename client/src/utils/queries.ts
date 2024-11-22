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
