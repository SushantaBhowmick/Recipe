import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type: String,
        default:"user"
    },
    savedRecipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"recipes"
    }]
})

export const UserModel = mongoose.model("User",UserSchema);