import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import getExercises from '../../../api/requests/get/getExersices';
import { MUSCLE_GROUPS } from '../../../data/ExercisesCreationConstants';
import type { Exercise } from '../../../types/types';

interface ExerciseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  muscleGroupId: number | null;
  userId: string;
  onSelect: (exercise: Exercise) => void;
}

export default function ExerciseSelectionModal({
  isOpen,
  onClose,
  onBack,
  muscleGroupId,
  userId,
  onSelect,
}: ExerciseSelectionModalProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExercises = async () => {
      if (!muscleGroupId) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await getExercises(muscleGroupId.toString(), userId);
        setExercises(response.exercises || []);
      } catch (err) {
        console.error('Ошибка загрузки упражнений:', err);
        setError('Не удалось загрузить упражнения');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && muscleGroupId) {
      loadExercises();
    } else {
      setExercises([]);
      setError(null);
    }
  }, [isOpen, muscleGroupId, userId]);

  if (!isOpen || !muscleGroupId) return null;

  const muscleGroupName = MUSCLE_GROUPS[muscleGroupId] || 'Неизвестная группа';

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Упражнения на {muscleGroupName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 "
          >
            <X size={24} />
          </button>
        </div>

        {/* Назад */}
        <button
          onClick={onBack}
          className="text-purple-400 text-sm mb-4 text-left"
        >
          ← Назад к группам мышц
        </button>

        {/* Упражнения */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="text-center text-gray-400 py-8">Загрузка...</div>
          )}
          
          {error && (
            <div className="text-center text-red-400 py-8">{error}</div>
          )}

          {!loading && !error && exercises.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              Нет доступных упражнений
            </div>
          )}

          {!loading && !error && exercises.length > 0 && (
            <div className="flex flex-col gap-2">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id_exercise}
                  onClick={() => {
                    onSelect(exercise);
                    onClose();
                  }}
                  className="bg-zinc-800 text-white rounded-lg px-4 py-3 text-left"
                >
                  {exercise.exercise_name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

