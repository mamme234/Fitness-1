import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// ==============================
// PORT
// ==============================
const PORT = process.env.PORT || 3000;

// ==============================
// MongoDB Connection
// ==============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });

// ==============================
// Middlewares
// ==============================
app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
  })
);

app.use(compression());

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

// ==============================
// Rate Limiter
// ==============================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use(limiter);

// ==============================
// Static Files
// ==============================
app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));

// ==============================
// Health Check
// ==============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "Gym Pro Max",
    version: "1.0.0",
    status: "Running",
    serverTime: new Date()
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date()
  });
});

// ==============================
// API Routes
// ==============================

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/workouts", workoutRoutes);
// app.use("/api/exercises", exerciseRoutes);
// app.use("/api/challenges", challengeRoutes);
// app.use("/api/nutrition", nutritionRoutes);
// app.use("/api/progress", progressRoutes);

// ==============================
// 404
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found."
  });
});

// ==============================
// Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined
  });
});

// ==============================
// Start Server
// ==============================
app.listen(PORT, () => {
  console.log("==================================");
  console.log(`🚀 Gym Pro Max Server Running`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  console.log("==================================");
});
