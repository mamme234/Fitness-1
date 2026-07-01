import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
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

        setLoading(true);
        setError("");

        try {
            await login(form.email, form.password);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-center text-white mb-2">
                    💪 Gym Pro
                </h1>

                <p className="text-center text-gray-400 mb-6">
                    Sign in to your account
                </p>

                {error && (
                    <div className="bg-red-600 text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 transition rounded-lg p-3 text-white font-semibold"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-green-400 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
      }
