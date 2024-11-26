import { Link } from "react-router-dom";
import "./Home.css";
import divineLogo from '../../assets/divineLogo.png';

const Home = () => {
  return (
    <div className="home">
      <div className="what-is-tarot">
        Tarot is a mystical deck of 78 cards, each brimming with stories and symbols. The Major Arcana reveal life’s big mysteries, while the Minor Arcana explore everyday adventures through four magical suits. A tarot reading is like a cosmic map, offering insight, guidance, and a touch of magic to those who seek it.
      </div>
      <img
        src={divineLogo}
        alt="logo"
        className="logo"
      />
      <h1 className="home-title">Ancient Arcana</h1>
      <div className="home-container">
        <Link to="/reading" className="btn-primary">
          Ask the Stars
        </Link>
      </div>
    </div>
  );
};

export default Home;
