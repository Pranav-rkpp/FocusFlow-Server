import { Auth } from "../models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer token"
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // store userId for later use
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const Login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await Auth.findOne({ userName });
    if (!user) return res.status(400).json({ message: "Invalid UserName" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: JWT_EXPIRES_IN } // expiry
    );

    return res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const Register = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    return res.status(400).json({ message: "All fields required" });
  const existUser = await Auth.findOne({ userName });
  if (existUser)
    return res.status(400).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await Auth.create({ userName, password: hashedPassword });
    return res
      .status(201)
      .json({ message: "User Registered Successfully", userId: newUser._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
