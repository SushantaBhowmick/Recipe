import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom'
import { useGetUserID } from "../hooks/useGetUserId";


const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userId = useGetUserID();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);


  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser()
  }, [userId])

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>

      <Link to={"/create-recipe"}>Create Recipe</Link>
      <Link to={"/saved-recipes"}>Saved Recipe</Link>

      {
        user && user.role === "admin"? (
        <Link to={"/admin/users"}>All Users</Link>):(<p> </p>)
      }

      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  )
}

export default Navbar