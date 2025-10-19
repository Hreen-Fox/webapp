export default function StatsPage() {
    return (
        <div className="h-full flex-1 flex flex-col overflow-auto" id="stats">
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-2">Статистика</h1>
                <p className="text-gray-400">Тренировок за неделю: 5</p>
                <p className="text-gray-400">Серия: 3 дня подряд 🎯</p>
            </div>
            {/* <StatsChart /> */}
        </div>
    );
}