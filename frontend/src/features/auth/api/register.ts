import { axios } from '@/lib/axios';

import { UserResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
//   return axios.post('/auth/register', data);
    return Promise.resolve({
        jwt: 'jwt19802347',
        user: {
            id: '1',
            email: data.email,
            firstName: 'Test',
            lastName: 'User',
            role: 'ADMIN'
        }
    });
};