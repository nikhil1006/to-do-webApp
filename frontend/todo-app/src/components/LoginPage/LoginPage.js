import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    // Send a POST request to the backend
    try {
      const response = await axios.post("${baseURL}/api/login", {
        username,
        password,
      });

      // Save the access token in the browser's local storage
      localStorage.setItem("accessToken", response.data.acessToken);

      // Redirect the user to the home page
      if (response.status === 200) {
        history.push("/home");
      }
    } catch (error) {
      // If the request fails, display an error message
      setErrorMessage("Invalid email or password");
    }
  };

  // Render the login page

  return (
    <div className="login-page">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
