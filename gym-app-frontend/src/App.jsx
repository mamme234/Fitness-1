import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Workout from "./pages/Workout.jsx";
import Exercise from "./pages/Exercise.jsx";
import Challenges from "./pages/Challenges.jsx";
import Progress from "./pages/Progress.jsx";
import Nutrition from "./pages/Nutrition.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/workout"
                    element={
                        <ProtectedRoute>
                            <Workout />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/exercises"
                    element={
                        <ProtectedRoute>
                            <Exercise />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/challenges"
                    element={
                        <ProtectedRoute>
                            <Challenges />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/progress"
                    element={
                        <ProtectedRoute>
                            <Progress />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/nutrition"
                    element={
                        <ProtectedRoute>
                            <Nutrition />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
                                                   }
