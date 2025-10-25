import ExerciseCategories from '../../components/myprogram/ExerciseSelectionList.tsx';


interface NewProgramProps {
	userId: string;
}

export default function CreateNewProgram({ userId }: NewProgramProps) {

	return (
		<div className="h-full flex flex-col mx-4" id="newprogram">
			<div className="text-center pt-12 pb-8">
				<h1 className="home-title text-2xl font-bold">Новая программа</h1>
				<h2 className="home-title text-lg font-bold">Выбери упражнения для своей тренировки!</h2>
			</div>
			<ExerciseCategories userId={userId} />
		</div>
	);
};