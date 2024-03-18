import { axios } from '@/lib/axios';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
//   return axios.post('/auth/login', data);
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