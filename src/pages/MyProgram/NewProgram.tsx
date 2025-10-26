import ExerciseCategories from '../../components/myprogram/ExerciseSelectionList.tsx';
import {useNavigate} from 'react-router-dom';


interface NewProgramProps {
	userId: string;
}

export default function CreateNewProgram({ userId }: NewProgramProps) {
	const navigate = useNavigate();

	const handleSelection = (selectedIds: number[]) => {
		console.log('Выбраны упражнения:', selectedIds);
		// Можно сохранить, отправить и т.д.
	};

	return (
		<div className="h-full flex flex-col mx-4" id="newprogram">
			<div className="text-center pt-12 pb-8">
				<h1 className="home-title text-2xl font-bold">Новая программа</h1>
				<h2 className="mt-3 text-lg font-bold text-gray-400">Выбери упражнения для своей тренировки!</h2>
			</div>
			<ExerciseCategories userId={userId} onSelectionChange={handleSelection}/>
			<button className='bg-purple-700 border rounded-2xl text-white font-medium p-4 my-4' onClick={() => navigate('/myprogram')}>
				Сохранить программу
			</button>
		</div>
	);
};