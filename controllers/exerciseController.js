import Exercise from "../models/Exercise.js";

/**
 * =========================
 * GET ALL EXERCISES
 * =========================
 */
export const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({ status: "active" });

        res.status(200).json({
            success: true,
            count: exercises.length,
            exercises
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch exercises.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET SINGLE EXERCISE
 * =========================
 */
export const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: "Exercise not found."
            });
        }

        // Increase view count
        exercise.views += 1;
        await exercise.save();

        res.status(200).json({
            success: true,
            exercise
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch exercise.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET BY MUSCLE GROUP
 * =========================
 */
export const getExercisesByMuscle = async (req, res) => {
    try {
        const muscle = req.params.muscle;

        const exercises = await Exercise.find({
            muscleGroup: muscle,
            status: "active"
        });

        res.status(200).json({
            success: true,
            count: exercises.length,
            exercises
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch muscle exercises.",
            error: error.message
        });
    }
};


/**
 * =========================
 * SEARCH EXERCISES
 * =========================
 */
export const searchExercises = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query required."
            });
        }

        const exercises = await Exercise.find({
            $text: { $search: q },
            status: "active"
        });

        res.status(200).json({
            success: true,
            count: exercises.length,
            exercises
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Search failed.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET PREMIUM EXERCISES
 * =========================
 */
export const getPremiumExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({
            premium: true,
            status: "active"
        });

        res.status(200).json({
            success: true,
            count: exercises.length,
            exercises
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch premium exercises.",
            error: error.message
        });
    }
};
