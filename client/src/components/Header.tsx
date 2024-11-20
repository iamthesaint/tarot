import auth from "../utils/auth";
import { Nav } from "react-bootstrap";

const Header = () => {
  return (
    <header className="topbar">
      {auth.loggedIn() ? (
        <>
          <Nav.Link onClick={auth.logout}>Logout</Nav.Link>
        </>
      ) : (
        <Nav.Link href="/login">Login/Sign Up</Nav.Link>
      )}
    </header>
  );
};

export default Header;
