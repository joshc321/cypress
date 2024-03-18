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
            company: '0198237409lhj',
            email: data.email,
            first: 'Test',
            last: 'User',
            role: 'ADMIN'
        }
    });
};