import { useState } from "react";
import { useUser } from "../../useUser.ts";
import Panel from "../../components/ui/Panel.tsx";
import SocialButton from "../../components/ui/SocialButton.tsx";
import ProgramList from "../../components/myprogram/ProgramsList.tsx";


export default function MyProgram() {
    
    const { user } = useUser();
    const [error, setError] = useState<string | null>(null);


    return (
        <div className="h-full flex flex-col mx-4 text-gray-200" id="myprogram">
            <div className="text-center pt-12 pb-8">
                <h1 className="text-2xl font-bold">Моя программа</h1>
            </div>

            {error && (
                <div className="bg-red-900/50 text-red-200 rounded-lg p-3 mb-4 text-sm">
                    {error}
                </div>
            )}

            <div className='h-full grid grid-cols-1 gap-4'>
                <ProgramList onError={setError} userId={user?.id?.toString() || '1001'}/>
                <Panel
                    title="Ограничения и особенности"
                    button={
                        <SocialButton
                            title="Добавить"
                            color="bg-purple-700"
                            textColor="text-white"
                            onClick={() => {}}
                        />
                    }
                    onClick={() => {}}
                />
            </div>
        </div>
    );
}
