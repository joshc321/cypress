import { axios } from '@/lib/axios';

import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => {
//   return axios.get('/auth/me');
    return Promise.resolve({
        id: '1',
        company: '0198237409lhj',
        email: 'testemail@email.com',
        first: 'Test',
        last: 'User',
        role: 'ADMIN'
    });

};