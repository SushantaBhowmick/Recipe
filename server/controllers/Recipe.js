import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Recipe } from "../models/recipeModel.js";
import { UserModel } from "../models/userModel.js";
import mongoose from "mongoose";


//Get recipes
export const getRecipes = async (req, res) => {
  try {
    const result = await Recipe.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

//create recipes

// export const createRecipe = async (req, res) => {
//   const recipe = new Recipe({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     image: req.body.image,
//     ingredients: req.body.ingredients,
//     instructions: req.body.instructions,
//     imageUrl: req.body.imageUrl,
//     cookingTime: req.body.cookingTime,
//     userOwner: req.body.userOwner,
//   });

//   try {
//     const result = await recipe.save();
//     res.status(201).json({
//       createdRecipe: {
//         name: result.name,
//         image: result.image,
//         ingredients: result.ingredients,
//         instructions: result.instructions,
//         _id: result._id,
//       },
//     });
//   } catch (err) {
//     // console.log(err);
//     res.status(500).json(err);
//   }
// }

//create recipes 
export const createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  try{
    const responce = await recipe.save();
    res.json(responce)
  }catch(err){
    res.json(err)
  }
}
//Save a recipe
export const saveRecipe = async (req, res) => {

  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get a recipe by ID
export const recipeDetails = async (req, res) => {
  try {
    const result = await Recipe.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get id of saved recipes
export const getIdSaveRecipes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// Get saved recipes
export const getSaveRecipes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

//delete save recipe
// export const deleteARecipes = async(req,res)=>{
//  try {
//   const user = await UserModel.findById(req.body);
 
//   res.json(user.savedRecipes)
//  } catch (err) {
//   res.json(err)
//  }
// }

//delete save  a recipe
export const deleteARecipes = async(req,res)=>{
  try {
    const recipe = await Recipe.findById(req.params.id);
    if(!recipe){
      return res.status(404).json({message:"recipe not found"})
    }
    await recipe.deleteOne();

    res.status(200).json({message:"Recipe Deleted Successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:`Role: ${req.user.role} is not allowed to access this resource`})
  }
}