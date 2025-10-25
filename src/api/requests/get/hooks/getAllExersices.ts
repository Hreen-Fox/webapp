// hooks/useAllExercises.ts
import { useState, useEffect } from 'react';
import getExercises from '../getExersices'; // ваша функция
import type  { MuscleGroupExercises } from '../../../../types/types';

export default function useAllExercises(userId: string) {
  const [groups, setGroups] = useState<MuscleGroupExercises[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      // Инициализируем состояние: 18 групп в состоянии загрузки
      const initialGroups: MuscleGroupExercises[] = Array.from({ length: 18 }, (_, i) => ({
        groupId: i + 1,
        exercises: [],
        loading: true,
        error: null,
      }));

      setGroups(initialGroups);

      // Выполняем все запросы параллельно
      const promises = initialGroups.map(async (group) => {
        try {
          const response = await getExercises(String(group.groupId), userId);
          return {
            groupId: group.groupId,
            exercises: response.exercises || [],
            loading: false,
            error: null,
          };
        } catch (err) {
          console.error(`Ошибка загрузки группы ${group.groupId}:`, err);
          return {
            groupId: group.groupId,
            exercises: [],
            loading: false,
            error: 'Не удалось загрузить',
          };
        }
      });

      // Дожидаемся всех ответов и обновляем состояние
      const resolvedGroups = await Promise.all(promises);
      setGroups(resolvedGroups);
    };

    if (userId) {
      loadAll();
    }
  }, [userId]);

  return groups;
}