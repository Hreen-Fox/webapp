/**
 * SectionButton — интерактивная плитка-кнопка для отображения статистики или информации.
 *
 * Особенности:
 * - Поддерживает один статический слайд или циклическую прокрутку нескольких слайдов
 * - Полностью адаптирована под Telegram Web App (TWA):
 *   • Нет hover-эффектов (не работают в TWA)
 *   • Есть active-состояние для обратной связи при нажатии
 *   • Оптимизирована под сенсорное управление (свайпы)
 * - Использует единый формат данных: {value: string; label: string}
 * - Все стили — через Tailwind (внешний CSS не требуется)
 */

import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';

// Один слайд: крупное значение + поясняющая подпись
type SlideItem = {
    value: string;
    label: string;
};

// Пропсы компонента
interface SectionButtonProps {
    title: string;             // Заголовок плитки (отображается сверху)
    slide?: SlideItem;         // Один статический слайд (используется, если данные не меняются)
    slides?: SlideItem[];      // Массив слайдов для автоматической прокрутки. Если задан — `slide` игнорируется
    intervalMs?: number;       // Интервал автопрокрутки в миллисекундах. Применяется только если слайдов > 1
    onClick: () => void;       // Обработчик клика по всей плитке
    bgIcon?: React.ReactNode;  // Иконка фона (обычно из lucide-react). Рекомендуется передавать с размером: className="w-[90%] h-[90%]"
    color?: string;            // Основной цвет кнопки
}

// Вспомогательные типы
type Direction = "left" | "right" | null;

// Компонент
export default function SectionButton({
                                          title,
                                          slide,
                                          slides: propSlides,
                                          intervalMs = 4000,
                                          onClick,
                                          bgIcon,
                                          color
                                      }: SectionButtonProps) {

    // Преобразуем входные данные в единый массив для упрощения логики
    const slides = useMemo(() => {
        return propSlides ?? (slide ? [slide] : []);
    }, [propSlides, slide]);
    const slidesCount = slides.length;

    // Состояния
    const [index, setIndex] = useState(0); // Текущий слайд
    const [animating, setAnimating] = useState(false); // Идёт ли анимация
    const [direction, setDirection] = useState<Direction>(null); // Направление свайпа
    const timer = useRef<ReturnType<typeof setInterval> | null>(null); // Таймер автопрокрутки

    // Рендер одного слайда: значение + подпись
    function renderSlide(item: SlideItem): JSX.Element {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center px-2">
                <div className="text-2xl font-bold leading-tight ">{item.value}</div>
                <div className="text-sm mt-1 text-gray-400 text-center">{item.label}</div>
            </div>
        );
    }

    // Запуск анимации перехода между слайдами
    const triggerSlide = useCallback((dir: Direction) => {
        // Защита от повторного запуска во время анимации или при <2 слайдах
        if (animating || slidesCount < 2) return;

        setDirection(dir);
        setAnimating(true);

        // Завершаем анимацию через 300 мс и обновляем индекс
        setTimeout(() => {
            setIndex(prev =>
                dir === 'right'
                    ? (prev + 1) % slidesCount
                    : (prev - 1 + slidesCount) % slidesCount
            );
            setAnimating(false);
            setDirection(null);
        }, 300);
    }, [animating, slidesCount]);

    // Автоматическая прокрутка слайдов (если их >1)
    useEffect(() => {
        if (slidesCount > 1) {
            timer.current = setInterval(() => {
                triggerSlide('right');
            }, intervalMs);

            // Очистка таймера при размонтировании или изменении зависимостей
            return () => {
                if (timer.current) {
                    clearInterval(timer.current);
                    timer.current = null;
                }
            };
        }
    }, [slidesCount, intervalMs, triggerSlide]);

    // Обработчики тач-событий
    const touchStartX = useRef<number | null>(null);

    // Начало свайпа
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        // Останавливаем автопрокрутку при начале свайпа
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
    }

    // Конец свайпа
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || slidesCount < 2) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        // Порог чувствительности: 40px
        if (Math.abs(dx) > 40) {
            triggerSlide(dx > 0 ? 'left' : 'right');
        }
        touchStartX.current = null;
    }

    // Подготовка данных для рендера
    const currentIndex = index;
    const nextIndex =
        direction === 'right'
            ? (index + 1) % slidesCount
            : direction === 'left'
                ? (index - 1 + slidesCount) % slidesCount
                : index;

    // Рендер
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${color && (color)}
                relative overflow-hidden flex flex-col aspect-square
                items-center p-6 bg-zinc-800 rounded-xl transition-colors duration-200
                active:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/30`}
            aria-label={title}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Фоновая иконка (если задана) */}
            {bgIcon && (
                <span className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                    {bgIcon}
                </span>
            )}

            {/* Заголовок плитки */}
            <h3 className="w-full text-left text-gray-300 text-base font-medium mb-2">
                {title}
            </h3>

            {/* Контейнер для слайдов */}
            <div className="flex-1 flex items-center justify-center w-full z-10 relative overflow-hidden">
                {slides.length > 0 ? (
                    <>
                        {/* Текущий слайд */}
                        <div
                            className={`absolute inset-0 transition-transform duration-300
                                ${animating && direction === 'right' ? '-translate-x-full' : ''}
                                ${animating && direction === 'left' ? 'translate-x-full' : ''}
                                ${!animating ? 'translate-x-0' : ''} z-10`}
                            style={{pointerEvents: animating ? 'none' : 'auto'}}
                        >
                            {renderSlide(slides[currentIndex])}
                        </div>

                        {/* Следующий слайд (для плавной анимации) */}
                        {animating && (
                            <div
                                className={`absolute inset-0 transition-transform duration-300
                                    ${direction === 'right' ? '-translate-x-full' : ''}
                                    ${direction === 'left' ? 'translate-x-full' : ''} z-20`}
                            >
                                {renderSlide(slides[nextIndex])}
                            </div>
                        )}
                    </>
                ) : null}
            </div>

            {/* Индикаторы прогресса (только при >1 слайда) */}
            {slidesCount > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                                i === index ? 'bg-white' : 'bg-gray-400 opacity-50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </button>
    );
}