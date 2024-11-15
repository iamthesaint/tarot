// server/src/schemas/TypeDefs.ts

import gql from 'graphql-tag';

const typeDefs = gql`
  type TarotCard {
    _id: ID
    name: String
    description: String
    suit: String
    uprightMeaning: String
    reversedMeaning: String
    image: String
  }

  type Query {
    tarotCards: [TarotCard]
  }
`;

export default typeDefs;