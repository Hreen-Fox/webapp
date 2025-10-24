/**
 * SectionList — контейнер для отображения набора интерактивных плиток (SectionButton).
 *
 * Особенности:
 * - Содержит фиксированный набор секций: рекорды, теория, прошлая тренировка, программа
 * - Управляет состоянием модального окна "Теория" (StoriesModal)
 * - Передаёт данные в унифицированном формате { value, label }
 * - Подготовлен к будущей стилизации через цветовую тему (см. Потом)
 *
 * Примечание:
 * - Все плитки используют компонент SectionButton
 * - Модальное окно отображается только для секции "Теория"
 */

import {ChartLine, BookOpen, Clock8, ClipboardClock} from 'lucide-react';
import { useState } from "react";
// UI-компоненты
import StoriesModal from "./StoriesModal.tsx";
import SectionButton from "./SectionButton.tsx";
// Данные для модального окна "Теория"
import { theoryStories } from "../../data/storiesHomeData.tsx";
import { useNavigate } from 'react-router-dom';

// Основной компонент
export default function SectionList() {
    // Состояние: открыто ли модальное окно "Теория"
    const [storiesOpen, setStoriesOpen] = useState(false);
    const navigate = useNavigate();

    // Рендер компонента
    return (
        <div className="w-full max-w-4xl mx-auto h-full flex-1">
            {/* Сетка плиток: 2 колонки на мобильных, 3 — на планшетах и выше */}
            <div className="section-list grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-fr h-full">
                {/* Плитка: Рекорды */}
                <SectionButton
                    title="Рекорды"
                    slides={[
                        {value: '6,125кг 🏋️‍♀️', label: 'Общий вес'},
                        {value: '24 🔥', label: 'Всего тренировок'},
                        {value: '124кг 💪', label: 'Макс. вес в жиме'},
                        {value: '1ч 7мин ⏳', label: 'Длительность'}
                    ]}
                    onClick={() => {
                       navigate('/stats')
                    }}
                    bgIcon={<ChartLine className="w-[90%] h-[90%]" strokeWidth={1}/>}
                    intervalMs={7000}
                    color="text-white"
                />
                {/* Плитка: Теория */}
                <SectionButton
                    title="Теория"
                    slide={{value: 'Философия', label: 'и ответы'}}
                    // Открывает модальное окно историй
                    onClick={() => setStoriesOpen(true)}
                    bgIcon={<BookOpen className="w-[90%] h-[90%]" strokeWidth={1}/>}
                    color="text-amber-400"
                />
                {/* Плитка: Прошлая тренировка */}
                <SectionButton
                    title="Прошлая тренировка"
                    slides={[
                        {value: '105г х6 🏆', label: 'Приседание со штангой'},
                        {value: '80кг х12 📈', label: 'Жим лёжа'}
                    ]}
                    onClick={() => {
                        // Потом: открыть детали последней тренировки
                    }}
                    bgIcon={<Clock8 className="w-[90%] h-[90%]" strokeWidth={1}/>}
                    intervalMs={7000}
                    color="text-red-400"
                />
                {/* Плитка: Моя программа */}
                <SectionButton
                    title="Моя программа"
                    slide={{value: 'Full Body', label: '3 дня/нед'}}
                    onClick={() => {
                        // Потом: перейти к программе тренировок
                    }}
                    bgIcon={<ClipboardClock className="w-[90%] h-[90%]" strokeWidth={1}/>}
                    color="text-green-400"
                />
                {/* Плитка: Тестовая страница */}
                <SectionButton
                    title="Моя программа"
                    slide={{value: 'Тест', label: 'данные tg api'}}
                    onClick={() => {navigate('/testpage')}}
                    bgIcon={<ClipboardClock className="w-[90%] h-[90%]" strokeWidth={1}/>}
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