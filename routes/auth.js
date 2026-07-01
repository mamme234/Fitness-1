import express from "express";
import {
    register,
    login,
    telegramLogin,
    getMe,
    updateProfile,
    changePassword,
    logout,
    refreshToken
} from "../controllers/authController.js";

import {
    authenticate
} from "../middleware/auth.js";

const router = express.Router();

/**
 * =========================
 * PUBLIC ROUTES
 * =========================
 */

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Telegram login
router.post("/telegram", telegramLogin);


/**
 * =========================
 * PROTECTED ROUTES
 * =========================
 */

// Get current user
router.get("/me", authenticate, getMe);

// Update profile
router.put("/update", authenticate, updateProfile);

// Change password
router.put("/change-password", authenticate, changePassword);

// Refresh token
router.post("/refresh", authenticate, refreshToken);

// Logout (client-side token removal)
router.post("/logout", authenticate, logout);

export default router;
