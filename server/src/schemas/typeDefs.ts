// server/src/schemas/TypeDefs.ts

import { gql } from 'graphql-tag';

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

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedCards: [TarotCard]
  }

#add query
  type Query {
    me: User
    tarotCards: [TarotCard] # steph added this
    user(userId: ID!): User
  }

# add mutation
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCard(cardId: ID!): User
    removeCard(cardId: ID!): User
  }

`;

export default typeDefs;