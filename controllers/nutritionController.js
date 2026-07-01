import Nutrition from "../models/Nutrition.js";

/**
 * =========================
 * GET ALL NUTRITION
 * =========================
 */
export const getAllNutrition = async (req, res) => {
    try {
        const foods = await Nutrition.find({ active: true });

        res.status(200).json({
            success: true,
            count: foods.length,
            foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch nutrition data.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET SINGLE ITEM
 * =========================
 */
export const getNutritionById = async (req, res) => {
    try {
        const food = await Nutrition.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found."
            });
        }

        food.views += 1;
        await food.save();

        res.status(200).json({
            success: true,
            food
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch food.",
            error: error.message
        });
    }
};


/**
 * =========================
 * SEARCH FOOD
 * =========================
 */
export const searchNutrition = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query required."
            });
        }

        const foods = await Nutrition.find({
            $text: { $search: q },
            active: true
        });

        res.status(200).json({
            success: true,
            count: foods.length,
            foods
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
 * GET BY CATEGORY
 * =========================
 */
export const getByCategory = async (req, res) => {
    try {
        const foods = await Nutrition.find({
            category: req.params.category,
            active: true
        });

        res.status(200).json({
            success: true,
            count: foods.length,
            foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to filter by category.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET BY MEAL TYPE
 * =========================
 */
export const getByMealType = async (req, res) => {
    try {
        const foods = await Nutrition.find({
            mealType: req.params.type,
            active: true
        });

        res.status(200).json({
            success: true,
            count: foods.length,
            foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to filter by meal type.",
            error: error.message
        });
    }
};


/**
 * =========================
 * PREMIUM NUTRITION
 * =========================
 */
export const getPremiumNutrition = async (req, res) => {
    try {
        const foods = await Nutrition.find({
            premium: true,
            active: true
        });

        res.status(200).json({
            success: true,
            count: foods.length,
            foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch premium nutrition.",
            error: error.message
        });
    }
};
