import express from "express";
import {
    getAllExercises,
    getExerciseById,
    getExercisesByMuscle,
    searchExercises,
    getPremiumExercises
} from "../controllers/exerciseController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * =========================
 * EXERCISE ROUTES
 * =========================
 */

// Get all exercises
router.get("/", authenticate, getAllExercises);

// Search exercises
router.get("/search", authenticate, searchExercises);

// Get premium exercises
router.get("/premium", authenticate, getPremiumExercises);

// Get exercises by muscle group
router.get("/muscle/:muscle", authenticate, getExercisesByMuscle);

// Get single exercise
router.get("/:id", authenticate, getExerciseById);

export default router;
