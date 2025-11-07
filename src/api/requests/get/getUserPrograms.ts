import { api } from '../../apiClient';

// Получение всех программ пользователя
export default async function getUserPrograms(userId: string) {
  try {
    console.log('getUserPrograms: Запрос программ для userId:', userId);
    const data = await api().get(`/myprograms/programs/${userId}`);
    console.log('getUserPrograms: Ответ от API:', data);
    return data;
  } catch (error) {
    console.error('getUserPrograms: Ошибка при загрузке программ:', error);
    throw error;
  }
}

