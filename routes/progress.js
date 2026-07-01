import express from "express";
import {
    saveProgress,
    getProgressHistory,
    getTodayProgress,
    updateMeasurements,
    deleteProgress
} from "../controllers/progressController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * =========================
 * PROGRESS ROUTES
 * =========================
 */

// Save daily progress
router.post("/save", authenticate, saveProgress);

// Get all progress history
router.get("/history", authenticate, getProgressHistory);

// Get today's progress
router.get("/today", authenticate, getTodayProgress);

// Update body measurements
router.put("/measurements", authenticate, updateMeasurements);

// Delete progress entry
router.delete("/:id", authenticate, deleteProgress);

export default router;
