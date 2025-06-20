import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    // Handle duplicate key errors from MongoDB (E11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      const message = `${field.charAt(0).toUpperCase() + field.slice(1)} "${value}" is already taken`;
      return res.status(400).json({ success: false, message });
    }

    // Default error fallback
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
