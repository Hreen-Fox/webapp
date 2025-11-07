// Упражнение
export interface Exercise {
  id_exercise: number;
  exercise_name: string;
  description: string;
  gif_url: string;
  id_muscle_group: number;
  not_recommended: boolean;
}

// Массив упражнений
export interface ExercisesResponse {
  exercises: Exercise[];
}

// Группы мышц
export interface MuscleGroupExercises {
  groupId: number;
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
}

// Инфо клиента апи
export interface UserInfo {
  was_registered: boolean;
  check_train_info: number;
  sub_user: boolean;
}

export interface CreateUserRequest {
  id_telegram: number;
  name_user: string;
}


// Упражнение активной тренировки
export interface TrainingExercise {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

// Результат тренировки
export interface TrainingResult {
  exerciseId: number;
  sets: number;
}

// Программа тренировки
export interface ProgramExercise {
  id_workout_ex: number;
  name_workout_ex: string;
  max_target_iteration_ex_pool: number;
  min_target_iteration_ex_pool: number;
  approaches_target_ex_pool: number;
  weight_ex_pool: number;
  id_muscle_category: number;
  name_muscle_category: string;
  id_ex_pool?: number; // ID записи в пуле упражнений для удаления (опционально, если API еще не обновлен)
}

export interface Program {
  id_program: number;
  name_program: string;
  day: string;
  workout_ex_in_program: ProgramExercise[];
}

export interface ProgramsResponse {
  program_train: Program[];
}

// Ответ API со статусом
export interface StatusResponse {
  status: boolean;
  message: string;
  data?: any;
}