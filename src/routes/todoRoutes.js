import express from "express";
import {insertTodo, getTodos, deleteTodo, editTodo} from "../controller/todoController.js";

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

router.put("/edit/:id", async (req, res) => {
    try {
        const resultCheck = req.body;
        const editedTodo = req.params.id;
        const response = await editTodo(resultCheck, editedTodo);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const IdToDelete = req.params.id;
        const response = await deleteTodo(IdToDelete);
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

})

export default router;