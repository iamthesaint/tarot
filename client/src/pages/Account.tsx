import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SAVED_READINGS } from "../utils/queries";
import { Reading, DrawnCard } from "../utils/types";

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

  if (loading) return <p>Loading your saved readings...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const readings = data?.getSavedReadings || [];


  const formatDate = (timestamp: string | number): string => {
    const date = new Date(Number(timestamp));
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };


  const renderDrawnCard = (drawnCard: DrawnCard, index: number) => {
    if (!drawnCard?.card) return <p key={index}>Card data unavailable.</p>;

    return (
      <div key={index} className="card-details">
        <h4>
          {drawnCard.position?.toUpperCase() || "Position"}:{" "}
          {drawnCard.card.name || "Unknown Card"}
        </h4>
        <p>{drawnCard.card.description || "Description unavailable"}</p>
        <p>
          Meaning:{" "}
          {drawnCard.isUpright
            ? drawnCard.card.uprightMeaning || "No upright meaning"
            : drawnCard.card.reversedMeaning || "No reversed meaning"}
        </p>
        <p>Suit: {drawnCard.card.suit || "No suit"}</p>
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          {username && <h1>Welcome, {username}!</h1>}
          <Link to="/reading">Get a new reading</Link>
          <h2>Your Saved Tarot Readings</h2>
          <div className="readings">
            {readings.length > 0 ? (
              readings.map((reading) => (
                <div key={reading._id} className="reading-card">
                  <p>{formatDate(reading?.date)}</p>

                  <div className="cards">
                    {reading.cards?.length > 0
                      ? reading.cards.map(renderDrawnCard)
                      : "No cards for this reading."}
                  </div>
                  {reading.reflections?.length > 0 && (
                    <div className="reflections">
                      <h4>Reflections:</h4>
                      {reading.reflections.map((reflection, idx) => (
                        <p key={idx}>{reflection.thoughts}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No readings saved yet! To begin, draw your first card...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
