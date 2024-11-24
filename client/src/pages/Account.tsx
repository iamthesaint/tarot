import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SAVED_READINGS } from "../utils/queries";
import { Reading } from "../utils/types";

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

  const { loading, error, data } = useQuery<{ getSavedReadings: Reading[] }>(
    GET_SAVED_READINGS
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

 
  const readings = data?.getSavedReadings || [];

  return (
    <Container>
    <Row>
      <Col>
        {username && <h1>Welcome, {username}!</h1>}
        <Link to="/reading">Get a new reading</Link>
        <h2>Your Saved Tarot Readings</h2>
        <div className="readings">
          {readings.map((reading) => (
            <div key={reading._id} className="reading-card">
              <p>{reading.date}</p>
              <div className="cards">
                {reading.cards.map((drawnCard, index) => (
                  <div key={index} className="card-details">
                    <h4>
                      {drawnCard.position.toUpperCase()}:{" "}
                      {drawnCard.card.name || "Card Name"}
                    </h4>
                    <p>{drawnCard.card.description || "No description"}</p>
                    <p>
                      Meaning:{" "}
                      {drawnCard.isUpright
                        ? drawnCard.card.uprightMeaning
                        : drawnCard.card.reversedMeaning}
                    </p>
                    <p>Suit: {drawnCard.card.suit || "Unknown"}</p>
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
