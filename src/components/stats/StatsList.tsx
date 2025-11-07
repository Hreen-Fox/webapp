import { useState } from 'react';
import { MUSCLE_GROUPS, INITIAL_MUSCLE_COLORS } from '../../data/MusclesGroups';
import type { MuscleGroup } from '../../data/MusclesGroups';
import MuscleFrontSVG from '../../data/MusclesFront';
import MuscleBackSVG from '../../data/MusclesBack';
import Panel from '../ui/Panel';
import SocialButton from '../ui/SocialButton';
import Chart from '../ui/Chart';
import { Share } from 'lucide-react';
import type { ChartDataPoint } from '../../data/ChartDataPoint';


export default function StatsList() {

    const [colors, setColors] = useState<Record<MuscleGroup, string>>(INITIAL_MUSCLE_COLORS);

    const changeColor = (group: MuscleGroup, color: string) => {
        setColors(prev => ({ ...prev, [group]: color }));
    };

    const weightData: ChartDataPoint[] = [
    { date: '05.06', weight: 120 },
    { date: '12.06', weight: 125 },
    { date: '19.06', weight: 128 },
    { date: '26.06', weight: 130, isRecord: true },
    { date: '03.07', weight: 130 },
    ];

    const repsData: ChartDataPoint[] = [
    { date: '05.06', weight: 100, reps: 8 },
    { date: '12.06', weight: 80, reps: 10 },
    { date: '19.06', weight: 30, reps: 12 },
    { date: '26.06', weight: 160, reps: 14, isRecord: true },
    { date: '03.07', weight: 40, reps: 14 },
    ];

    return (
        <div className='h-full grid grid-cols-1 gap-4'>
            <Panel
                title='Личные рекорды'
                button={
                    <SocialButton
                        title="Поделиться"
                        color="bg-purple-700"
                        textColor='text-white'
                        icon={Share}
                        onClick={() => console.log('Поделились!')}
                    />
                }
                onClick={() => {}}
                extSlides={[
                        {value: '6,155кг 🏋️‍♀️', label: 'Общий вес'},
                        {value: '24 🔥', label: 'Всего тренировок'},
                        {value: '124кг 💪', label: 'Макс. вес в жиме'},
                        {value: '1ч 7мин ⏳', label: 'Длительность'}
                ]}
            />

            <Panel
                title='Мышцы за неделю'
                onClick={() => {}}
                svgBlocks={[
                            <MuscleFrontSVG key="front" colors={colors} />,
                            <MuscleBackSVG key="back" colors={colors} />
                        ]}
            />
            <Panel
                title="Прогресс за месяц"
                onClick={() => {}}
                extSlides={[
                    { chart: <Chart data={weightData} title='Жим жесткий'/> },
                    { chart: <Chart data={repsData} title='Жим полегче'/> },
                ]}
                height='h-60'
            />     
            <div>  
                <button onClick={() => changeColor(MUSCLE_GROUPS[3], 'red')}>
                    TEST BODY COLOR CHANGE
                </button>
                <button onClick={() => changeColor(MUSCLE_GROUPS[5], 'orange')}>
                    TEST BODY COLOR CHANGE
                </button>
                <button onClick={() => changeColor(MUSCLE_GROUPS[7], 'yellow')}>
                    TEST BODY COLOR CHANGE
                </button>
            </div>  
        </div>
    )
}