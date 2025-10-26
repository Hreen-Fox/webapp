import type { Exercise } from '../../types/types';
import { MUSCLE_GROUPS } from '../../data/MusclesGroups';
import getAllExercises from '../../api/requests/get/hooks/getAllExersices';
import { useState, useEffect } from 'react';

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

function ExerciseCard({ exercise, isSelected, onToggle }: ExerciseCardProps) {
  return (
    <div
      onClick={() => onToggle(exercise.id_exercise)}
      className={`rounded-lg border p-3 ${
        exercise.not_recommended
          ? 'border-red-300 bg-red-50'
          : 'border-gray-200 bg-white'
      }`}
    >
       <div className="flex items-start">
        <div className="flex-1">
          <h4 className="font-medium">{exercise.exercise_name}</h4>
          <p className="mt-1 text-sm text-gray-600">{exercise.description}</p>
          {exercise.gif_url && (
            <div className="mt-2 flex justify-center">
              <img
                src={exercise.gif_url}
                alt={exercise.exercise_name}
                className="max-h-24 object-contain"
                loading="lazy"
              />
            </div>
          )}
          {exercise.not_recommended && (
            <span className="mt-1 inline-block text-xs text-red-600">
              Не рекомендуется
            </span>
          )}
        </div>
        {isSelected && (
          <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs">
            ✓
          </div>
        )}
      </div>
    </div>
    
  );
}

interface ExerciseCategoriesProps {
  userId: string;
  onSelectionChange: (selectedIds: number[]) => void;
}

export default function ExerciseCategories({ userId, onSelectionChange }: ExerciseCategoriesProps) {
  const groups = getAllExercises(userId);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // При изменении selectedIds — уведомляем родителя
  useEffect(() => {
    onSelectionChange(Array.from(selectedIds));
  }, [selectedIds, onSelectionChange]);

  const toggleExercise = (id: number) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6 p-4">
      {groups.map((group) => (
        <div key={group.groupId}>
          <h2 className="mb-2 text-lg font-semibold">
            {MUSCLE_GROUPS[group.groupId] || `Группа ${group.groupId}`}
          </h2>

          {group.loading && <div className="text-gray-500">Загрузка...</div>}
          {group.error && <div className="text-red-500">{group.error}</div>}

          {!group.loading && !group.error && group.exercises.length === 0 && (
            <div className="text-gray-400">Нет упражнений</div>
          )}

          {!group.loading && !group.error && group.exercises.length > 0 && (
            <div className="space-y-3">
              {group.exercises.map((ex) => (
                <ExerciseCard
                  key={ex.id_exercise}
                  exercise={ex}
                  isSelected={selectedIds.has(ex.id_exercise)}
                  onToggle={toggleExercise}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}