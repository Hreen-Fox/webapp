import { useState, useEffect } from "react";
import Panel from "../ui/Panel.tsx";
import SocialButton from "../ui/SocialButton.tsx";
import ProgramBlock from "./ProgramBlock.tsx";
import AddProgramModal from "./modals/AddProgramModal.tsx";
import getUserPrograms from "../../api/requests/get/getUserPrograms.ts";
import createProgram from "../../api/requests/post/postCreateProgram.ts";
import deleteProgram from "../../api/requests/delete/deleteProgram.ts";
import type { Program, ProgramsResponse } from "../../types/types.ts";

interface ProgramListProps {
  onError?: (message: string | null) => void;
  userId: string;
}

export default function Programs({ onError, userId }: ProgramListProps) {
    const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (onError) onError(error);
    }, [error]);

    // Загрузка программ при монтировании компонента
    useEffect(() => {
        loadPrograms();
    }, [userId]);

    const loadPrograms = async () => {
        console.log('MyProgram: loadPrograms вызван, userId:', userId);
        setLoading(true);
        setError(null);
        try {
            console.log('MyProgram: Запрос программ для userId:', userId);
            const response: ProgramsResponse = await getUserPrograms(userId);
            console.log('MyProgram: Ответ от API (программы):', response);
            console.log('MyProgram: Количество программ:', response.program_train?.length || 0);
            const programsList = response.program_train || [];
            console.log('MyProgram: Устанавливаем программы в состояние:', programsList);
            setPrograms(programsList);
            console.log('MyProgram: Состояние programs обновлено, количество:', programsList.length);
        } catch (err: any) {
            console.error('MyProgram: Ошибка загрузки программ:', err);
            // Если 404 - это нормально для пустого списка, устанавливаем пустой массив
            if (err?.response?.status === 404 || err?.data?.detail?.includes('не найдены')) {
                console.log('MyProgram: Программы не найдены (404), устанавливаем пустой массив');
                setPrograms([]);
            } else {
                setError('Не удалось загрузить программы');
            }
        } finally {
            setLoading(false);
            console.log('MyProgram: loadPrograms завершен, loading установлен в false');
        }
    };

    const handleAddProgram = async (name: string, day: string) => {
        console.log('MyProgram: handleAddProgram вызван');
        console.log('MyProgram: Данные программы:', { name, day, userId });
        
        try {
            const requestData = {
                id_user: parseInt(userId),
                name_programs_workout: name,
                week_day_programs_workout: day,
            };
            console.log('MyProgram: Отправка запроса на создание программы:', requestData);
            
            const response = await createProgram(requestData);
            console.log('MyProgram: Ответ от API:', response);

            if (response.status) {
                console.log('MyProgram: Программа успешно создана, перезагружаем список');
                console.log('MyProgram: ID созданной программы:', response.data?.program_id);
                // Небольшая задержка перед перезагрузкой, чтобы база данных успела обновиться
                await new Promise(resolve => setTimeout(resolve, 300));
                // Перезагружаем программы после успешного создания
                await loadPrograms();
                console.log('MyProgram: loadPrograms завершен, проверяем состояние programs');
            } else {
                console.error('MyProgram: Ошибка создания программы:', response.message);
                setError(response.message || 'Не удалось создать программу');
            }
        } catch (err) {
            console.error('MyProgram: Исключение при создании программы:', err);
            setError('Не удалось создать программу');
        }
    };

    const handleAddExercise = async () => {
        // После добавления упражнения перезагружаем программы
        await loadPrograms();
    };

    const handleDeleteProgram = async (programId: number) => {
        try {
            const response = await deleteProgram(programId);
            if (response.status) {
                // Перезагружаем программы после успешного удаления
                await loadPrograms();
            } else {
                console.error('Ошибка удаления программы:', response.message);
                setError(response.message || 'Не удалось удалить программу');
            }
        } catch (err) {
            console.error('Ошибка удаления программы:', err);
            setError('Не удалось удалить программу');
        }
    };

    const handleDeleteExercise = async () => {
        try {
            // После удаления упражнения перезагружаем программы
            await loadPrograms();
            // Очищаем ошибку при успешной перезагрузке
            setError(null);
        } catch (err) {
            console.error('Ошибка при перезагрузке программ после удаления упражнения:', err);
            setError('Не удалось обновить список программ');
        }
    };

    return (
        <div>
            <Panel
                title="Программы тренировок"
                button={
                    <SocialButton
                        title="Добавить"
                        color="bg-purple-700"
                        textColor="text-white"
                        onClick={() => setIsAddProgramModalOpen(true)}
                    />
                }
                onClick={() => {}}
                programBlock={
                    loading ? (
                        <div className="text-center text-gray-400 py-8">Загрузка...</div>
                    ) : (
                        <ProgramBlock 
                            programs={programs}
                            userId={userId}
                            onAddExercise={handleAddExercise}
                            onDeleteProgram={handleDeleteProgram}
                            onDeleteExercise={handleDeleteExercise}
                            onError={setError}
                        />
                    )
                }
            />

            <AddProgramModal
                isOpen={isAddProgramModalOpen}
                onClose={() => {
                    setIsAddProgramModalOpen(false);
                    setError(null);
                }}
                onSave={handleAddProgram}
            />
        </div>
    )

}