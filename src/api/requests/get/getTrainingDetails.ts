import { api } from '../../apiClient';

// Получение деталей тренировки
export default async function getTrainingDetails(trainingId: string) {
	try {
		const data = await api().get(`/hystory/details/${trainingId}`);
		return data;
	} catch (error) {
		console.error('Ошибка при загрузке деталей тренировки: ', error);
		throw error;
  }
}