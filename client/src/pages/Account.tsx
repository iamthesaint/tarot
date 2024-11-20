import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Auth from "../utils/auth";
import Header from "../components/Header";

const Account = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUsername(userData.user.username);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Header />
          {username && <h1>Hi, {username}</h1>}
          <Link to="/stars">Ask the stars</Link>
          <Button variant="primary">Previous Readings</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
