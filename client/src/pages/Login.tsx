import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
// import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
          {/* <LoginForm /> */}
          <p>Don't have an account? </p>
        </Col>
        <Link to="/signup">Signup</Link>
      </Row>
    </Container>
  );
};

export default Login;
