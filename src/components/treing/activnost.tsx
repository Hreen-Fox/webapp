import React from 'react';

// Возвращает количество дней в указанном месяце с учётом високосного года.
const getDaysInMonth = (year: number, monthIndex: number): number => {
    return new Date(year, monthIndex + 1, 0).getDate();
};

// Преобразует дату из формата "dd.mm.yy" (как приходит с сервера)
const parseShortDate = (shortDate: string): string | null => {
    const match = shortDate.match(/^(\d{2})\.(\d{2})\.(\d{2})$/);
    if (!match) return null;
    const [, day, month, year] = match;
    const fullYear = parseInt(year, 10) + 2000; // "25" → 2025
    return `${fullYear}-${month}-${day}`;
};

// Форматирует дату в виде года, месяца и дня в строку "YYYY-MM-DD".
const formatDateKey = (year: number, monthIndex: number, day: number): string => {
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Типы пропсов для компонента одного месяца
interface MonthBlockProps {
    year: number;           // Год (например, 2025)
    monthIndex: number;     // Индекс месяца (0–11)
    monthName: string;      // Название месяца на русском (например, "октябрь")
    activeDateSet: Set<string>; // Множество активных дат в формате "YYYY-MM-DD"
}

// Компонент отображения одного месяца
const MonthBlock: React.FC<MonthBlockProps> = ({ year, monthIndex, monthName, activeDateSet }) => {
    const daysCount = getDaysInMonth(year, monthIndex);
    // Создаём массив дней: [1, 2, 3, ..., N]
    const days = Array.from({ length: daysCount }, (_, i) => i + 1);

    return (
        <div style={{
            padding: '5px',
            margin: '8px',
            flex: 1,
            minWidth: 0
        }}>
            {/* Название месяца с заглавной буквы */}
            <h3 style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
                {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
            </h3>
            {/* Контейнер для квадратиков: в строку с переносом */}
            <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                }}
            >
                {days.map((day) => {
                    // Формируем ключ вида "2025-10-19"
                    const dateKey = formatDateKey(year, monthIndex, day);
                    // Проверяем, есть ли эта дата среди активных
                    const isActive = activeDateSet.has(dateKey);

                    return (
                        // Визуальный "чекбокс" без галочки — просто квадратик
                        <div
                            key={dateKey}
                            style={{
                                width: '13px',
                                height: '13px',
                                backgroundColor: isActive ? '#9c27b0' : '#a7a7a7', // фиолетовый / серый
                                borderRadius: '2px',
                                border: '1px solid #ccc',
                            }}
                        />
                    )
                })}
            </div>
        </div>
    );
};

// Основной компонент: отображает три последних месяца (текущий и два предыдущих).
export default function Activnost() {
    // === ИМИТАЦИЯ ОТВЕТА СЕРВЕРА ===
    // В реальном приложении эти данные будут приходить через API
    const serverResponse = {
        dates: [
            "19.10.25",
            "12.10.25",
            "06.10.25",
            "14.09.25",
            "30.08.25",
            "15.08.25",
            "27.07.25"
        ]
    };

    // Преобразуем список дат в Set для быстрой проверки наличия
    const activeDateSet = new Set<string>();
    for (const shortDate of serverResponse.dates) {
        const isoDate = parseShortDate(shortDate);
        if (isoDate) {
            activeDateSet.add(isoDate);
        }
    }

    // Текущая дата (для определения "сейчас")
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth(); // 0 = январь, 9 = октябрь

    // === Формируем три последних месяца: текущий, предыдущий, предпредыдущий ===
    // Смещения: 0 (сейчас), -1 (месяц назад), -2 (два месяца назад)
    const months = [0, -1, -2].map((offset) => {
        let totalMonth = currentMonthIndex + offset;
        let year = currentYear;

        // Если ушли в отрицательные месяцы — корректируем год и месяц
        if (totalMonth < 0) {
            year -= 1;           // переходим в прошлый год
            totalMonth += 12;    // например: -1 → 11 (декабрь)
        }

        const monthIndex = totalMonth; // теперь точно 0–11
        // Получаем название месяца на русском языке
        const name = new Date(year, monthIndex, 1).toLocaleString('ru-RU', { month: 'long' });
        return { year, monthIndex, name };
    }).reverse(); // чтобы порядок был слева направо: [август, сентябрь, октябрь]

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1px', margin: '-1.3rem' }}>
            {months.map((month) => (
                <MonthBlock
                    key={`${month.year}-${month.monthIndex}`} // уникальный ключ
                    year={month.year}
                    monthIndex={month.monthIndex}
                    monthName={month.name.charAt(0).toUpperCase() + month.name.slice(1)}
                    activeDateSet={activeDateSet}
                />
            ))}
        </div>
    );
};