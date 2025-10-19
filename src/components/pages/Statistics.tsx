import TilesHome from "../modules/TilesHome";

export default function StatsPage() {
  return (
    <div className="h-full flex-1 flex flex-col" id="home">
      <main className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Аналитика</h1>
      </main>
      <TilesHome/>
    </div>

  );
}
