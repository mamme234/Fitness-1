import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

/**
 * =========================
 * GET CURRENT USER
 * =========================
 */
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user.",
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
        const userId = req.user._id;

        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age,
            gender: req.body.gender,
            goal: req.body.goal,
            workoutStyle: req.body.workoutStyle,
            activityLevel: req.body.activityLevel
        };

        const user = await User.findByIdAndUpdate(
            userId,
            updatedData,
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Profile update failed.",
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

        const user = await User.findById(req.user._id);

        const isMatch = await comparePassword(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect."
            });
        }

        const hashed = await hashPassword(newPassword);

        user.password = hashed;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Password change failed.",
            error: error.message
        });
    }
};


/**
 * =========================
 * LOGOUT USER
 * =========================
 */
export const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed.",
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
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const newToken = generateToken(user._id);

        res.status(200).json({
            success: true,
            token: newToken
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Token refresh failed.",
            error: error.message
        });
    }
};
