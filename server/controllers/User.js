import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";

//Register 

export const register = async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({username})
    if(user){
        return res.json({message: "User Already exists"})
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({username,password:hashPassword});
    await newUser.save();
   
    res.status(201).json({
       message: "user register successfully!"
    });

}

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username})
    if(!user){
        return res.json({message: "User Doesn't exists"})
    }
    const isPassword = await bcrypt.compare(password,user.password);
    if(!isPassword){
        return res.json({message:"Username or Password is Incorrect"});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
       expiresIn: 2* 24 *60*60*1000
    });
    res.status(200).json({
        token,
        userID:user._id
    })

}

//get all user
export const getAllUser = async(req,res)=>{
   try {
    const users = await UserModel.find({});
    res.status(200).json(users)
   } catch (error) {
    res.json(error)
   }
}

//get single user
export const getAUser = async(req,res)=>{
   try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user)
   } catch (error) {
    res.json(error)
   }
}