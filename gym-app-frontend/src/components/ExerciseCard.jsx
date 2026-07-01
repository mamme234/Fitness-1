export default function ExerciseCard({ exercise }) {
    return (
        <div className="bg-gray-900 p-3 rounded my-2 text-white">
            <h2 className="font-semibold">{exercise.name}</h2>
            <p>Muscle: {exercise.muscleGroup}</p>
            <p>Reps: {exercise.reps}</p>
        </div>
    );
}
