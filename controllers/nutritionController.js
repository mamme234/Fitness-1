import Nutrition from "../models/Nutrition.js";

export const getAllNutrition = async (req, res) => {
    const data = await Nutrition.find();
    res.json({ success: true, data });
};

export const getNutritionById = async (req, res) => {
    const data = await Nutrition.findById(req.params.id);
    res.json({ success: true, data });
};

export const searchNutrition = async (req, res) => {
    const data = await Nutrition.find({
        name: { $regex: req.query.q, $options: "i" }
    });

    res.json({ success: true, data });
};

export const getByCategory = async (req, res) => {
    const data = await Nutrition.find({ category: req.params.category });
    res.json({ success: true, data });
};

export const getByMealType = async (req, res) => {
    const data = await Nutrition.find({ mealType: req.params.type });
    res.json({ success: true, data });
};

export const getPremiumNutrition = async (req, res) => {
    const data = await Nutrition.find({ premium: true });
    res.json({ success: true, data });
};
