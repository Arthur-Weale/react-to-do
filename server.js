import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./src/routes/todoRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/", (req, res)=>{
//     res.send("Hello I'm a todo app")
// })

app.use("/", todoRoutes)

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Server is listening on ${port}`))