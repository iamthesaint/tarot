# Divine Deck - Interactive Tarot Reading

Enhance your spiritual journey and self-discovery through virtual tarot readings.

## Description

Divine Deck is a modern web application that offers users an interactive experience with tarot card readings and exploration. Users can draw cards, receive insightful readings, and save their reflections on readings for future reference. Designed with passion, this includes tangible card animation, responsive design, and secure user authentication.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Contributions](#contributions)
- [License](#license)
- [Contact](#contact)

## Features

_Interactive Tarot Card Deck:_ The deck shuffles and regenerates with each render/draw ensuring your tarot experience is similar to reality. Cards are drawn with smooth animations.
_Personalized Readings:_ Gain insights from past, present, and future card interpretations, a dynamic 3-card draw for each reading.
_User Reflections:_ Save your thoughts and reflections associated with each reading.
_User Authentication:_ Secure signup and login functionality using JSON Web Tokens.
_Saved Readings:_ Access all your saved readings on your profile page, organized by date for easy access.
_Responsive Design:_ Optimized for both desktop and mobile devices.

## Technologies Used

_Frontend_
React: For building the user interface.
React Router: For client-side routing.
React Bootstrap: For some styling and pre-built components.
React Spring: For stylish and smooth animations.
Apollo Client: For managing GraphQL queries and mutations.

_Backend_
Node.js: For server-side logic.
MongoDB: For database storage.
GraphQL: For data fetching.
JWT: For secure authentication.

_Testing_
Cypress: For component and end-to-end testing, integration with Github Actions for CI/CD.

_Deployment_
Render: Deployed on Render.

## Installation

To install the dependencies, Open the terminal in project folder and run

```
npm install
```

### Set Up Environment Variables
Create a .env file and add the following variables:
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### Start The Application & Dev Server

1. In the project folder, open the terminal and run:

```
npm start
```

2. Then navigate to the `client` directory:

```
cd client
```

3. Finally, start the development server:

```
npm run dev
```

## Usage

_Sign Up/Login:_ Create an account to save your readings.
_Draw Cards:_ Visit the reading page and interact with the tarot deck.
_Save Readings:_ Add personal reflections for each reading, and save both reflections and readings to your account.
_View Saved Readings:_ Access your saved readings on the account page.

## Testing

Install Cypress using ```npm install cypress``` and open for testing ```npx cypress open``` to run component tests in the Cypress testing file.

## Future Enhancements

- Add various card spreads (e.g., Celtic Cross, one-card, five-card draws).
- Provide additional card meanings and historical insights, viable links to educational resources.
- Enable sharing readings via social media or other logged in users.
- Implement dark mode

## Contributions

All contributions welcome! Please fork the repo, create your feature branch, and commit your changes for approval via pull-request.

## License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the MIT license.

[Here](https://opensource.org/licenses/MIT) for more information.

## Contact

For questions, or just for some interesting conversation, drop me a [message](mailto:stephenie2@me.com) or submit a request via [Github](https://github.com/iamthesaint).


