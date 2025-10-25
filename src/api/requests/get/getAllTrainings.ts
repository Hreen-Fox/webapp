import { api } from '../../apiClient';

// Получение всех тренировок пользователя
export default async function getAllTrainings(userId: string) {
	try {
		const data = await api().get(`/hystory/workouts/${userId}`);
		return data;
	} catch (error) {
		console.error('Ошибка при загрузке тренировок: ', error);
		throw error;
	}
}
