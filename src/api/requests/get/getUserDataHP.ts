import { api } from '../../apiClient';

// Получение пользовательских данных для главной страницы
export default async function getUserDataHP(userId: string) {
    try {
        const data = await api().get(`/home/${userId}`);
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке данных пользователя: ', error);
        throw error;
 }
}