import Progress from "../models/Progress.js";

export const saveProgress = async (req, res) => {
    const data = await Progress.create({
        user: req.user.id,
        ...req.body
    });

    res.json({ success: true, data });
};

export const getProgressHistory = async (req, res) => {
    const data = await Progress.find({ user: req.user.id });

    res.json({ success: true, data });
};

export const getTodayProgress = async (req, res) => {
    const data = await Progress.findOne({ user: req.user.id });

    res.json({ success: true, data });
};

export const updateMeasurements = async (req, res) => {
    const data = await Progress.findOneAndUpdate(
        { user: req.user.id },
        { body: req.body },
        { new: true }
    );

    res.json({ success: true, data });
};

export const deleteProgress = async (req, res) => {
    await Progress.findByIdAndDelete(req.params.id);

    res.json({ success: true });
};
