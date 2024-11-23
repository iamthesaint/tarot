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
    savedCards: [TarotCard]
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
    cards: [DrawnCard]
    reflections: [Reflection]
    date: String
    user: User
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
    cards: [DrawnCardInput]
    reflections: [ReflectionInput]
    date: String
  }

  type Query {
    me: User
    tarotCards: [TarotCard]
    user(userId: ID!): User
    readings: [Reading]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCard(cardId: ID!): User
    removeCard(cardId: ID!): User
    saveReading(readingData: ReadingInput!): Reading
  }
`;

export default typeDefs;
