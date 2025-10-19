import { ChartLine, BookOpen, Clock8, ClipboardClock } from "lucide-react";
import { useState } from "react";
import StoriesModal from "../custom/StoriesModal";
import TileButton from "../custom/TileButton";
import { getTheoryStories } from "../data/storiesHomeData";
import type { ReactNode } from "react";

export default function TilesHome() { 

    const [storiesOpen, setStoriesOpen] = useState(false);
    const [storiesItems, setStoriesItems] = useState<ReactNode[]>([]);

    function openTheoryStories() {
        setStoriesItems(getTheoryStories());
        setStoriesOpen(true);
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 h-full flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-fr h-full">
                <TileButton
                    title="Статистика"
                    slides={[
                        <div className="text-gray-400">Ты красава</div>,
                        <div className="text-gray-400">Реально</div>,
                        <div className="text-gray-400">Лучший</div>,
                    ]}
                    onClick={() => {}}
                    bgIcon={<ChartLine className="w-32 h-32" strokeWidth={1}/>}
                    intervalMs={7000}
                />
                <TileButton
                    title="Теория"
                    description="Какая-то хуйня тут написана"
                    onClick={openTheoryStories}
                    bgIcon={<BookOpen className="w-32 h-32" strokeWidth={1}/>}
                />
                <TileButton
                    title="Прошлая тренировка"
                    slides={[
                        <div className="text-gray-400">Молочка попил</div>,
                        <div className="text-gray-400">Гречки втопил</div>,
                        <div className="text-gray-400">Штангу протёр</div>,
                    ]}
                    onClick={() => console.log('Прошлая тренировка')}
                    bgIcon={<Clock8 className="w-32 h-32" strokeWidth={1} />}
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
                items={storiesItems}
                durationMs={4000}
                onClose={() => setStoriesOpen(false)}
                />
            )}
        </div>
    );
}