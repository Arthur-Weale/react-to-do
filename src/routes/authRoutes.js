import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/schema.js";

const router = express.Router();

//Register
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email, 
            password: hashedPassword
        })

        res.status(200).json({message: "User created", userId: newUser._id})
    } catch (error) {
        console.log(error);
        res.status(500).json("Registration failed")
    }
})

//Login
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email})
        if(!user) return res.status(400).json("User not found")

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json("Incorrect password");

        //Generate JWT
        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.json({token})

    } catch (error) {
        console.log(error)
        res.status(500).json("Login failed")
    }
})

export default router;