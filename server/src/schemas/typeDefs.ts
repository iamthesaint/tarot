// server/src/schemas/typeDefs.ts

import { gql } from "graphql-tag";

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type TarotCard {
    _id: ID
    name: String
    description: String
    suit: String
    uprightMeaning: String
    reversedMeaning: String
    image: String
  }

  type Reflection {
    thoughts: String
  }

  type DrawnCard {
    card: TarotCard
    isUpright: Boolean
    position: String
  }

  type Reading {
    _id: ID
    date: String
    cards: [DrawnCard]
    reflections: [Reflection]
    user: User
  }

  type Query {
    me: User
    getSavedReadings: [Reading]
    tarotCards: [TarotCard]
    user(userId: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCard(cardId: ID!): User
    removeCard(cardId: ID!): User
    saveReading(readingData: ReadingInput!): Reading
    deleteReading(readingId: ID!) : Reading
  }

  input ReflectionInput {
    thoughts: String
  }

  input TarotCardInput {
    _id: ID
    name: String
    description: String
    suit: String
    uprightMeaning: String
    reversedMeaning: String
    image: String
  }

  input DrawnCardInput {
    card: TarotCardInput
    isUpright: Boolean
    position: String
  }

  input ReadingInput {
    date: String
    cards: [DrawnCardInput]
    reflections: [ReflectionInput]
    userId: ID
  }
`;

export default typeDefs;
