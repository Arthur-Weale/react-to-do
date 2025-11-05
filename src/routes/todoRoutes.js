import express from "express";
import insertTodo from "../controller/todoController.js";

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

export default router;