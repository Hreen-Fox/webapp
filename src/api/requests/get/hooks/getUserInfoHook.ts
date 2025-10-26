import { useState, useEffect } from 'react';
import getUserInfo from '../../get/getUserInfo'; // путь к вашей функции
import type { UserInfoState } from '../../../../types/types'; // укажите правильный путь к типу

export default function useUserInfo(userId: string): UserInfoState {
  const [state, setState] = useState<UserInfoState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const data = await getUserInfo(userId);
        setState({
          data,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Ошибка при загрузке данных пользователя:', err);
        setState({
          data: null,
          loading: false,
          error: 'Не удалось загрузить данные пользователя',
        });
      }
    };

    if (userId) {
      fetchUserInfo();
    } else {
      setState({
        data: null,
        loading: false,
        error: 'ID пользователя не указан',
      });
    }
  }, [userId]);

  return state;
}