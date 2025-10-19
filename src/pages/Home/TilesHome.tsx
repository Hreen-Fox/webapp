import {ChartLine, BookOpen, Clock8, ClipboardClock} from 'lucide-react';
import {useState} from "react";

// Компоненты
import StoriesModal from "../../components/ui/StoriesModal.tsx";
import TileButton from "../../components/ui/TileButton.tsx";

// Данные
import {theoryStories} from "../../data/storiesHomeData.tsx";

export default function TilesHome() {
    const [storiesOpen, setStoriesOpen] = useState(false);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 h-full flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-fr h-full">
                <TileButton
                    title="Статистика"
                    slides={['Ты красава', 'Реально', 'Лучший']}
                    onClick={() => {
                    }}
                    bgIcon={<ChartLine className="w-32 h-32" strokeWidth={1}/>}
                    intervalMs={7000}
                />
                <TileButton
                    title="Статистика"
                    slides={['Ты красава', 'Реально', 'Лучший']}
                    onClick={() => {
                    }}
                    bgIcon={<ChartLine className="w-32 h-32" strokeWidth={1}/>}
                    intervalMs={7000}
                />
                <TileButton
                    title="Теория"
                    description="Какая-то хуйня тут написана"
                    onClick={() => setStoriesOpen(true)}
                    bgIcon={<BookOpen className="w-32 h-32" strokeWidth={1}/>}
                />
                <TileButton
                    title="Прошлая тренировка"
                    slides={['Молочка попил', 'Гречки втопил', 'Штангу протёр']}
                    onClick={() => console.log('Прошлая тренировка')}
                    bgIcon={<Clock8 className="w-32 h-32" strokeWidth={1}/>}
                    intervalMs={7000}
                />
                <TileButton
                    title="Мои тренировки"
                    description="Тренболон"
                    onClick={() => console.log('Мои тренировки')}
                    bgIcon={<ClipboardClock className="w-32 h-32" strokeWidth={1}/>}
                />
            </div>
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