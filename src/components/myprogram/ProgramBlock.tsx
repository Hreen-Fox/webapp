import { useState } from "react";
import { Trash2 } from "lucide-react";
import MuscleGroupSelectionModal from "./modals/MuscleGroupSelectionModal.tsx";
import ExerciseSelectionModal from "./modals/ExerciseSelectionModal.tsx";
import ExerciseConfigurationModal from "./modals/ExerciseConfigurationModal.tsx";
import { repRangeToMinMax } from "../../utils/repRangeConverter.ts";
import addExerciseToProgram from "../../api/requests/post/postAddExerciseToProgram.ts";
import deleteExerciseFromProgram from "../../api/requests/delete/deleteExerciseFromProgram.ts";
import type { Exercise, Program } from "../../types/types.ts";
import { minMaxToRepRange } from "../../utils/repRangeConverter.ts";

interface ProgramBlockProps {
    programs: Program[];
    userId: string;
    onAddExercise: () => void;
    onDeleteProgram: (programId: number) => void;
    onDeleteExercise: () => void;
    onError?: (message: string) => void;
}

export default function ProgramBlock({ 
    programs, 
    userId,
    onAddExercise,
    onDeleteProgram,
    onDeleteExercise,
    onError,
}: ProgramBlockProps) {
    const [selectedProgramIndex, setSelectedProgramIndex] = useState<number | null>(null);
    const [isMuscleGroupModalOpen, setIsMuscleGroupModalOpen] = useState(false);
    const [isExerciseSelectionModalOpen, setIsExerciseSelectionModalOpen] = useState(false);
    const [isExerciseConfigModalOpen, setIsExerciseConfigModalOpen] = useState(false);
    const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState<number | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const handleAddExerciseClick = (programIndex: number) => {
        setSelectedProgramIndex(programIndex);
        setIsMuscleGroupModalOpen(true);
    };

    const handleMuscleGroupSelect = (muscleGroupId: number) => {
        setSelectedMuscleGroupId(muscleGroupId);
        setIsMuscleGroupModalOpen(false);
        setIsExerciseSelectionModalOpen(true);
    };

    const handleExerciseSelect = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setIsExerciseSelectionModalOpen(false);
        setIsExerciseConfigModalOpen(true);
    };

    const handleExerciseConfigSave = async (config: {
        exercise: Exercise;
        repRange: string;
        sets: number;
        weight: number;
    }) => {
        if (selectedProgramIndex !== null && programs[selectedProgramIndex]) {
            const program = programs[selectedProgramIndex];
            const { min, max } = repRangeToMinMax(config.repRange);

            try {
                const response = await addExerciseToProgram({
                    id_programs_workout: program.id_program,
                    id_workout_exercises: config.exercise.id_exercise,
                    max_target_iteration_ex_pool: max,
                    min_target_iteration_ex_pool: min,
                    approaches_target_ex_pool: config.sets,
                    weight_ex_pool: config.weight,
                });

                if (response.status) {
                    // Уведомляем родительский компонент о добавлении упражнения
                    onAddExercise();
                } else {
                    console.error('Ошибка добавления упражнения:', response.message);
                }
            } catch (err) {
                console.error('Ошибка добавления упражнения:', err);
            }
        }
        
        // Reset state
        setSelectedProgramIndex(null);
        setSelectedMuscleGroupId(null);
        setSelectedExercise(null);
        setIsExerciseConfigModalOpen(false);
    };

    return (
        <>
            {programs.length === 0 ? (
                <p className="text-center text-gray-400 py-6 px-4">
                    У вас пока нет программ. Начните с добавления новой!
                </p>
            ) : (
                <div className="flex flex-col gap-3 mt-2 w-full">
                    {programs.map((p, i) => (
                        <div
                            key={p.id_program}
                            className="bg-zinc-900/50 rounded-xl p-3 flex flex-col gap-2"
                        >   
                            {/* Заголовок и кнопка удаления */}
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-purple-400">
                                    {p.name_program} <span className="text-xs text-gray-400"> - {p.day}</span>
                                </span>
                                <button 
                                    onClick={() => onDeleteProgram(p.id_program)}
                                    className="text-gray-400"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Список упражнений */}
                            {p.workout_ex_in_program && p.workout_ex_in_program.length > 0 && (
                                <div className="flex flex-col gap-2 mt-1">
                                    {p.workout_ex_in_program.map((ex) => {
                                        const repRange = minMaxToRepRange(ex.min_target_iteration_ex_pool, ex.max_target_iteration_ex_pool);
                                        return (
                                            <div
                                                key={ex.id_ex_pool || `${p.id_program}-${ex.id_workout_ex}`}
                                                className="bg-zinc-900 rounded-lg px-3 py-2 flex flex-col gap-1"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold text-gray-200 text-sm">
                                                        {ex.name_workout_ex}
                                                    </span>
                                                    <button 
                                                        onClick={async () => {
                                                            console.log('Удаление упражнения:');
                                                            console.log('- Полные данные упражнения:', ex);
                                                            console.log('- id_ex_pool:', ex.id_ex_pool);
                                                            console.log('- id_workout_ex:', ex.id_workout_ex);
                                                            console.log('- id_program:', p.id_program);
                                                            
                                                            // Проверяем наличие id_ex_pool
                                                            if (!ex.id_ex_pool) {
                                                                console.error('id_ex_pool отсутствует в данных упражнения');
                                                                console.log('Доступные данные:', {
                                                                    id_workout_ex: ex.id_workout_ex,
                                                                    id_program: p.id_program,
                                                                    name: ex.name_workout_ex
                                                                });
                                                                if (onError) {
                                                                    onError('Ошибка: отсутствует ID записи (id_ex_pool) для удаления. Нужно обновить схему API, чтобы включить id_ex_pool в ответ.');
                                                                }
                                                                return;
                                                            }
                                                            
                                                            try {
                                                                console.log('Отправка запроса на удаление, id_ex_pool:', ex.id_ex_pool);
                                                                const response = await deleteExerciseFromProgram(ex.id_ex_pool);
                                                                console.log('Ответ от API:', response);
                                                                
                                                                if (response.status) {
                                                                    onDeleteExercise();
                                                                } else {
                                                                    const errorMsg = response.message || 'Не удалось удалить упражнение';
                                                                    console.error('Ошибка удаления упражнения:', errorMsg);
                                                                    if (onError) {
                                                                        onError(errorMsg);
                                                                    }
                                                                }
                                                            } catch (err) {
                                                                const errorMsg = 'Не удалось удалить упражнение';
                                                                console.error('Ошибка удаления упражнения:', err);
                                                                if (onError) {
                                                                    onError(errorMsg);
                                                                }
                                                            }
                                                        }}
                                                        className="text-gray-400"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-gray-400 text-xs">
                                                    {ex.name_muscle_category} · {repRange} повт. · {ex.weight_ex_pool}кг · {ex.approaches_target_ex_pool} подх.
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            
                            {/* Кнопка добавления упражнения */}
                            <button
                                onClick={() => handleAddExerciseClick(i)}
                                className="bg-zinc-700 text-gray-300 rounded-lg py-2 text-sm"
                            >
                                + Добавить упражнение
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modals */}
            <MuscleGroupSelectionModal
                isOpen={isMuscleGroupModalOpen}
                onClose={() => setIsMuscleGroupModalOpen(false)}
                onSelect={handleMuscleGroupSelect}
            />

            <ExerciseSelectionModal
                isOpen={isExerciseSelectionModalOpen}
                onClose={() => setIsExerciseSelectionModalOpen(false)}
                onBack={() => {
                    setIsExerciseSelectionModalOpen(false);
                    setIsMuscleGroupModalOpen(true);
                }}
                muscleGroupId={selectedMuscleGroupId}
                userId={userId}
                onSelect={handleExerciseSelect}
            />

            <ExerciseConfigurationModal
                isOpen={isExerciseConfigModalOpen}
                onClose={() => setIsExerciseConfigModalOpen(false)}
                onBack={() => {
                    setIsExerciseConfigModalOpen(false);
                    setIsExerciseSelectionModalOpen(true);
                }}
                exercise={selectedExercise}
                onSave={handleExerciseConfigSave}
            />
        </>
    );
}