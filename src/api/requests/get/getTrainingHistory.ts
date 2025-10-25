import { api } from '../../apiClient';

// Получение дат тренировок за последние 3 месяца
export default async function getHistoryDates(userId: string) {
	try {
		const data = await api().get(`/hystory/dates/${userId}`);
		// ← сюда можно добавить пост-обработку, если нужно
		return data;
	} catch (error) {
		console.error('Ошибка при загрузке дат тренировок: ', error);
		throw error; // пробрасываем, чтобы компонент/хук мог обработать
  }
}
