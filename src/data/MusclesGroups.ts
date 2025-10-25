export const MUSCLE_GROUPS: Record<number, string> = {
  1: 'Head',
  2: 'Arms',
  3: 'Legs',
  4: 'Chest',
  5: 'Deltas',
  6: 'Neck',
  7: 'Biceps',
  8: 'Triceps',
  9: 'Quadriceps',
  10: 'Trapezes',
  11: 'Abdominal',
  12: 'Gastrocnemius',
  13: 'Hip_wide',
  14: 'Hip_biceps',
  15: 'Oblique_abdominal',
  16: 'Widest',
  17: 'Round',
  18: 'Gluteal',

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
