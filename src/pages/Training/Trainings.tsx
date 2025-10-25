import Panel from "../../components/ui/Panel.tsx"
import Activities from "../../components/trainings/Activities.tsx"

export default function TrainingsPage() {
    return (
        <div className="h-full flex flex-col mx-4" id="trainings">
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-2">Тренировки</h1>
            </div>
            <Panel
                title="Активность за 3 месяца"
                onClick={() => {}}
                svgBlocks={[<Activities />]}
            />
        </div>
    );
}