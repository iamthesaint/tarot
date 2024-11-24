import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useQuery } from "@apollo/client";
import { GET_SAVED_READINGS } from "../utils/queries";
import { TarotCard, DrawnCard, Reading } from "../utils/types";

interface UserData {
  user: {
    username: string;
  };
}
const Account = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData: UserData = JSON.parse(storedUserData);
        setUsername(userData.user.username);
      } catch (error) {
        console.error("Failed to parse userData from localStorage:", error);
      }
    }
  }, []);

  const { loading, error, data } = useQuery<{ readings: Reading[] }>(GET_SAVED_READINGS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const readings = data?.readings || [];

  return (
    <Container>
      <Row>
        <Col>
          <Header />
          {username && <h1>Hi, {username}</h1>}
          <Link to="/reading">Get a reading</Link>
          <h2>Your Saved Tarot Readings</h2>
          <div className="readings">
            {readings.map((reading) => (
              <div key={reading._id} className="reading-card">
                <h3>
                  Date: {new Date(reading.date).toLocaleDateString()}
                </h3>
                <div className="cards">
                  {reading.cards.map((drawnCard, index) => (
                    <div key={index} className="card-details">
                      <h4>
                        {drawnCard.position.toUpperCase()}:{" "}
                        {drawnCard.card.name || "Card Name"}
                      </h4>
                      <p>{drawnCard.card.description || "Card Description"}</p>
                      <p>
                        {drawnCard.isUpright
                          ? drawnCard.card.uprightMeaning
                          : drawnCard.card.reversedMeaning}
                      </p>
                      <p>Suit: {drawnCard.card.suit}</p>
                    </div>
                  ))}
                </div>
                {reading.reflections.length > 0 && (
                  <div className="reflections">
                    <h4>Reflections:</h4>
                    {reading.reflections.map((reflection, idx) => (
                      <p key={idx}>{reflection.thoughts}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
