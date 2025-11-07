// Russian muscle group names mapping
export const MUSCLE_GROUPS: Record<number, string> = {
  4: 'Грудь',      // Chest
  16: 'Спина',     // Widest (Back)
  3: 'Ноги',       // Legs
  5: 'Плечи',      // Deltas (Shoulders)
  7: 'Бицепс',     // Biceps
  8: 'Трицепс',    // Triceps
  11: 'Пресс',     // Abdominal (Abs)
  12: 'Икры',      // Gastrocnemius (Calves)
  18: 'Ягодицы',   // Gluteal (Glutes)
} as const;

// Days of the week in Russian
export const DAYS_OF_WEEK = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
] as const;

// Repetition ranges
export const REP_RANGES = [
  { label: 'до 8', value: 'до 8' },
  { label: '8-12', value: '8-12' },
  { label: '12-15+', value: '12-15+' },
] as const;

