import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/login">Login/Signup</Link>
      <h1>Divine Deck</h1>
    </div>
  );
};

export default Home;
