export interface Exercise {
  id_exercise: number;
  exercise_name: string;
  description: string;
  gif_url: string;
  id_muscle_group: number;
  not_recommended: boolean;
}

export interface ExercisesResponse {
  exercises: Exercise[];
}

export interface MuscleGroupExercises {
  groupId: number;
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
}

export interface UserInfo {
  was_registered: boolean;
  check_train_info: number;
  sub_user: boolean;
}

export interface UserInfoState {
  data: UserInfo | null;
  loading: boolean;
  error: string | null;
}

export interface CreateUserRequest {
  id_telegram: number;
  name_user: string;
}

export interface TrainingResult {
  exerciseId: number;
  sets: number;
}