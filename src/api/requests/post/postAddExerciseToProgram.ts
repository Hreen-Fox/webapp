import { api } from '../../apiClient';

interface AddExerciseRequest {
  id_programs_workout: number;
  id_workout_exercises: number;
  max_target_iteration_ex_pool: number;
  min_target_iteration_ex_pool: number;
  approaches_target_ex_pool: number;
  weight_ex_pool: number;
}

// Добавление упражнения в программу
export default async function addExerciseToProgram(exerciseData: AddExerciseRequest) {
  try {
    const data = await api().post('/myprograms/addexercisetoworkout', exerciseData);
    return data;
  } catch (error) {
    console.error('Ошибка при добавлении упражнения:', error);
    throw error;
  }
}

