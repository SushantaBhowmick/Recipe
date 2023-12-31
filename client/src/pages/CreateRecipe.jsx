import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAlert } from "react-alert";

const CreateRecipe = ({isAuthenticated} ) => {

  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const alert = useAlert();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(cookies && cookies.access_token){
        await axios.post(
          "http://localhost:8080/api/v1/recipes/create",
          { ...recipe },
          {
            headers: { authorization: cookies.access_token },
          }
        ) 
        alert.success("Recipe Created");
        navigate("/");
      }else{
      alert.error("Please Login to Access this recource");
      }

    } catch (error) {
      alert.error("Please Login to Access this recource");
    }
  };


  return (
    <div className="create-recipe">
    <h2>Create Recipe</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        value={recipe.name}
        onChange={handleChange}
      />
     
      <label htmlFor="ingredients">Ingredients</label>
      {recipe.ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          name="ingredients"
          value={ingredient}
          onChange={(event) => handleIngredientChange(event, index)}
        />
      ))}
      <button type="button" onClick={handleAddIngredient}>
        Add Ingredient
      </button>
      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="imageUrl">Image URL</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        required
        value={recipe.imageUrl}
        onChange={handleChange}
      />
      <label htmlFor="cookingTime">Cooking Time (minutes)</label>
      <input
        type="number"
        id="cookingTime"
        required
        name="cookingTime"
        value={recipe.cookingTime}
        onChange={handleChange}
      />
      <button type="submit">Create Recipe</button>
    </form>
  </div>
  )
}

export default CreateRecipe