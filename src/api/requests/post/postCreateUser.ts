import { api } from '../../apiClient';

// Создание нового пользователя
export default async function createUser(userData: any) {
  try {
    const response = await api().post('/users/createuser', userData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании пользователя: ', error);
    throw error;
  }
}
