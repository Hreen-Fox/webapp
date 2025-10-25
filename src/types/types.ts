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