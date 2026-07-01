import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Exercise from "./pages/Exercise";
import Challenges from "./pages/Challenges";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
