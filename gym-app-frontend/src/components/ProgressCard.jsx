export default function ProgressCard({ progress }) {
    return (
        <div className="bg-gray-800 p-3 rounded text-white my-2">
            <p>Weight: {progress.weight} kg</p>
            <p>BMI: {progress.bmi}</p>
            <p>Body Fat: {progress.bodyFat}%</p>
        </div>
    );
}
