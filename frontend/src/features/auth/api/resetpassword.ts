import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';


export type ResetPasswordDTO = {
  data: {
    email: string;
    password: string;
  };
};

type resultDTO = {
    data: {
        success: boolean;
    };
}

export const resetPassword = ({ data }: ResetPasswordDTO): Promise<resultDTO> => {
  return axios.post('/reset', data);
};

type UseResetPasswordOptions = {
  config?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({ config }: UseResetPasswordOptions) => {

  return useMutation({
    ...config,
    mutationFn: resetPassword,
  });
};