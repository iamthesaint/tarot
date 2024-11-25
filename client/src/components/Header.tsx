import auth from "../utils/auth";
import { Nav, NavLink } from "react-bootstrap";

const Header = () => {
  return (
    <header className="topbar">
      <Nav className="nav-links">
        <NavLink href="/" className="nav-item">Home</NavLink>
        {auth.loggedIn() ? (
          <>
            <Nav.Link href="/account" className="nav-item">My Account</Nav.Link>
            <NavLink href="/reading" className="nav-item">Draw Your Cards</NavLink>
            <Nav.Link onClick={auth.logout} className="nav-item">Logout</Nav.Link>
          </>
        ) : (
          <Nav.Link href="/login" className="nav-item">Login/Sign-Up</Nav.Link>
        )}
      </Nav>
    </header>
  );
};

export default Header;
