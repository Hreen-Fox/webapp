import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/Home/Home.tsx";
import StatsPage from "./pages/Statistics/Statistics.tsx";
import TrainingsPage from "./pages/Training/Trainings.tsx";
import BottomNav from "./components/home/BottomNav.tsx";
import TestPage from "./pages/TestPage/TestPage.tsx";
import MyProgram from "./pages/MyProgram/MyProgram.tsx";
import NewProgram from './pages/MyProgram/NewProgram.tsx';
import { useUser } from './useUser';

function App() {
    const { user, error, loading } = useUser();

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
                <h2>⚠️ Ошибка</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (loading || !user) {
        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16 flex flex-col w-full bg-black text-white">
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/trainings" element={<TrainingsPage />} />
                    <Route path="/testpage" element={<TestPage />} />
                    <Route path="/myprogram" element={<MyProgram />} />
                    <Route path="/newprogram" element={<NewProgram userId={user.id.toString()} />} />
                </Routes>
            </main>
            <BottomNav/>
        </div>
    );
}

export default App