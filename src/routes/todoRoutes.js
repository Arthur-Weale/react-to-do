import express from "express";
import {insertTodo, getTodos} from "../controller/todoController.js";

const router = express.Router();

router.post("/create", async(req, res)=>{
    try {
        const formData = req.body;
        const response = await insertTodo(formData);
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.get("/", async (req, res)=>{
    try {
        const response = await getTodos();
        res.status(200).json(response)
        //console.log(res.json())
    } catch (error) {
        console.log(error);
    }
})

export default router;