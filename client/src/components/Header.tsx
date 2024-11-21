import auth from "../utils/auth";
import { Nav, NavLink } from "react-bootstrap";

const Header = () => {
  return (
    <header className="topbar">
      <NavLink href="/">Divine Deck</NavLink>
      <Nav>
        {auth.loggedIn() ? (
          <>
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link onClick={auth.logout}>Logout</Nav.Link>
          </>
        ) : (
          <Nav.Link href="/login">Login/Sign Up</Nav.Link>
        )}
      </Nav>
    </header>
  );
};

export default Header;
