import axios from 'axios';
import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


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
    <div className="login">
      <div className="auth-container">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="log">
      <button type="submit">Login</button>
      <Link to={'/auth/register'} > New User? <ArrowForwardIcon /></Link>
      </div>
    </form>
  </div>
    </div>
  )
}

export default Login