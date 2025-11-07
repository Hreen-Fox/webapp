import { api } from '../../apiClient';

// Удаление упражнения из программы
export default async function deleteExerciseFromProgram(exPoolId: number) {
  try {
    const data = await api().delete(`/myprograms/removeexercisefromworkout/${exPoolId}`);
    return data;
  } catch (error) {
    console.error('Ошибка при удалении упражнения:', error);
    throw error;
  }
}

