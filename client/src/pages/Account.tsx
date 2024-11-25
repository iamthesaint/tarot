import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SAVED_READINGS } from "../utils/queries";
import { Reading, DrawnCard } from "../utils/types";
import "./Account.css";

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
    };
    return date.toLocaleDateString(undefined, options);
  };

  const RenderDrawnCard: React.FC<{ drawnCard: DrawnCard }> = ({ drawnCard }) => {
    if (!drawnCard?.card)
      return (
        <Card.Text>
          <i>Card data unavailable.</i>
        </Card.Text>
      );

    return (
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            {drawnCard.position?.toUpperCase() || "Position"}:{" "}
            {drawnCard.card.name || "Unknown Card"}
          </Card.Title>
          <Card.Text>{drawnCard.card.description || "Description unavailable"}</Card.Text>
          <Card.Text>
            <strong>Meaning:</strong>{" "}
            {drawnCard.isUpright
              ? drawnCard.card.uprightMeaning || "No upright meaning"
              : drawnCard.card.reversedMeaning || "No reversed meaning"}
          </Card.Text>
          <Card.Text>
            <strong>Suit:</strong> {drawnCard.card.suit || "No suit"}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          {username && <h1>Welcome, {username}!</h1>}
          {/* <Link to="/reading" className="btn btn-primary mb-4">
            Get a new reading
          </Link> */}
          <h2>Your Saved Tarot Readings</h2>
          <div className="readings">
            {readings.length > 0 ? (
              readings.map((reading) => (
                <Card key={reading._id} className="mb-4 shadow">
                  <Card.Header>
                    <h5>Date: {formatDate(reading.date)}</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {reading.cards?.length > 0
                        ? reading.cards.map((drawnCard, index) => (
                            <Col key={index} md={4}>
                              <RenderDrawnCard drawnCard={drawnCard} />
                            </Col>
                          ))
                        : "No cards for this reading."}
                    </Row>
                    {reading.reflections?.length > 0 && (
                      <div className="mt-3">
                        <h5>Reflections:</h5>
                        {reading.reflections.map((reflection, idx) => (
                          <p key={idx}>"{reflection.thoughts}"</p>
                        ))}
                      </div>
                    )}
                  </Card.Body>
                </Card>
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
