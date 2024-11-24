import { Link } from "react-router-dom";
import "./Home.css";
import divineLogoName from '../../assets/divineLogoName.png';
import tarotHero from '../../assets/tarotHero.png';

const Home = () => {
  return (
    <div className="home">
      <textarea
        className="what-is-tarot"
        placeholder="What is Tarot?"
      ></textarea>
      <img
        src={divineLogoName}
        alt="logo"
        className="logo"
      />
      <h1 className="home-title">Divine Deck</h1>
      <div className="home-container">
        <p className="home-description">
          Dive into the mystical world of tarot. Reflect, learn, and gain
          insights through the wisdom of the cards.
        </p>
        <Link to="/reading" className="btn-primary">
          Ask the Stars
        </Link>
      </div>
    </div>
  );
};

export default Home;
