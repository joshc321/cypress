
import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { AuthUser } from '@/features/auth';

export type UpdateUserDTO = {
  data: {
    email: string;
    first: string;
    last: string;
    role: "ADMIN" | "USER";
  };
  userId: string;
};

const updateUser = ({
  data,
  userId,
}: UpdateUserDTO): Promise<AuthUser> => {
  return axios.patch(`/user/${userId}`, data);
  
};

type UseUpdateUserOptions = {
  config?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {

  return useMutation({

    onSuccess: (data) => {
      queryClient.refetchQueries({queryKey: ['user', data.id]});
    },
    ...config,
    mutationFn: updateUser,
  });
};
