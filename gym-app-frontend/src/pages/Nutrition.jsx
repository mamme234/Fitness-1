import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Nutrition() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        api.get("/nutrition")
            .then(res => setFoods(res.data.data));
    }, []);

    return (
        <div className="p-4 text-white">
            <h1>🥗 Nutrition</h1>

            {foods.map(f => (
                <div key={f._id} className="bg-gray-900 p-2 my-2">
                    <h2>{f.name}</h2>
                    <p>{f.calories} kcal</p>
                </div>
            ))}
        </div>
    );
}
