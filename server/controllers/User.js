import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";

//Register 

export const register = async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);

    const user = await UserModel.findOne({username})
    if(user){
        return res.json({message: "User Already exists"})
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({username,password:hashPassword});
    await newUser.save();
    res.json({
        message:"User Registerd successfully!",
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
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.json({
        token,
        userID:user._id
    })

}