import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from "./pages/Home/Home.tsx";
import StatsPage from "./pages/Statistics/Statistics.tsx";
import TrainingsPage from "./pages/Training/Trainings.tsx";
import BottomNav from "./components/home/BottomNav.tsx";
import TestPage from "./pages/TestPage/TestPage.tsx";
import MyProgram from "./pages/MyProgram/MyProgram.tsx";
import TrainingView from './pages/MyProgram/TrainingView.tsx';
import { useUser } from './useUser';
import useUserInfo from "./api/requests/get/hooks/getUserInfoHook.ts";
import createUser from "./api/requests/post/postCreateUser.ts";

// ПЕРЕД КОМИТОВ В ГИТХАБ УСТАНОВИТЕ ЗАНЧЕНИЕ false
// Для работы на локальном сервере установите true
const testing = true;

const useGetHomeData = (_userId: string | undefined) => {
    // В реальном коде: useState, useEffect с fetch/axios и логика loading/error

    // Пример данных: Пользователь готов к тренировке (базовое состояние)
    const mockHomeData = {
        check_train_this_day: false,
        program_for_today: true,
        program_for_today_is_empty: false,
    };
    
    // Возвращаем данные. В реальном приложении здесь была бы логика загрузки и ошибок.
    return mockHomeData; 
}

function App() {

    const {user, error, loading} = useUser();

    const userId = user?.id.toString();
    const data = useUserInfo(userId || '1001');
    const homeData = useGetHomeData(userId);
    
     useEffect(() => {
        if (user && data && !data.was_registered) {
            (async () => {
                await createUser({ id_telegram: user.id, name_user: user.first_name || 'Гость' });
            })();
        }
    }, [data?.was_registered, user]);

    if (error && !testing) return <div className="p-4">⚠️ Ошибка: {error}</div>;
    if (loading && !testing) return <div className="p-4">Загрузка...</div>;

    return (
        <div className="min-h-screen pb-16 flex flex-col w-full bg-black text-white">
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage userName={user?.first_name?.toString() ?? 'Гость'} homeData={homeData} />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/trainings" element={<TrainingsPage />} />
                    <Route path="/testpage" element={<TestPage />} />
                    <Route path="/myprogram" element={<MyProgram />} />
                    <Route path="/trainingsession" element={<TrainingView/>} />
                    <Route path="*" element={<div className="p-4 h-screen w-screen flex justify-center items-center">Куда 4 это 0 ты 4 залез?</div>} />
                </Routes>
            </main>
            <BottomNav/>
        </div>
    );
}

export default App