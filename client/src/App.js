import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import AllUSer from './pages/AllUSer.jsx';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap-grid.min.css'

function App() {
  return (
   <div className="App">
     <Router>
      <Navbar />
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/auth' element={<Auth />}/>
        <Route path='/create-recipe' element={<CreateRecipe />}/>
        <Route path='/saved-recipes' element={<SavedRecipe />}/>
        <Route path='/admin/users' element={<AllUSer />}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
