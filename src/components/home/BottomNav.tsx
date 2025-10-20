import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ChartNoAxesColumnIncreasing, Dumbbell } from 'lucide-react';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    // Маппинг путей к иконкам и меткам
    const navItems = [
        { id: 'Home', path: '/', label: 'Главная', icon: <Home className="w-6 h-6" /> },
        { id: 'stats', path: '/stats', label: 'Статистика', icon: <ChartNoAxesColumnIncreasing className="w-6 h-6" /> },
        { id: 'trainings', path: '/trainings', label: 'Тренировки', icon: <Dumbbell className="w-6 h-6" /> },
    ] as const;

    // Определяем, какая страница активна
    const getActiveId = () => {
        if (location.pathname === '/') return 'Home';
        if (location.pathname === '/stats') return 'stats';
        if (location.pathname === '/trainings') return 'trainings';
        return null;
    };

    const activeId = getActiveId();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-black shadow-md">
            <ul className="flex justify-around py-2">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center text-xs transition-colors ${
                                activeId === item.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            <span className="mb-1">{item.icon}</span>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}