export const MUSCLE_GROUPS = {
  muscle_1: 'Head',
  muscle_2: 'Arms',
  muscle_3: 'Legs',
  muscle_4: 'Chest',
  muscle_5: 'Deltas',
  muscle_6: 'Neck',
  muscle_7: 'Biceps',
  muscle_8: 'Triceps',
  muscle_9: 'Quadriceps',
  muscle_10: 'Trapezes',
  muscle_11: 'Abdominal',
  muscle_12: 'Gastrocnemius',
  muscle_13: 'Hip_wide',
  muscle_14: 'Hip_biceps',
  muscle_15: 'Oblique_abdominal',
  muscle_16: 'Widest',
  muscle_17: 'Round',
  muscle_18: 'Gluteal',

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
