import Workout from "../models/Workout.js";
import User from "../models/User.js";

/**
 * =========================
 * START WORKOUT
 * =========================
 */
export const startWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;

        const workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found."
            });
        }

        workout.startedAt = new Date();
        workout.isCompleted = false;

        await workout.save();

        res.status(200).json({
            success: true,
            message: "Workout started.",
            workout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to start workout.",
            error: error.message
        });
    }
};


/**
 * =========================
 * COMPLETE EXERCISE
 * =========================
 */
export const completeExercise = async (req, res) => {
    try {
        const { id, exerciseId } = req.params;

        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found."
            });
        }

        const exercise = workout.exercises.find(
            (ex) => ex.exercise.toString() === exerciseId
        );

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: "Exercise not found in workout."
            });
        }

        exercise.completed = true;

        workout.completedExercises =
            workout.exercises.filter((ex) => ex.completed).length;

        workout.completionPercentage = Math.round(
            (workout.completedExercises / workout.totalExercises) * 100
        );

        await workout.save();

        res.status(200).json({
            success: true,
            message: "Exercise completed.",
            workout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to complete exercise.",
            error: error.message
        });
    }
};


/**
 * =========================
 * FINISH WORKOUT
 * =========================
 */
export const finishWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found."
            });
        }

        workout.completedAt = new Date();
        workout.isCompleted = true;

        const duration = workout.startedAt
            ? (new Date() - workout.startedAt) / 60000
            : workout.estimatedDuration;

        workout.caloriesBurned =
            workout.totalExercises * 50;

        await workout.save();

        // Update user stats
        await User.findByIdAndUpdate(workout.user, {
            $inc: {
                completedWorkouts: 1,
                totalCaloriesBurned: workout.caloriesBurned,
                totalWorkoutMinutes: Math.round(duration)
            },
            lastWorkout: new Date()
        });

        res.status(200).json({
            success: true,
            message: "Workout completed successfully.",
            workout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to finish workout.",
            error: error.message
        });
    }
};


/**
 * =========================
 * WORKOUT HISTORY
 * =========================
 */
export const workoutHistory = async (req, res) => {
    try {
        const workouts = await Workout.find({
            user: req.user._id,
            isCompleted: true
        }).sort({ completedAt: -1 });

        res.status(200).json({
            success: true,
            count: workouts.length,
            workouts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch history.",
            error: error.message
        });
    }
};


/**
 * =========================
 * DELETE WORKOUT
 * =========================
 */
export const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found."
            });
        }

        await workout.deleteOne();

        res.status(200).json({
            success: true,
            message: "Workout deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete workout.",
            error: error.message
        });
    }
};
