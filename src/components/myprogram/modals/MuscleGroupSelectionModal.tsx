import { X } from 'lucide-react';
import { MUSCLE_GROUPS } from '../../../data/ExercisesCreationConstants';

interface MuscleGroupSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (muscleGroupId: number) => void;
}

export default function MuscleGroupSelectionModal({
  isOpen,
  onClose,
  onSelect,
}: MuscleGroupSelectionModalProps) {
  if (!isOpen) return null;

  const muscleGroups = Object.entries(MUSCLE_GROUPS).map(([id, name]) => ({
    id: parseInt(id),
    name,
  }));

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Выберите группу мышц</h2>
          <button
            onClick={onClose}
            className="text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Muscle Groups Grid */}
        <div className="grid grid-cols-2 gap-3">
          {muscleGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => {
                onSelect(group.id);
                onClose();
              }}
              className="bg-zinc-800 text-white rounded-lg px-4 py-3 text-center"
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

