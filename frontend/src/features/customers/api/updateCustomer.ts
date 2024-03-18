
import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Customer } from '../types';

export type UpdateCustomerDTO = {
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
    notes: string,
    duration: number,
    unit: string,
    status: string
  };
  customerId: string;
};

export const updateCustomer = ({
  data,
  customerId,
}: UpdateCustomerDTO): Promise<Customer> => {
  return axios.patch(`/customer/${customerId}`, data);
  
};

type UseUpdateCustomerOptions = {
  config?: MutationConfig<typeof updateCustomer>;
};

export const useUpdateCustomer = ({ config }: UseUpdateCustomerOptions = {}) => {

  return useMutation({
    onMutate: async (updatingCustomer: any) => {
      await queryClient.cancelQueries({queryKey: ['customer', updatingCustomer?.customerId]});

      const previousCustomer = queryClient.getQueryData<Customer>([
        'customer',
        updatingCustomer?.customerId,
      ]);

      queryClient.setQueryData(['customer', updatingCustomer?.customerId], {
        ...previousCustomer,
        ...updatingCustomer.data,
        id: updatingCustomer.customerId,
      });

      return { previousCustomer };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(
          ['customer', context.customerId],
          context.previousCustomer
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({queryKey: ['customer', data.id]});
    },
    ...config,
    mutationFn: updateCustomer,
  });
};
