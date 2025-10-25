import type { Exercise } from '../../types/types';
import { MUSCLE_GROUPS } from '../../data/MusclesGroups';
import getAllExercises from '../../api/requests/get/hooks/getAllExersices';

interface ExerciseCardProps {
  exercise: Exercise;
}

function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        exercise.not_recommended
          ? 'border-red-300 bg-red-50'
          : 'border-gray-200 bg-white'
      }`}
    >
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
  );
}

interface ExerciseCategoriesProps {
  userId: string;
}

export default function ExerciseCategories({ userId }: ExerciseCategoriesProps) {
  const groups = getAllExercises(userId);

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
                <ExerciseCard key={ex.id_exercise} exercise={ex} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}