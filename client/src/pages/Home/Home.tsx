import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./Home.css";

const Home = () => {
  return (
    <div
      className="home"
    >
          <Header />
          <div className="align-center">
            <div className="home-content">
              <p>
                Our Tarot card reading services offers you a glimpse into the
                unknown, helping you understand your past, present and future
              </p>
              <Link to="/reading" className="btn-primary">
                Draw Tarot Cards
              </Link>
            </div>
          </div>
      </div>
  );
};

export default Home;
