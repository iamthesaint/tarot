import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>Don't have an account? </p>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Login;
