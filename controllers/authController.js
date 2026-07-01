import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword, validatePassword } from "../utils/hashPassword.js";

/**
 * =========================
 * GENERATE TOKEN
 * =========================
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

/**
 * =========================
 * REGISTER USER
 * =========================
 */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, telegramId } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { telegramId }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const check = validatePassword(password);

        if (!check.valid) {
            return res.status(400).json({
                success: false,
                message: check.message
            });
        }

        const hashed = await hashPassword(password);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashed,
            telegramId
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Register failed",
            error: error.message
        });
    }
};

/**
 * =========================
 * LOGIN USER
 * =========================
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

/**
 * =========================
 * TELEGRAM LOGIN
 * =========================
 */
export const telegramLogin = async (req, res) => {
    try {
        const { telegramId, firstName, username } = req.body;

        let user = await User.findOne({ telegramId });

        if (!user) {
            user = await User.create({
                telegramId,
                firstName,
                username
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Telegram login failed",
            error: error.message
        });
    }
};

/**
 * =========================
 * GET PROFILE
 * =========================
 */
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get user",
            error: error.message
        });
    }
};

/**
 * =========================
 * UPDATE PROFILE
 * =========================
 */
export const updateProfile = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated",
            user: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Update failed",
            error: error.message
        });
    }
};

/**
 * =========================
 * CHANGE PASSWORD
 * =========================
 */
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        const match = await comparePassword(currentPassword, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Current password wrong"
            });
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Password change failed",
            error: error.message
        });
    }
};

/**
 * =========================
 * LOGOUT
 * =========================
 */
export const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
};

/**
 * =========================
 * REFRESH TOKEN
 * =========================
 */
export const refreshToken = async (req, res) => {
    try {
        const token = generateToken(req.user.id);

        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Refresh failed",
            error: error.message
        });
    }
};
