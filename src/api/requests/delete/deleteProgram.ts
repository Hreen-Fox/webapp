import { api } from '../../apiClient';

// Удаление программы
export default async function deleteProgram(programId: number) {
  try {
    const data = await api().delete(`/myprograms/programs/${programId}`);
    return data;
  } catch (error) {
    console.error('Ошибка при удалении программы:', error);
    throw error;
  }
}

