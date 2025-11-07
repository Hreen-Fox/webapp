import { useState } from 'react';
import { X } from 'lucide-react';
import { DAYS_OF_WEEK } from '../../../data/ExercisesCreationConstants';

interface AddProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, day: string) => Promise<void>;
}

export default function AddProgramModal({ isOpen, onClose, onSave }: AddProgramModalProps) {
  const [name, setName] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>(DAYS_OF_WEEK[0]);

  if (!isOpen) return null;

  const handleSave = async () => {
    console.log('AddProgramModal: handleSave вызван');
    console.log('AddProgramModal: name:', name);
    console.log('AddProgramModal: selectedDay:', selectedDay);
    
    if (name.trim()) {
      console.log('AddProgramModal: Вызываем onSave с данными:', { name: name.trim(), day: selectedDay });
      try {
        await onSave(name.trim(), selectedDay);
        // Очищаем форму и закрываем модальное окно только после успешного сохранения
        setName('');
        setSelectedDay(DAYS_OF_WEEK[0]);
        onClose();
      } catch (error) {
        console.error('AddProgramModal: Ошибка при сохранении:', error);
        // Модальное окно остается открытым при ошибке
      }
    } else {
      console.warn('AddProgramModal: Название программы пустое, сохранение отменено');
    }
  };

  const handleCancel = () => {
    setName('');
    setSelectedDay(DAYS_OF_WEEK[0]);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Новая программа</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Название</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например, Тренировка А"
            className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
        </div>

        {/* Day Selection */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2">День недели</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 bg-zinc-700 text-white rounded-lg py-2"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-purple-700 text-white rounded-lg py-2"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

