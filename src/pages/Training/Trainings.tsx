import Panel from "../../components/ui/Panel.tsx"
import Activnost from "../../components/treing/activnost.tsx"

export default function TrainingsPage() {
    return (
        <div className="h-full flex-1 flex flex-col overflow-auto" id="trainings">
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-2">Тренировки</h1>
            </div>
            <Panel
                title="Активность за 3 месяца"
                onClick={() => {}}
                svgBlocks={[<Activnost />]}
            />
        </div>
    );
}