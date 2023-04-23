import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
    
    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Send a POST request to the backend
        try {
        const response = await axios.post(`${baseURL}/api/register`, {
            username,
            password,
        });
    
        // Save the access token in the browser's local storage
        localStorage.setItem("accessToken", response.data.accessToken);
    
        // Redirect the user to the home page
        if (response.status === 201) {
            history.push("/login");
        }
        } catch (error) {
        // If the request fails, display an error message
        setErrorMessage("Registration failed please try again");
        }
    };
    
    // Render the register page
    
    return (
        <div className="register-page">
        <h1>Register</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleRegister}>
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
            <button type="submit">Register</button>
        </form>
        </div>
    );
    }

    export default RegisterPage;