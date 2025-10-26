// components/WorkoutSession.tsx
import { useState, useEffect } from 'react';
import type { TrainingResult } from '../../types/types'

interface TrainingExercise {
  id: number;
  name: string;
  description: string;
  gif_url?: string;
}

interface TrainingSessionProps {
  exercises: TrainingExercise[];
  onComplete: (results: TrainingResult[]) => void;
}

export default function TrainingSession({ exercises, onComplete }: TrainingSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sets, setSets] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const currentExercise = exercises[currentIndex];

  // Сброс счётчика подходов при переходе к новому упражнению
  useEffect(() => {
    setSets(0);
  }, [currentIndex]);

  const handleAddSet = () => {
    setSets((prev) => prev + 1);
  };

  const handleFinishExercise = () => {
    setIsExiting(true);
    setTimeout(() => {
      const isLast = currentIndex === exercises.length - 1;

      if (isLast) {
        // ✅ Явно указываем тип
        const results: TrainingResult[] = exercises.map((ex, i) => ({
          exerciseId: ex.id,
          sets: i === currentIndex ? sets : 0,
        }));
        onComplete(results);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setIsExiting(false);
      }
    }, 300);
  };

  if (!currentExercise) return null;

  return (
    <div className="flex h-full flex-col items-center justify-between p-4">
      {/* Анимированный блок упражнения */}
      <div
        className={`w-full max-w-md transition-transform duration-300 ${
          isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
        style={{ transform: isExiting ? 'translateX(100%)' : 'translateX(0)' }}
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{currentExercise.name}</h2>
          <p className="mt-2 text-gray-600">{currentExercise.description}</p>
        </div>

        {currentExercise.gif_url && (
          <div className="mb-6 flex justify-center">
            <img
              src={currentExercise.gif_url}
              alt={currentExercise.name}
              className="max-h-48 object-contain"
            />
          </div>
        )}

        <div className="mb-6 text-center text-lg">
          Подходов: <span className="font-bold">{sets}</span>
        </div>
      </div>

      {/* Управление */}
      <div className="w-full max-w-md space-y-3">
        <button
          onClick={handleAddSet}
          className="w-full py-3 bg-blue-500 text-white rounded-lg active:bg-blue-600"
        >
          + Подход
        </button>
        <button
          onClick={handleFinishExercise}
          className="w-full py-3 bg-green-500 text-white rounded-lg active:bg-green-600"
        >
          {currentIndex === exercises.length - 1 ? 'Завершить тренировку' : 'Завершить упражнение'}
        </button>
      </div>
    </div>
  );
}