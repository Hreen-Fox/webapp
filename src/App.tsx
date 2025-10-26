import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/Home/Home.tsx";
import StatsPage from "./pages/Statistics/Statistics.tsx";
import TrainingsPage from "./pages/Training/Trainings.tsx";
import BottomNav from "./components/home/BottomNav.tsx";
import TestPage from "./pages/TestPage/TestPage.tsx";
import MyProgram from "./pages/MyProgram/MyProgram.tsx";
import NewProgram from './pages/MyProgram/NewProgram.tsx';
import TrainingView from './pages/MyProgram/TrainingView.tsx';
import { useUser } from './useUser';

// ПЕРЕД КОМИТОВ В ГИТХАБ УСТАНОВИТЕ ЗАНЧЕНИЕ false
// Для работы на локальном сервере установите true
const testing = true;

function App() {
    const { user, error, loading } = useUser();

    if (error && !testing) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>⚠️ Ошибка</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (loading || !user && !testing) {
        return (
            <div style={{ padding: '20px' }}>
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16 flex flex-col w-full bg-black text-white">
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage userName={user?.first_name.toString()} />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/trainings" element={<TrainingsPage />} />
                    <Route path="/testpage" element={<TestPage />} />
                    <Route path="/myprogram" element={<MyProgram />} />
                    <Route path="/newprogram" element={<NewProgram userId={user?.id.toString() || '1001'} />} />
                    <Route path="/trainingsession" element={<TrainingView/>} />
                    <Route path="*" element={<div className="p-4">404 - Страница не найдена</div>} />
                </Routes>
            </main>
            <BottomNav/>
        </div>
    );
}

export default App