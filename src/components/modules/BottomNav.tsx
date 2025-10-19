import { Home, ChartNoAxesColumnIncreasing, Dumbbell } from "lucide-react";


interface BottomNavProps {
  active: "home" | "stats" | "trainings";
  onChange: (id: "home" | "stats" | "trainings") => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {

  const navItems = [
    { id: "home", label: "Главная", icon: <Home className="w-6 h-6" /> },
    { id: "stats", label: "Статистика", icon: <ChartNoAxesColumnIncreasing className="w-6 h-6" /> },
    { id: "trainings", label: "Тренировки", icon: <Dumbbell className="w-6 h-6" /> },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black shadow-md">
      <ul className="flex justify-around py-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onChange(item.id as "home" | "stats" | "trainings")}
              className={`flex flex-col items-center text-xs transition-colors ${
                active === item.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
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
