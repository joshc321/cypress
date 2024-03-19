import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { AuthUser } from '@/features/auth';
import { ROLES } from '@/lib/authorization';


const getUsers = (): Promise<AuthUser[]> => {
  // return axios.get(`/users`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_data);
    }, 10)});

};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};


const dummy_data = 
[
    {
        id: '1',
        first: 'John',
        last: 'Doe',
        email: 'testemail@email.com',
        company: 'aklsdjfljasudf',
        role: ROLES.ADMIN,
    },
    {
        id: '2',
        first: 'Another',
        last: 'Doe',
        email: 'testemail@email.com',
        company: 'aklsdjfljasudf',
        role: ROLES.USER,
    },
    {
        id: '3',
        first: 'John',
        last: 'Doe',
        email: 'testemail@email.com',
        company: 'aklsdjfljasudf',
        role: ROLES.ADMIN,
    }
]