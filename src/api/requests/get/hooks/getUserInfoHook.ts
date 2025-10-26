import { useState, useEffect } from 'react';
import getUserInfo from '../../get/getUserInfo'; // путь к вашей функции
import type { UserInfo } from '../../../../types/types'; // укажите правильный путь к типу

export default function useUserInfo(userId: string): UserInfo | null {
    const [data, setData] = useState<UserInfo | null>(null);
    // loading и error больше не отслеживаются в возвращаемом значении

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await getUserInfo(userId!);
                setData(userData);
            } catch (err) {
                console.error('Ошибка при загрузке данных пользователя:', err);
                setData(null); // в случае ошибки — возвращаем null
            }
        };

        if (userId) {
            fetchUserInfo();
        } else {
            setData(null);
        }
    }, [userId]);

  return data;
}