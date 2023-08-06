import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import NotFound from './pages/NotFound.jsx';
import AllUSer from './pages/AllUSer';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import { useGetUserID } from "./hooks/useGetUserId.js";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const userId = useGetUserID();

  const [user, setUser] = useState([]);

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
   <div className="App">
     <Router>
      <Navbar />
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/auth' element={<Auth />}/>
        <Route path='/create-recipe' element={<CreateRecipe />}/>
        <Route path='/saved-recipes' element={<SavedRecipe />}/>
        {user && user.role === "admin" ? (<Route path='/admin/users' element={<AllUSer />}/>)
        :(
          <Route element={<NotFound />} />
        )}
      </Routes>
    </Router>
   </div>
  );
}

export default App;
