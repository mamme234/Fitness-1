import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    telegramId: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },

    username: {
      type: String,
      trim: true
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      trim: true,
      default: ""
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: ""
    },

    password: {
      type: String,
      default: ""
    },

    profilePhoto: {
      type: String,
      default: ""
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male"
    },

    age: {
      type: Number,
      default: 18
    },

    height: {
      type: Number,
      default: 170
    },

    weight: {
      type: Number,
      default: 70
    },

    bmi: {
      type: Number,
      default: 0
    },

    bodyFat: {
      type: Number,
      default: 0
    },

    activityLevel: {
      type: String,
      default: "Beginner"
    },

    workoutStyle: {
      type: String,
      default: "Full Body"
    },

    goal: {
      type: String,
      enum: [
        "Lose Weight",
        "Gain Muscle",
        "Maintain Weight",
        "Strength",
        "Endurance"
      ],
      default: "Gain Muscle"
    },

    caloriesTarget: {
      type: Number,
      default: 2500
    },

    proteinTarget: {
      type: Number,
      default: 150
    },

    carbsTarget: {
      type: Number,
      default: 250
    },

    fatsTarget: {
      type: Number,
      default: 70
    },

    waterTarget: {
      type: Number,
      default: 3000
    },

    workoutDuration: {
      type: Number,
      default: 60
    },

    workoutStartTime: {
      type: String,
      default: "18:00"
    },

    streak: {
      type: Number,
      default: 0
    },

    longestStreak: {
      type: Number,
      default: 0
    },

    completedWorkouts: {
      type: Number,
      default: 0
    },

    completedExercises: {
      type: Number,
      default: 0
    },

    totalCaloriesBurned: {
      type: Number,
      default: 0
    },

    totalWorkoutMinutes: {
      type: Number,
      default: 0
    },

    level: {
      type: Number,
      default: 1
    },

    xp: {
      type: Number,
      default: 0
    },

    coins: {
      type: Number,
      default: 0
    },

    premium: {
      type: Boolean,
      default: false
    },

    premiumExpires: {
      type: Date
    },

    lastWorkout: {
      type: Date
    },

    language: {
      type: String,
      default: "en"
    },

    theme: {
      type: String,
      default: "dark"
    },

    notificationEnabled: {
      type: Boolean,
      default: true
    },

    role: {
      type: String,
      enum: ["user", "coach", "admin"],
      default: "user"
    },

    isVerified: {
      type: Boolean,
      default: true
    },

    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
