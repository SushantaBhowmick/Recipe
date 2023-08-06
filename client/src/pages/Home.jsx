import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserId";
import { useAlert } from 'react-alert'
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [user, setUser] = useState([]);

  const userId = useGetUserID();
  const alert = useAlert();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/recipes/savedRecipes/ids/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/${userId}`);
          setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
    fetchUser();
  }, [userId]);

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:8080/api/v1/recipes/save", {
        recipeId,
        userId,
      });
      setSavedRecipes(response.data.savedRecipes);
      alert.success("Saved Recipe Successfully")
    } catch (err) {
      alert.error("Please Login to Access this recource");;
    }
  };


  const deleteRecipe = async (id) => {
    try {
      if (cookies && cookies.access_token) {
        await axios.delete(`http://localhost:8080/api/v1/recipes/${id}`,
          {
            headers: { authorization: cookies.access_token },
          }

        );
        alert.success("Recipe Deleted Successfully")
      } else {
        alert.error("Please Login to Access this recource");;
      }

    } catch (err) {
      alert.error("Please Login to Access this recource");;
    }
  };


  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <div className="btn">
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
                {
                  user && user.role === "admin" ? (<button
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </button>) :(<p>Only Admin can delete the Recipes</p>)
                }
              </div>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home