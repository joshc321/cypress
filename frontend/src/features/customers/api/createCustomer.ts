import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Customer } from '../types';

export type CreateCustomerDTO = {
  data: {
    first: string,
    last: string,
    phone: string,
    address: {
        street: string,
        city: string,
        state: string,
        zip: string
    }
    system: string,
    notes: string
  };
};

export const createCustomer = ({ data }: CreateCustomerDTO): Promise<Customer> => {
    return axios.post(`/customer`, data);
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve({id: '123', ...data, serviceInterval: {unit: 'month', duration: 3}, company: 'company', status: 'active', nextService: new Date().toISOString()});
    //     }, 500);
    // });
};

type UseCreateCustomerOptions = {
  config?: MutationConfig<typeof createCustomer>;
};

export const useCreateCustomer = ({ config }: UseCreateCustomerOptions = {}) => {
  return useMutation({
    onMutate: async (newCustomer) => {
      await queryClient.cancelQueries({queryKey: ['customers']});

      const previousCustomers = queryClient.getQueryData<Customer[]>(['customers']);

      queryClient.setQueryData(['customers'], [...(previousCustomers || []), newCustomer.data]);

      return { previousCustomers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCustomers) {
        queryClient.setQueryData(['customers'], context.previousCustomers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customers']});
    },
    ...config,
    mutationFn: createCustomer,
  });
};