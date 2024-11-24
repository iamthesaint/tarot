import { Link } from "react-router-dom";
import "./Home.css";
import divineLogo from '../../assets/divineLogo.png';

const Home = () => {
  return (
    <div className="home">
      <textarea
        className="what-is-tarot"
        placeholder="Tarot is a mystical deck of 78 cards, each brimming with stories and symbols. The Major Arcana reveal life’s big mysteries, while the Minor Arcana explore everyday adventures through four magical suits. A tarot reading is like a cosmic map, offering insight, guidance, and a touch of magic to those who seek it. "
      ></textarea>
      <img
        src={divineLogo}
        alt="logo"
        className="logo"
      />
      <h1 className="home-title">Divine Deck</h1>
      <div className="home-container">
        {/* <p className="home-description">
        Dive into the mystical world of tarot. Reflect, learn, and gain
        insights through the wisdom of the cards.
        </p> */}
        <Link to="/reading" className="btn-primary">
          Ask the Stars
        </Link>
      </div>
    </div>
  );
};

export default Home;
