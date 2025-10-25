import { useEffect, useState } from 'react';
import type {WebAppInitData} from '../../telegram-webapp';

// Вспомогательный компонент для отображения пар "ключ: значение"
const DataItem = ({ label, value }: { label: string; value: string }) => (
    <div style={{ marginBottom: '6px' }}>
        <strong>{label}:</strong> {value}
    </div>
);

export default function TestPage() {
    const [initData, setInitData] = useState<WebAppInitData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
            setError('Это приложение должно быть запущено внутри Telegram Mini App.');
            return;
        }

        tg.ready();
        tg.expand();

        const data = tg.initDataUnsafe;
        if (!data) {
            setError('Нет данных пользователя (возможно, запущено через клавиатуру).');
            return;
        }

        setInitData(data);
    }, []);

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
                <h2>⚠️ Ошибка</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!initData) {
        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <p>Загрузка...</p>
            </div>
        );
    }

    const { user, receiver, chat, ...meta } = initData;

    return (
        <div style={{ padding: '16px', fontFamily: 'sans-serif', color: 'white' }}>
            <h2>📋 Данные пользователя</h2>

            {/* Основной пользователь */}
            {user && (
                <section style={{ marginBottom: '24px' }}>
                    <h3>👤 Текущий пользователь</h3>
                    <DataItem label="ID" value={user.id.toString()} />
                    <DataItem label="Имя" value={user.first_name} />
                    {user.last_name && <DataItem label="Фамилия" value={user.last_name} />}
                    {user.username && <DataItem label="Username" value={`@${user.username}`} />}
                    {user.language_code && <DataItem label="Язык" value={user.language_code} />}
                    <DataItem label="Premium" value={user.is_premium ? '✅ Да' : '❌ Нет'} />
                    <DataItem
                        label="Добавлен в меню"
                        value={user.added_to_attachment_menu ? '✅ Да' : '❌ Нет'}
                    />
                    <DataItem
                        label="Разрешил писать"
                        value={user.allows_write_to_pm ? '✅ Да' : '❌ Нет'}
                    />
                    {user.photo_url && (
                        <div style={{ marginTop: '8px' }}>
                            <strong>Аватар:</strong>
                            <br />
                            <img
                                src={user.photo_url}
                                alt="Аватар"
                                style={{ width: '80px', height: '80px', borderRadius: '8px', marginTop: '4px' }}
                            />
                        </div>
                    )}
                </section>
            )}

            {/* Получатель (receiver) — для attachment menu */}
            {receiver && (
                <section style={{ marginBottom: '24px' }}>
                    <h3>👥 Получатель (чат-партнёр)</h3>
                    <DataItem label="ID" value={receiver.id.toString()} />
                    <DataItem label="Имя" value={receiver.first_name} />
                    {receiver.last_name && <DataItem label="Фамилия" value={receiver.last_name} />}
                    {receiver.username && <DataItem label="Username" value={`@${receiver.username}`} />}
                    <DataItem label="Бот" value={receiver.is_bot ? '✅ Да' : '❌ Нет'} />
                    {receiver.photo_url && (
                        <div style={{ marginTop: '8px' }}>
                            <strong>Аватар:</strong>
                            <br />
                            <img
                                src={receiver.photo_url}
                                alt="Аватар получателя"
                                style={{ width: '80px', height: '80px', borderRadius: '8px', marginTop: '4px' }}
                            />
                        </div>
                    )}
                </section>
            )}

            {/* Чат — для групп/каналов */}
            {chat && (
                <section style={{ marginBottom: '24px' }}>
                    <h3>💬 Чат</h3>
                    <DataItem label="ID" value={chat.id.toString()} />
                    <DataItem label="Тип" value={chat.type} />
                    <DataItem label="Название" value={chat.title} />
                    {chat.username && <DataItem label="Username" value={`@${chat.username}`} />}
                    {chat.photo_url && (
                        <div style={{ marginTop: '8px' }}>
                            <strong>Фото чата:</strong>
                            <br />
                            <img
                                src={chat.photo_url}
                                alt="Фото чата"
                                style={{ width: '80px', height: '80px', borderRadius: '8px', marginTop: '4px' }}
                            />
                        </div>
                    )}
                </section>
            )}

            {/* Метаданные сессии */}
            <section>
                <h3>⚙️ Метаданные сессии</h3>
                {meta.query_id && <DataItem label="Query ID" value={meta.query_id} />}
                {meta.start_param && <DataItem label="Start param" value={meta.start_param} />}
                {meta.chat_type && <DataItem label="Тип чата" value={meta.chat_type} />}
                {meta.chat_instance && <DataItem label="Chat instance" value={meta.chat_instance} />}
                {meta.can_send_after && (
                    <DataItem label="Можно отправить через" value={`${meta.can_send_after} сек`} />
                )}
                <DataItem label="Auth date" value={new Date(meta.auth_date * 1000).toLocaleString()} />
                <DataItem label="Hash" value={meta.hash.substring(0, 16) + '...'} />
                {meta.signature && (
                    <DataItem label="Signature" value={meta.signature.substring(0, 16) + '...'} />
                )}
            </section>

            <div style={{ marginTop: '24px' }}>
                <button
                    onClick={() => window.Telegram?.WebApp?.close()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#3390ec',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
};