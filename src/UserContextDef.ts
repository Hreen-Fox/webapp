import { createContext } from 'react';
import type { WebAppInitData, WebAppUser } from './types/telegram-webapp';

type UserContextType = {
    user: WebAppUser | null;
    initData: WebAppInitData | null;
    error: string | null;
    loading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);