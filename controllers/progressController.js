import Progress from "../models/Progress.js";

/**
 * =========================
 * SAVE PROGRESS
 * =========================
 */
export const saveProgress = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            weight,
            bmi,
            bodyFat,
            muscleMass,
            nutrition,
            workout,
            mood,
            sleepHours,
            heartRate,
            recoveryScore,
            notes
        } = req.body;

        const progress = await Progress.create({
            user: userId,
            weight,
            bmi,
            bodyFat,
            muscleMass,
            nutrition,
            workout,
            mood,
            sleepHours,
            heartRate,
            recoveryScore,
            notes
        });

        res.status(201).json({
            success: true,
            message: "Progress saved successfully.",
            progress
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to save progress.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET HISTORY
 * =========================
 */
export const getProgressHistory = async (req, res) => {
    try {
        const progress = await Progress.find({
            user: req.user._id
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: progress.length,
            progress
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch progress history.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET TODAY PROGRESS
 * =========================
 */
export const getTodayProgress = async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const progress = await Progress.findOne({
            user: req.user._id,
            date: { $gte: start, $lte: end }
        });

        res.status(200).json({
            success: true,
            progress
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch today progress.",
            error: error.message
        });
    }
};


/**
 * =========================
 * UPDATE MEASUREMENTS
 * =========================
 */
export const updateMeasurements = async (req, res) => {
    try {
        const { bodyMeasurements } = req.body;

        const progress = await Progress.findOneAndUpdate(
            { user: req.user._id },
            { bodyMeasurements },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Measurements updated.",
            progress
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update measurements.",
            error: error.message
        });
    }
};


/**
 * =========================
 * DELETE PROGRESS
 * =========================
 */
export const deleteProgress = async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id);

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Progress not found."
            });
        }

        await progress.deleteOne();

        res.status(200).json({
            success: true,
            message: "Progress deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete progress.",
            error: error.message
        });
    }
};
