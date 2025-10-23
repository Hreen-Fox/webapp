import {useState, useEffect, useRef, useCallback, useMemo} from 'react';

// Один слайд: крупное значение + поясняющая подпись
export type SlideItem = {
    value?: string;
    label?: string;
    chart?: React.ReactNode;
};

// Пропсы компонента
interface SlidesContainerProps {
    slide?: SlideItem;         // Один статический слайд (используется, если данные не меняются)
    slides?: SlideItem[];      // Массив слайдов для автоматической прокрутки. Если задан — `slide` игнорируется
    intervalMs: number;       // Интервал автопрокрутки в миллисекундах. Применяется только если слайдов > 1
}

// Вспомогательные типы
type Direction = "left" | "right" | null;

export default function SlidesContainer({
                                        slide,
                                        slides: propSlides,
                                        intervalMs = 4000,
                                        }: SlidesContainerProps) {
                                            
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
    function renderSlide(item: SlideItem) {
        
        // Если есть chart — рендерим только его
        if (item.chart) {
            return (
            <div className="w-full h-full flex items-center justify-center p-2">
                {item.chart}
            </div>
            );
        }

        return (
            <div className="w-full h-full flex flex-col items-center justify-center px-2">
                <div className="text-xl font-bold leading-tight ">{item.value}</div>
                <div className="text-xs mt-1 text-gray-400 text-center">{item.label}</div>
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

    // Подготовка данных для рендера
    const currentIndex = index;
    const nextIndex =
        direction === 'right'
            ? (index + 1) % slidesCount
            : direction === 'left'
                ? (index - 1 + slidesCount) % slidesCount
                : index;

    return (
        <div className="flex items-center justify-center w-full h-full z-0 relative overflow-hidden">
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
        
    )
}