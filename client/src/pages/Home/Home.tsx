import { Link } from "react-router-dom";
import "./Home.css";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home" style={{ backgroundColor: "black" }}>
      <div className="overlay"></div>
      <div className="home-content-wrapper">
        <Container>
          <Header />
          <div className="align-center">
            <div className="home-content">
              <h1>Divine Deck</h1>
              <h2>Love | Career | Spiritual</h2>
              <p>
                Our Tarot card reading services offers you a glimpse into the
                unknown, helping you understand your past, present and future
              </p>
              <Link to="/reading" className="btn-primary">
                Get a reading
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
