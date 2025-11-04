import './Home.css';
import {useNavigate} from 'react-router-dom';
import SectionList from "../../components/home/SectionList.tsx";

interface HomeProps {
    userName: string;
    homeData: {
        check_train_this_day: boolean;
        program_for_today: boolean;
        program_for_today_is_empty: boolean;
        // Add other properties here
    };
}

export default function HomePage({ userName = "Гость", homeData }: HomeProps) {
    const navigate = useNavigate();

    return (
        // Главный контейнер: растягивается по вертикали, добавляет внешний отступ (mx-4)
        <div className="h-full flex flex-col mx-4" id="home">
            
            {/* Контейнер для скролла: flex-grow занимает все доступное место и включает скролл */}
            <div className="flex-grow overflow-y-auto no-scrollbar pt-8">
                
                {/* Заголовок и кнопка в одном блоке (центровка текста) */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Привет, {userName}!
                    </h1>
                    {/* НОВЫЙ ТЕКСТ (Готовы к тренировке?) */}
                    <p className="text-2xl font-bold text-gray-400 mt-1 mb-6">
                        {homeData.check_train_this_day 
                        ? 'Отличная работа сегодня!' 
                        : !homeData.program_for_today
                            ? 'На сегодня тренировок нет'
                            : homeData.program_for_today_is_empty
                            ? 'Добавьте упражнения в тренировку'
                            : 'Готовы к тренировке?'
                        }
                    </p>
                    
                    {/* НОВАЯ КНОПКА (СТИЛИ ИЗ КОНЦЕПТА) */}
                    <button
                        type="button"
                        onClick={() => navigate('/trainings')}
                        disabled={homeData.check_train_this_day || !homeData.program_for_today || homeData.program_for_today_is_empty}
                        className="mb-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 text-lg rounded-xl transition-colors duration-200 disabled:bg-zinc-900 disabled:text-gray-500"
                    >
                        {/* Меняем <span>Начнём?</span> на просто Начать */}
                        Начать
                    </button>
                </div>
                
                {/* SectionList - должен быть внутри скроллящегося контейнера */}
                <div>
                     <SectionList/>
                </div>
            </div>
        </div>
    );
}