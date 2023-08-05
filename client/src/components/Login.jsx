import axios from 'axios';
import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const alert = useAlert();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const result = await axios.post("http://localhost:8080/api/v1/login", {
          username,
          password,
        });
  
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        alert.success("Login SuccessFully!")
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="auth-container">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default Login