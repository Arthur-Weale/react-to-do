import express from "express";
import {
  insertTodo,
  getTodos,
  deleteTodo,
  editTodo,
} from "../controller/todoController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new todo
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const formData = req.body;
    // Pass the userId from the JWT middleware to ensure ownership
    const response = await insertTodo(formData, req.userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

// Get all todos for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Pass userId to fetch only this user's todos
    const response = await getTodos(req.userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

// Update a todo (only if it belongs to the logged-in user)
router.put("/edit/:id", authenticateToken, async (req, res) => {
  try {
    const resultCheck = req.body;
    const editedTodo = req.params.id;
    const response = await editTodo(resultCheck, editedTodo, req.userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update todo" });
  }
});

// Delete a todo (only if it belongs to the logged-in user)
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const IdToDelete = req.params.id;
    const response = await deleteTodo(IdToDelete, req.userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
});

export default router;