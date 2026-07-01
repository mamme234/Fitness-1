import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDatabase from "./config/database.js";

// Routes
import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/workout.js";
import exerciseRoutes from "./routes/exercise.js";
import challengeRoutes from "./routes/challenge.js";
import progressRoutes from "./routes/progress.js";
import nutritionRoutes from "./routes/nutrition.js";

dotenv.config();

const app = express();

/* ===========================
   DATABASE
=========================== */
connectDatabase();

/* ===========================
   MIDDLEWARE
=========================== */

app.use(cors({
    origin: [
        "https://fitness-fuza.vercel.app" // Replace with your Vercel URL
    ],
    credentials: true
}));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

/* ===========================
   ROOT
=========================== */

app.get("/", (req, res) => {
    res.json({
        success: true,
        app: "Gym Pro API",
        version: "1.0.0",
        status: "Running 🚀"
    });
});

/* ===========================
   HEALTH
=========================== */

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

/* ===========================
   API ROUTES
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/nutrition", nutritionRoutes);

/* ===========================
   404
=========================== */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

/* ===========================
   ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

/* ===========================
   SERVER
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("==================================");
    console.log(`🚀 Gym Pro API running`);
    console.log(`🌍 Port : ${PORT}`);
    console.log(`❤️ Health : /api/health`);
    console.log("==================================");
});
