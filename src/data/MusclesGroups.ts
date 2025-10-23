export const MUSCLE_GROUPS = {
  Head: 'Head',
  Arms: 'Arms',
  Legs: 'Legs',
  Chest: 'Chest',
  Deltas: 'Deltas',
  Neck: 'Neck',
  Biceps: 'Biceps',
  Triceps: 'Triceps',
  Quadriceps: 'Quadriceps',
  Trapezes: 'Trapezes',
  Abdominal: 'Abdominal',
  Gastrocnemius: 'Gastrocnemius',
  Hip_wide: 'Hip_wide',
  Hip_biceps: 'Hip_biceps',
  Oblique_abdominal: 'Oblique_abdominal',
  Widest: 'Widest',
  Round: 'Round',
  Gluteal: 'Gluteal',

} as const;

export type MuscleGroup = typeof MUSCLE_GROUPS[keyof typeof MUSCLE_GROUPS];

export const INITIAL_MUSCLE_COLORS: Record<MuscleGroup, string> = {
  Head: '#d1d5db',
  Arms: '#d1d5db',
  Legs: '#d1d5db',
  Chest: '#d1d5db',
  Deltas: '#d1d5db',
  Neck: '#d1d5db',
  Biceps: '#d1d5db',
  Triceps: '#d1d5db',
  Quadriceps: '#d1d5db',
  Trapezes: '#d1d5db',
  Abdominal: '#d1d5db',
  Gastrocnemius: '#d1d5db',
  Hip_wide: '#d1d5db',
  Hip_biceps: '#d1d5db',
  Oblique_abdominal: '#d1d5db',
  Widest: '#d1d5db',
  Round: '#d1d5db',
  Gluteal: '#d1d5db',
};
