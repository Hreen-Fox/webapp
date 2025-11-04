/**
 * SectionList — контейнер для отображения набора интерактивных плиток (StatCard).
 * Переделан под новый дизайн.
 *
 * Примечание:
 * - Все плитки используют компонент StatCard
 * - Модальное окно "Теория" (StoriesModal) открывается через состояние
 */

import { ChartLine, BookOpen, Clock8, ClipboardClock } from 'lucide-react'; 
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import StatCard from "./StatCard.tsx";
import StoriesModal from "./StoriesModal.tsx"; 
import { theoryStories } from "../../data/storiesHomeData.tsx"; 


// --- Компонент-обертка для циклического отображения слайдов ---
interface CyclingContentProps {
    slides: { value: string; label: string }[];
    color: string;
    intervalMs?: number;
}

const CyclingContent: React.FC<CyclingContentProps> = ({ slides, color, intervalMs = 4000 }) => {
    const [index, setIndex] = useState(0);
    // ИСПОЛЬЗУЕМ isTransitioning ДЛЯ УПРАВЛЕНИЯ КЛАССАМИ
    const [isTransitioning, setIsTransitioning] = useState(false); 
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const slidesCount = slides.length;

    // Длительность перехода (в миллисекундах), должна совпадать с duration-300
    const ANIMATION_DURATION = 300; 

    const triggerSlide = useCallback(() => {
        if (slidesCount < 2) return;

        // 1. Начало фазы исчезновения/сдвига
        setIsTransitioning(true); 

        // 2. Ждем, пока пройдет анимация исчезновения (300мс)
        setTimeout(() => {
            // 3. Меняем данные (индекс)
            setIndex(prev => (prev + 1) % slidesCount);
            
            // 4. Сразу же начинаем фазу появления (isTransitioning = false)
            setIsTransitioning(false); 
        }, ANIMATION_DURATION); 
        
    }, [slidesCount]);

    useEffect(() => {
        if (slidesCount > 1) {
            timer.current = setInterval(() => {
                triggerSlide();
            }, intervalMs);

            return () => {
                if (timer.current) {
                    clearInterval(timer.current);
                    timer.current = null;
                }
            };
        }
    }, [slidesCount, intervalMs, triggerSlide]);

    const currentSlide = slides[index];

    if (!currentSlide) {
        return (
            <div className="text-center">
                <p className="text-lg font-bold text-white">Нет данных</p>
                <p className="text-xs text-gray-400 mt-1">Завершите тренировку</p>
            </div>
        );
    }
    
    // Элемент прокрутки
    // УПРАВЛЯЕМ АНИМАЦИЕЙ ЧЕРЕЗ КЛАССЫ OPACITY И TRANSLATE-Y
    return (
        // Используем key для принудительного повторного рендеринга при смене слайда (более надежный способ)
        // Но чтобы избежать пересоздания DOM, key убран.
        // Заменим на div с абсолютным позиционированием (если нужно избежать скачка)
        <div className="w-full h-full flex flex-col items-center justify-center relative">
            
            <div 
                // Классы для плавного перехода, opacity и сдвига по вертикали
                className={`
                    w-full h-full flex flex-col items-center justify-center transition-all duration-300 
                    ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
                `}
            >
                <p 
                    className={`text-2xl font-bold ${color} leading-tight truncate px-1`}
                    title={currentSlide.value}
                >
                    {currentSlide.value}
                </p>
                <p 
                    className="text-sm text-gray-400 mt-1 truncate px-1"
                    title={currentSlide.label}
                >
                    {currentSlide.label}
                </p>
            </div>
        </div>
    );
};


// --- Основной компонент SectionList ---
export default function SectionList() {
    const [storiesOpen, setStoriesOpen] = useState(false);
    const navigate = useNavigate();
    
    // Данные секций - МАКСИМАЛЬНО СОХРАНЯЕМ СТРУКТУРУ ИЗ ВАШЕГО СТАРОГО SectionList.tsx
    // Общий вес/Длительность/Жим/Приседание (изменены для StatCard)
    const recordsSlides = [
        { value: '6,125кг 🏋️‍♀️', label: 'Общий вес' },
        { value: '24 🔥', label: 'Всего тренировок' },
        { value: '124кг 💪', label: 'Макс. вес в жиме' },
        { value: '1ч 7мин ⏳', label: 'Длительность' }
    ];

    // Приседание/Жим (изменены для StatCard)
    const highlightSlides = [
        { value: '105г х6 🏆', label: 'Приседание со штангой' },
        { value: '80кг х12 📈', label: 'Жим лёжа' }
    ];

    // Рендер компонента
    return (
        <div className="w-full max-w-4xl mx-auto flex-1 pb-4">
            {/* Сетка плиток: 2 колонки */}
            <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                {/* Плитка: Рекорды */}
                <StatCard
                    title="Рекорды"
                    value={
                        <CyclingContent 
                            slides={recordsSlides}
                            color="text-white"
                        />
                    }
                    onClick={() => navigate('/stats')}
                    icon={<ChartLine strokeWidth={1}/>}
                />
                
                {/* Плитка: Теория */}
                <StatCard
                    title="Теория"
                    value="Философия"
                    subtitle="и ответы"
                    onClick={() => setStoriesOpen(true)}
                    icon={<BookOpen strokeWidth={1}/>}
                    color="text-amber-400"
                />
                
                {/* Плитка: Прошлая тренировка */}
                <StatCard
                    title="Прошлая тренировка"
                    value={
                        <CyclingContent 
                            slides={highlightSlides}
                            color="text-red-400"
                        />
                    }
                    onClick={() => {
                        // Потом: открыть детали последней тренировки
                    }}
                    icon={<Clock8 strokeWidth={1}/>}
                />
                
                {/* Плитка: Моя программа */}
                <StatCard
                    title="Моя программа"
                    value="Full Body"
                    subtitle="3 дня/нед"
                    onClick={() => navigate('/myprogram')}
                    icon={<ClipboardClock strokeWidth={1}/>}
                    color="text-green-400"
                />
                
                {/* Плитка: Тест тг апи (оставляем как было) */}
                <StatCard
                    title="Тест тг апи"
                    value="Тест"
                    subtitle="данные tg api"
                    onClick={() => navigate('/testpage')}
                    icon={<ClipboardClock strokeWidth={1}/>}
                    color="text-green-400"
                />
            </div>

            {/* Модальное окно: Теория (сторис) */}
            {storiesOpen && (
                <StoriesModal
                    items={theoryStories}
                    durationMs={4000}
                    onClose={() => setStoriesOpen(false)}
                />
            )}
        </div>
    );
}