import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

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
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      const message = `${field.charAt(0).toUpperCase() + field.slice(1)} "${value}" is already taken`;
      return res.status(400).json({ success: false, message });
    }

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: _, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, user: rest });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
