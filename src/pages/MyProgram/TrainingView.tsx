import TrainingSession from './TrainingSession';    
import type { TrainingResult } from '../../types/types'
    
export default function TrainingView() {
    const exercises = [
        { id: 1, name: 'Отжимания', description: 'Классические отжимания от пола', gif_url: '/pushup.gif' },
        { id: 2, name: 'Приседания', description: 'Глубокие приседания без веса', gif_url: '/squat.gif' },
        { id: 3, name: 'Планка', description: 'Удерживать 30 секунд', gif_url: '/plank.gif' },
    ];

    const handleComplete = (results: TrainingResult[]) => {
        console.log('Результаты тренировки:', results);
        // Отправить на сервер, сохранить и т.д.
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <TrainingSession exercises={exercises} onComplete={handleComplete} />
        </div>
    )
}

