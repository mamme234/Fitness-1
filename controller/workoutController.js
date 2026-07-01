import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";
import User from "../models/User.js";

/**
 * =========================
 * CREATE WORKOUT PLAN
 * =========================
 */
export const createWorkout = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            workoutStyle,
            goal,
            level,
            days = 7
        } = req.body;

        // Fetch random exercises for plan
        const exercises = await Exercise.find({ status: "active" });

        if (!exercises.length) {
            return res.status(404).json({
                success: false,
                message: "No exercises found."
            });
        }

        const workouts = [];

        const weekDays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ];

        for (let i = 0; i < days; i++) {

            const selectedExercises = exercises
                .sort(() => 0.5 - Math.random())
                .slice(0, 6);

            const workoutExercises = selectedExercises.map((ex, index) => ({
                exercise: ex._id,
                order: index + 1,
                sets: ex.sets,
                reps: ex.reps,
                restTime: ex.restTime
            }));

            const workout = await Workout.create({
                user: userId,
                title: `${workoutStyle || "AI"} Day ${i + 1}`,
                description: "Auto generated workout plan",
                workoutStyle: workoutStyle || "Full Body",
                goal: goal || "Gain Muscle",
                level: level || "Beginner",
                dayOfWeek: weekDays[i],
                exercises: workoutExercises,
                totalExercises: workoutExercises.length,
                estimatedDuration: workoutExercises.length * 10
            });

            workouts.push(workout);
        }

        res.status(201).json({
            success: true,
            message: "Workout plan created successfully.",
            workouts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create workout.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET WEEKLY WORKOUTS
 * =========================
 */
export const getWeeklyWorkouts = async (req, res) => {
    try {
        const userId = req.user._id;

        const workouts = await Workout.find({ user: userId })
            .populate("exercises.exercise")
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: workouts.length,
            workouts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch workouts.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET WORKOUT BY DAY
 * =========================
 */
export const getWorkoutByDay = async (req, res) => {
    try {
        const userId = req.user._id;
        const { day } = req.params;

        const workout = await Workout.findOne({
            user: userId,
            dayOfWeek: day
        }).populate("exercises.exercise");

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found for this day."
            });
        }

        res.status(200).json({
            success: true,
            workout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch workout.",
            error: error.message
        });
    }
};
