import express from "express";
import {
    createWorkout,
    getWeeklyWorkouts,
    getWorkoutByDay,
    startWorkout,
    completeExercise,
    finishWorkout,
    workoutHistory,
    deleteWorkout
} from "../controllers/workoutController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * =========================
 * WORKOUT ROUTES
 * =========================
 */

// Create workout plan (AI or manual)
router.post("/create", authenticate, createWorkout);

// Get weekly schedule (7 days)
router.get("/weekly", authenticate, getWeeklyWorkouts);

// Get workout by day
router.get("/:day", authenticate, getWorkoutByDay);

// Start workout session
router.post("/:id/start", authenticate, startWorkout);

// Mark exercise as complete
router.post("/:id/exercise/:exerciseId/complete", authenticate, completeExercise);

// Finish workout session
router.post("/:id/finish", authenticate, finishWorkout);

// Workout history
router.get("/history/all", authenticate, workoutHistory);

// Delete workout
router.delete("/:id", authenticate, deleteWorkout);

export default router;
