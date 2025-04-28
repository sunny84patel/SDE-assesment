import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Prevent 'admin' registration from frontend (only allow from backend/API tool)
    let finalRole = 'user'; // Default is user

    if (role === 'admin') {
      // Check if request is coming with a secret key (or from backend logic)
      const adminSecret = req.headers['x-admin-secret'];

      if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: "Unauthorized to create admin" });
      }
      finalRole = 'admin'; // Allow setting admin if secret key is valid
    }

    const user = await User.create({ name, email, password, role: finalRole });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request body:", req.body); // Log the request body
  console.log("Email:", email, "Password:", password); // Log extracted values

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user); // Log the user object

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    console.log("Stored password:", user.password); // Log the stored password
    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch); // Log the result of password comparison

    if (isMatch) {
      res.json({ token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};
