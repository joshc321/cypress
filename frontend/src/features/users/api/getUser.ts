import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { AuthUser } from '@/features/auth';
import { ROLES } from '@/lib/authorization';


const getOtherUser = ({id}: {id: string}): Promise<AuthUser> => {
//   return axios.get(`/user/${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_data);
    }, 10)});

};

type QueryFnType = typeof getOtherUser;

type UseOtherUserOptions = {
    userId: string;
    config?: QueryConfig<QueryFnType>;
};

export const useOtherUser = ({ userId, config }: UseOtherUserOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['user', userId],
    queryFn: () => getOtherUser({id: userId}),
  });
};


const dummy_data = 
    {
        id: '1',
        first: 'John',
        last: 'Doe',
        email: 'testemail@email.com',
        company: 'aklsdjfljasudf',
        role: ROLES.ADMIN,
    }
