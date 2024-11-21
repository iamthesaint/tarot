import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";

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

  return (
    <Container>
      <Row>
        <Col>
          <Header />
          {username && <h1>Hi, {username}</h1>}
          <Link to="/reading">Get a reading</Link>
          <Button variant="primary">Previous Readings</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
