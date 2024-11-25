import { Link } from "react-router-dom";
import "./error.css";

const Error: React.FC = () => {
  return (
    <div className="error-wrapper">
      <h1>Error</h1>
      <p>Page not found.</p>
      <Link to="/">Go to homepage</Link>
    </div>
  );
};

export default Error;
