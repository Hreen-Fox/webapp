import {api} from '../../apiClient';

// Получение списка упражнений
export default async function getExercises(muscleGroupId: string, userId: string) {
    try {
        return await api().get(`/myprograms/exercisesforselection/${muscleGroupId}/${userId}`);
	} catch (error) {
		console.error('Ошибка при загрузке дат тренировок: ', error);
		throw error; // пробрасываем, чтобы компонент/хук мог обработать
  }
}
