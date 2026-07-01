export default function WorkoutCard({ workout }) {
    return (
        <div className="bg-gray-800 p-3 rounded-lg my-2 text-white">
            <h2 className="font-bold">{workout.title}</h2>
            <p>Day: {workout.dayOfWeek}</p>
            <p>Exercises: {workout.totalExercises}</p>
        </div>
    );
}
