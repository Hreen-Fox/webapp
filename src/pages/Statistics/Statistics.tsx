import PanelList from "../../components/stats/PanelList";


export default function StatsPage() {

    return (
        <div className="h-full flex flex-col mx-4" id="stats">
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-2">Статистика</h1>
            </div>

            <PanelList/>
            {/* <StatsChart /> */}
        </div>
    );
}