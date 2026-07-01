import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await register({
                name: form.name,
                email: form.email,
                password: form.password
            });

            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
            <div className="bg-gray-900 w-full max-w-md rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-white">
                    💪 Gym Pro
                </h1>

                <p className="text-center text-gray-400 mt-2 mb-6">
                    Create your account
                </p>

                {error && (
                    <div className="bg-red-600 text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-semibold"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-green-400 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
