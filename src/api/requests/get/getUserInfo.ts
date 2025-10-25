import { api } from '../../apiClient';

// Получение деталей тренировки
export default async function getUserInfo(userId: string) {
  try {
    const data = await api().get(`/users/${userId}`);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователя: ', error);
    throw error;
  }
}