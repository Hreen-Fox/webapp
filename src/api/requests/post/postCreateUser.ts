import { api } from '../../apiClient';
import type { CreateUserRequest } from '../../../types/types';

export default async function createUser(userData: CreateUserRequest): Promise<void> {
  await api().post('/users/createuser', userData);
}
