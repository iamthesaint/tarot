import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Signup</h1>
          <SignupForm />
          <p>Already have an account? </p>
        </Col>
        <Link to="/login">Login</Link>
      </Row>
    </Container>
  );
};

export default Signup;
