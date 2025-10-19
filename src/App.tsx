import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Страницы
import HomePage from "./pages/Home/Home.tsx";
import StatsPage from "./pages/Statistics/Statistics.tsx";
import TrainingsPage from "./pages/Training/Trainings.tsx";

// Компоненты
import BottomNav from "./components/layout/BottomNav";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen pb-16 flex flex-col w-full bg-black text-white">
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/stats" element={<StatsPage/>}/>
                        <Route path="/trainings" element={<TrainingsPage/>}/>
                    </Routes>
                </main>
                <BottomNav/>
            </div>
        </BrowserRouter>
    );
}

export default App