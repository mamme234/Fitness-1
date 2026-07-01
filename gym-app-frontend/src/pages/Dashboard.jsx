import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        api.get("/workouts/weekly")
            .then(res => setWorkouts(res.data.workouts));
    }, []);

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold">🔥 Your Weekly Plan</h1>

            {workouts.map(w => (
                <div key={w._id} className="bg-gray-800 p-3 my-2 rounded">
                    <h2>{w.title}</h2>
                    <p>{w.dayOfWeek}</p>
                </div>
            ))}
        </div>
    );
}
