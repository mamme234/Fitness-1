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

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/* ==========================================
   TEST ROUTE
========================================== */

router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Auth routes are working 🚀"
    });
});

/* ==========================================
   PUBLIC ROUTES
========================================== */

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Telegram Login
router.post("/telegram", telegramLogin);

/* ==========================================
   PROTECTED ROUTES
========================================== */

// Current User
router.get("/me", authenticate, getMe);

// Update Profile
router.put("/update", authenticate, updateProfile);

// Change Password
router.put("/change-password", authenticate, changePassword);

// Refresh JWT Token
router.post("/refresh", authenticate, refreshToken);

// Logout
router.post("/logout", authenticate, logout);

/* ==========================================
   DEFAULT AUTH ROUTE
========================================== */

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Gym Pro Auth API",
        endpoints: {
            register: "POST /api/auth/register",
            login: "POST /api/auth/login",
            telegram: "POST /api/auth/telegram",
            me: "GET /api/auth/me",
            update: "PUT /api/auth/update",
            changePassword: "PUT /api/auth/change-password",
            refresh: "POST /api/auth/refresh",
            logout: "POST /api/auth/logout",
            test: "GET /api/auth/test"
        }
    });
});

export default router;
