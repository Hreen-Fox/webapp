/**
 * Panel — интерактивная плитка-кнопка для отображения информации.
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
import Slides from './Slides';
import type { SlideItem } from './Slides';


// Пропсы компонента
interface PanelProps {
    title: string;                  // Заголовок плитки (отображается сверху)
    button?: React.ReactNode;       // Кнопка отображается сверху)
    svgBlocks?: React.ReactNode[];  // Svg-компоненты
    extSlide?: SlideItem;           // Один статический слайд (используется, если данные не меняются)
    extSlides?: SlideItem[];        // Массив слайдов для автоматической прокрутки. Если задан — `slide` игнорируется
    height?: string;                 // Высота контента
    onClick: () => void;            // Обработчик клика по всей плитке
    color?: string;                 // Основной цвет кнопки
}

// Компонент
export default function Panel({
                                title,
                                button,
                                svgBlocks,
                                extSlide,
                                extSlides,
                                height = 'h-24',
                                onClick,
                                color
                            }: PanelProps) {
   
    // Рендер
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${color && (color)}
                relative overflow-hidden flex flex-col
                items-center p-4 bg-zinc-800 rounded-xl transition-colors duration-200
                active:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/30`}
            aria-label={title}
        >

            {/* Заголовок плитки */}
            <div className='w-full flex justify-between z-10'>
                <h3 className="flex justify-start text-left text-gray-300 text-sm font-medium">
                    {title}
                </h3>
                {button && <div className='flex justify-end'>{button}</div>}
            </div>
            

            {/* Контейнер для слайдов */}
            {extSlides && extSlides.length > 0 && (
            <div className={`w-full ${height}`}>
                <Slides
                    slide={extSlide}
                    slides={extSlides}
                    intervalMs={5000}

                />
            </div>
            )}


            {/* Контейнер для SVG*/}
            {svgBlocks && svgBlocks.length > 0 && (
                <div className='w-full h-full flex justify-center items-center'>
                    {svgBlocks.map((svg, index) => (
                        <div key={index} className='h-full p-6'>
                            {svg}
                        </div>
                    ))}
                </div>
            )}

            
        </button>
    );
}
