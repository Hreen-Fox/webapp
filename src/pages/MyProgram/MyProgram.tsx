import Panel from "../../components/ui/Panel.tsx";
import SocialButton from "../../components/ui/SocialButton.tsx";

export default function MyProgram() {
  return (
      <div className="h-full flex flex-col mx-4" id="myprogram">
          <div className="text-center pt-12 pb-8">
              <h1 className="home-title text-2xl font-bold">Моя программа</h1>
          </div>
          <Panel title="Программа тренировок"
                 onClick={() => {}}
                 button={<SocialButton
                         title="Добавить +"
                         color="bg-purple-700"
                         textColor='text-white'
                         onClick={() => {}}
                 />}
          />
      </div>
  );
};