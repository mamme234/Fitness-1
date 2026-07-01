import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Workout() {
    const [workout, setWorkout] = useState(null);

    useEffect(() => {
        api.get("/workouts/Monday")
            .then(res => setWorkout(res.data.workout));
    }, []);

    if (!workout) return <p>Loading...</p>;

    return (
        <div className="p-4 text-white">
            <h1>{workout.title}</h1>

            {workout.exercises.map((ex, i) => (
                <div key={i} className="bg-gray-900 p-2 my-2">
                    <h3>{ex.exercise.name}</h3>
                    <p>{ex.reps} reps</p>
                </div>
            ))}
        </div>
    );
}
