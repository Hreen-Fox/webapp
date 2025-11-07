import { api } from '../../apiClient';

interface CreateProgramRequest {
  id_user: number;
  name_programs_workout: string;
  week_day_programs_workout: string;
}

// Создание новой программы
export default async function createProgram(programData: CreateProgramRequest) {
  try {
    console.log('API: Отправка POST запроса на /myprograms/programs/');
    console.log('API: Данные запроса:', programData);
    const data = await api().post('/myprograms/programs/', programData);
    console.log('API: Ответ от сервера:', data);
    return data;
  } catch (error) {
    console.error('API: Ошибка при создании программы:', error);
    throw error;
  }
}

