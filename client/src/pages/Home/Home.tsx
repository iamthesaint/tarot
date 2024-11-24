import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Divine Deck</h1>
      <div className="home-container">
          <p className="home-description">
            Dive into the mystical world of tarot. Reflect, learn, and gain
            insights through the wisdom of the cards.
          </p>
          <Link to="/reading" className="btn-primary">
            Draw Tarot Cards
          </Link>
        </div>
      </div>
  );
};

export default Home;
