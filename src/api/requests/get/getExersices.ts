import {api} from '../../apiClient';

// Получение списка упражнений
export default async function getExercises(muscleGroupId: string, userId: string) {
    try {
        const data = await api().get(`/myprograms/exercisesforselection/${muscleGroupId}/${userId}`);
		return data;
	} catch (error) {
		console.error('Ошибка при загрузке дат тренировок: ', error);
		throw error; // пробрасываем, чтобы компонент/хук мог обработать
  }
}
