import express from "express";
import { 
    createRecipe, 
    getIdSaveRecipes, 
    getRecipes, 
    getSaveRecipes, 
    recipeDetails, 
    saveRecipe
} from "../controllers/Recipe.js";

const router =express.Router();

router.route('/').get(getRecipes);
router.route('/create').post(createRecipe);
router.route('/:recipeId').get(recipeDetails);
router.route('/saved').put(saveRecipe);
router.route('/savedRecipes/ids/:userId').get(getIdSaveRecipes);
router.route('/savedRecipes/:userId').get(getSaveRecipes);


export default router;