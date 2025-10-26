import './Home.css';
import {useNavigate} from 'react-router-dom';
import SectionList from "../../components/home/SectionList.tsx";

interface NewProgramProps {
    userName: string;
}

export default function HomePage({ userName }: NewProgramProps) {
    const navigate = useNavigate();

    return (
        <div className="h-full flex flex-col mx-4" id="home">
            <div className="text-center pt-12 pb-8">
                <h1 className="home-title text-2xl font-bold">{userName}Сегодня по плану тренировка!</h1>
            </div>
            <button
                type="button"
                onClick={() => navigate('/trainings')}
                className="mt-3 mb-5 px-6 py-3 bg-white text-black font-medium transform rounded-md"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(135deg, white 0 20px, #e5e7eb 20px 40px)",
                }}
            >
            <span>Начнём?</span>
            </button>
            <SectionList/>
        </div>
    );
}