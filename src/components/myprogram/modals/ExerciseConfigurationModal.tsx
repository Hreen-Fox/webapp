import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { REP_RANGES } from '../../../data/ExercisesCreationConstants';
import type { Exercise } from '../../../types/types';

interface ExerciseConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  exercise: Exercise | null;
  onSave: (config: {
    exercise: Exercise;
    repRange: string;
    sets: number;
    weight: number;
  }) => void;
}

export default function ExerciseConfigurationModal({
  isOpen,
  onClose,
  onBack,
  exercise,
  onSave,
}: ExerciseConfigurationModalProps) {
  const [repRange, setRepRange] = useState<string>(REP_RANGES[1].value);
  const [sets, setSets] = useState(3);
  const [weight, setWeight] = useState(50);

  useEffect(() => {
    if (exercise) {
      // Reset to defaults when exercise changes
      setRepRange(REP_RANGES[1].value);
      setSets(3);
      setWeight(50);
    }
  }, [exercise]);

  if (!isOpen || !exercise) return null;

  const handleSave = () => {
    onSave({
      exercise,
      repRange,
      sets,
      weight,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Настройте упражнение</h2>
          <button
            onClick={onClose}
            className="text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Назад */}
        <button
          onClick={onBack}
          className="text-purple-400 text-sm mb-6 text-left w-full"
        >
          ← Назад к выбору упражнения
        </button>

        {/* Название упражнения */}
        <div className="mb-6">
          <div className="bg-zinc-800 text-white rounded-lg px-4 py-4 text-center font-semibold">
            {exercise.exercise_name}
          </div>
        </div>

        {/* Повторения */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-3">Диапазон повторений</label>
          <div className="flex gap-2">
            {REP_RANGES.map((range) => (
              <button
                key={range.value}
                onClick={() => setRepRange(range.value)}
                className={`flex-1 rounded-lg py-2 transition ${
                  repRange === range.value
                    ? 'bg-purple-700 text-white'
                    : 'bg-zinc-800 text-gray-300'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Подходы и вес */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Подходы</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Вес (кг)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0.5)}
              min="0.5"
              step="0.5"
              className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Сохранить */}
        <button
          onClick={handleSave}
          className="w-full bg-purple-700 text-white rounded-lg py-3 font-medium"
        >
          Сохранить упражнение
        </button>
      </div>
    </div>
  );
}

