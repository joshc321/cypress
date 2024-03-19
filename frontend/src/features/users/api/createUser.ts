import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { AuthUser } from '@/features/auth';
import { ROLES } from '@/lib/authorization';

export type CreateUserDTO = {
  data: {
    first: string;
    last: string;
    email: string;
    password: string;
    role: ROLES;
  };
};

const createUser = ({ data }: CreateUserDTO): Promise<AuthUser> => {
    return axios.post(`/user`, data);
};

type UseCreateUserOptions = {
    config?: MutationConfig<typeof createUser>;
};

export const useCreateUser = ({ config }: UseCreateUserOptions = {}) => {
  return useMutation({
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['users']});
    },
    ...config,
    mutationFn: createUser,
  });
};