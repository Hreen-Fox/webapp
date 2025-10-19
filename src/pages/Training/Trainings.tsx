export default function TrainingsPage() {
    return (
        <div className="h-full flex-1 flex flex-col overflow-auto" id="trainings">
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-2">Тренировки</h1>
                <p className="text-gray-400 mt-2">Здесь будут отображаться ваши тренировки</p>
            </div>
            {/* Позже: <WorkoutList />, <WorkoutPlan />, <StartButton /> */}
        </div>
    );
}