import express from "express";
import { 
    createRecipe,
    deleteARecipes,
    getIdSaveRecipes, 
    getRecipes, 
    getSaveRecipes, 
    recipeDetails, 
    saveRecipe
} from "../controllers/Recipe.js";
import {authorizeRoles, isAuthenticated} from "../middleware/auth.js"

const router =express.Router();

router.route('/').get(getRecipes);
router.route('/create').post(createRecipe);
router.route('/:recipeId').get(isAuthenticated,recipeDetails);
router.route('/savedRecipes/ids/:userId').get(getIdSaveRecipes);
router.route('/save').put(saveRecipe);
router.route('/:id').delete(deleteARecipes);
router.route('/savedRecipes/:userId').get(getSaveRecipes);


export default router;