import { axios } from '@/lib/axios';

import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => {
//   return axios.get('/auth/me');
    return Promise.resolve({
        id: '1',
        email: 'testemail@email.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'ADMIN'
    });

};