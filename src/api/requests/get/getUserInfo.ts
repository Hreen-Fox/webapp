import {api} from '../../apiClient';

// Получение деталей тренировки
export default async function getUserInfo(userId: string) {
  try {
      return await api().get(`/users/${userId}`);
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователя: ', error);
    throw error;
  }
}