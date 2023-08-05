import React, { useState } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const alert = useAlert();
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8080/api/v1/register", {
          username,
          password,
        });
        alert.success("Registration Completed! Now login.");
      } catch (error) {
        alert.error(error);
      }
    };
  return (
    <div className="auth-container">
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
  )
}

export default Register