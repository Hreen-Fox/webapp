import { useState } from "react";
import './App.css'
import BottomNav from "./components/modules/BottomNav";
import HomePage from "./components/pages/Home";
import StatsPage from "./components/pages/Statistics";
import TrainingsPage from "./components/pages/Trainings";


function App() {
  const [page, setPage] = useState<"home" | "stats" | "trainings">("home");

  return (
    <div className="min-h-screen pb-16 flex flex-col w-full bg-black text-white">
      <main className="flex-1 w-full h-full">
        {page === "home" && <HomePage />}
        {page === "stats" && <StatsPage />}
        {page === "trainings" && <TrainingsPage />}
      </main>

      <BottomNav active={page} onChange={setPage} />
    </div>
  )
}


export default App
