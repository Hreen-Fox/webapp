import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContextDef';
import type {WebAppInitData} from './types/telegram-webapp';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [initData, setInitData] = useState<WebAppInitData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('[UserProvider] useEffect запущен');
        const tg = window.Telegram?.WebApp;

        if (!tg || !tg.initDataUnsafe?.user) {
            setError('Это приложение должно быть запущено внутри Telegram Mini App.');
            setLoading(false);
            return;
        }

        tg.ready();
        tg.expand();

        const data = tg.initDataUnsafe;
        if (!data) {
            setError('Нет данных пользователя (возможно, запущено через клавиатуру).');
            setLoading(false);
            return;
        }

        setInitData(data);
        setLoading(false);
    }, []);

    const user = initData?.user || null;

    return (
        <UserContext.Provider value={{ user, initData, error, loading }}>
            {children}
        </UserContext.Provider>
    );
};