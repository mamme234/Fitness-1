import Exercise from "../models/Exercise.js";

export const getAllExercises = async (req, res) => {
    const data = await Exercise.find();
    res.json({ success: true, data });
};

export const getExerciseById = async (req, res) => {
    const data = await Exercise.findById(req.params.id);
    res.json({ success: true, data });
};

export const getExercisesByMuscle = async (req, res) => {
    const data = await Exercise.find({ muscle: req.params.muscle });
    res.json({ success: true, data });
};

export const searchExercises = async (req, res) => {
    const data = await Exercise.find({
        name: { $regex: req.query.q, $options: "i" }
    });

    res.json({ success: true, data });
};

export const getPremiumExercises = async (req, res) => {
    const data = await Exercise.find({ premium: true });
    res.json({ success: true, data });
};
