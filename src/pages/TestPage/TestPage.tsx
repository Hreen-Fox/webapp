import React, { useEffect, useState } from 'react';

// Тип данных пользователя из Telegram WebApp
interface WebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
    added_to_attachment_menu?: boolean;
}

export default function TestPage() {
    const [user, setUser] = useState<WebAppUser | null>(null);
    const [isInTelegram, setIsInTelegram] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Проверяем, доступен ли Telegram WebApp
        const tg = (window as never).Telegram?.WebApp;

        if (!tg) {
            setIsInTelegram(false);
            setError('Это приложение должно быть запущено внутри Telegram.');
            return;
        }

        setIsInTelegram(true);

        try {
            // Получаем данные пользователя (небезопасно, только для отображения!)
            const initDataUnsafe = tg.initDataUnsafe;
            const userFromTg = initDataUnsafe?.user as WebAppUser | undefined;

            if (!userFromTg) {
                setError('Не удалось получить данные пользователя.');
                return;
            }

            setUser(userFromTg);

            // Опционально: применяем тему Telegram
            tg.expand(); // разворачиваем приложение на весь экран
            tg.ready();  // сообщаем, что приложение загружено

        } catch (err) {
            setError('Ошибка при получении данных от Telegram.');
            console.error(err);
        }
    }, []);

    if (!isInTelegram) {
        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
                <h2>🚫 Вне Telegram</h2>
                <p>{error}</p>
                <p>Откройте это приложение через Telegram Mini App.</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#000' }}>
            <h2>✅ Данные пользователя из Telegram</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                {user.photo_url && (
                    <img
                        src={user.photo_url}
                        alt="Аватар"
                        style={{ width: '64px', height: '64px', borderRadius: '50%' }}
                    />
                )}
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Имя:</strong> {user.first_name}</p>
                    {user.last_name && <p><strong>Фамилия:</strong> {user.last_name}</p>}
                    {user.username && <p><strong>Username:</strong> @{user.username}</p>}
                    <p><strong>Язык:</strong> {user.language_code || 'не указан'}</p>
                    {user.is_premium && <p>⭐ <strong>Premium:</strong> да</p>}
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <button
                    onClick={() => {
                        (window as never).Telegram.WebApp.close();
                    }}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#3390ec',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                    Закрыть приложение
                </button>
            </div>
        </div>
    );
}