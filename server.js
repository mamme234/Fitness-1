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

dotenv.config();
const app = express();

// Connect to Database
connectDatabase();

// Production CORS setup Configuration
const allowedOrigins = [
    "https://fitness-1-kohl.vercel.app", 
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS Setup"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Health Check Route
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Gym Pro API is fully operational 🚀" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Gym Pro running on port ${PORT}`));
