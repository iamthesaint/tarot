import { Link } from "react-router-dom";
import "./error.css";

const Error: React.FC = () => {
  return (
    <div className="error-wrapper">
      <h1>404 | Oops! This page split like a banana.</h1>
      {/* <p>Oops! This page split like a banana.</p> */}
      <Link to="/"
      className="home-btn">
        Home
      </Link>
      <iframe
        src="https://giphy.com/embed/H8uuXYln5pxVVLFn7k"
        height="600"
        width="900"
        frameBorder="0"
        allowFullScreen
        title="Bananas GIF"
        className="error-gif"
      ></iframe>
    </div>
  );
};

export default Error;
