import TilesHome from "../modules/TilesHome";

export default function HomePage() {
  return (
    <div className="h-full flex flex-col" id="home">
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Сегодня по плану тренировка!</h1>
      </div>  
      <TilesHome/>
      <button
            type="button"
            className="mx-12 px-6 py-3 bg-white text-black font-medium transform -skew-x-12 rounded-md"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, white 0 20px, #e5e7eb 20px 40px)",
            }}
            >
            <span className="block skew-x-12">Начнём?</span>
        </button>
    </div>

  );
}