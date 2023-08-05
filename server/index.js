import express from "express";
import cors from 'cors';
import {config} from "dotenv";
import {connectDatabase} from "./config/database.js"
config({
    path:"./config/config.env"
})

const app = express();
const PORT = process.env.PORT || 4000

connectDatabase();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//importing Routes
import user from "./routes/userRoutes.js"
import recipe from "./routes/recipeRoutes.js"
import bodyParser from "body-parser";

app.use("/api/v1",user)
app.use("/api/v1/recipes",recipe)



app.listen(PORT,()=>{
    console.log(`Server is connected to ${PORT}`)
})