export interface ChartDataPoint {
  date: string;      // '05.06'
  weight: number;    // 120
  reps?: number;     // 8, 10... (если нужно)
  isRecord?: boolean; // true — если это рекорд
}