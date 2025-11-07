// Конвертация диапазона повторений в min и max значения
export function repRangeToMinMax(repRange: string): { min: number; max: number } {
  switch (repRange) {
    case 'до 8':
      return { min: 1, max: 8 };
    case '8-12':
      return { min: 8, max: 12 };
    case '12-15+':
      return { min: 12, max: 15 };
    default:
      // Если формат не распознан, пытаемся парсить
      const match = repRange.match(/(\d+)-(\d+)/);
      if (match) {
        return { min: parseInt(match[1]), max: parseInt(match[2]) };
      }
      return { min: 8, max: 12 }; // Значение по умолчанию
  }
}

// Конвертация min и max в строку диапазона
export function minMaxToRepRange(min: number, max: number): string {
  if (min <= 1 && max <= 8) {
    return 'до 8';
  } else if (min >= 8 && max <= 12) {
    return '8-12';
  } else if (min >= 12 && max >= 15) {
    return '12-15+';
  } else {
    return `${min}-${max}`;
  }
}

