import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Challenges() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        api.get("/challenges")
            .then(res => setChallenges(res.data.data));
    }, []);

    return (
        <div className="p-4 text-white">
            <h1>🔥 Challenges</h1>

            {challenges.map(c => (
                <div key={c._id} className="bg-gray-900 p-3 my-2">
                    <h2>{c.title}</h2>
                    <button className="bg-green-500 px-2 py-1">
                        Join
                    </button>
                </div>
            ))}
        </div>
    );
}
