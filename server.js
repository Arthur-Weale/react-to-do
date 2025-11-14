import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./src/routes/todoRoutes.js"

//Reads enviroment variables and stores them in the process.env object.
dotenv.config();

//Initialised express and stores in app.
const app = express();

//Enables the frontend to communicate with the server despite the different urls.
app.use(cors());

//Middleware allows the server to parse json since express can't read json.
app.use(express.json());

//Routes from the base url
app.use("/", todoRoutes)

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Server is listening on ${port}`))