import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';


export type ForgotPasswordDTO = {
  data: {
    email: string;
  };
};

type resultDTO = {
    data: {
        success: boolean;
    };
}

export const forgotPassword = ({ data }: ForgotPasswordDTO): Promise<resultDTO> => {
  return axios.post('/forgot', data);
};

type UseForgotPasswordOptions = {
  config?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({ config }: UseForgotPasswordOptions) => {

  return useMutation({
    ...config,
    mutationFn: forgotPassword,
  });
};