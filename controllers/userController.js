import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mySuperSecretKey123";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,   // token only here
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const ListUsers = async (req, res) => {
    try {
        const Users = await User.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            Users
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        await Profile.deleteMany({ UserId: decoded._id });
        const user = await User.findByIdAndDelete(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User and all related profiles deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};


export const TotalUsers = async (req, res) => {
    try {
        const totalUser = await User.countDocuments();

        res.json({
            success: true,
            totalUser: totalUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users"
        });
    }
};