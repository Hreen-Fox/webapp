import './Home.css';
import {useNavigate} from 'react-router-dom';
import SectionList from "../../components/home/SectionList.tsx";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="h-full flex flex-col mx-12" id="home">
            <div className="text-center pt-12 pb-8">
                <h1 className="home-title text-2xl font-bold mb-2">Сегодня по плану тренировка, <span>начнем?</span>
                </h1>
            </div>
            <button
                type="button"
                onClick={() => navigate('/trainings')}
                className="px-6 py-3 start-btn text-white font-medium rounded-md mb-6"
            >
                Начать
            </button>
            <SectionList/>
        </div>
    );
}