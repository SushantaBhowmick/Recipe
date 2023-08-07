import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const alert = useAlert();
  
  
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
   <div className="register">
     <div className="reg-container">
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
     <div className="reg">
     <button type="submit">Register</button>
     <Link to={'/auth'}>Log In <ArrowForwardIcon/> </Link>
     </div>
    </form>
  </div>
   </div>
  )
}

export default Register