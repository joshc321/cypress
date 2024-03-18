import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { ServiceRecord } from '../types';

export type CreateServiceRecordDTO = {
  data: {
    date: string;
    service: string;
    notes: string;
    bill: number;
    serviceType: string;
  };
  customerId: string;
};

export const createServiceRecord = ({ data, customerId }: CreateServiceRecordDTO): Promise<ServiceRecord> => {
    return axios.post(`/service-record/${customerId}`, data);
};

type UseCreateServiceRecordOptions = {
    customerID: string;
    config?: MutationConfig<typeof createServiceRecord>;
};

export const useCreateServiceRecord = ({ customerID, config }: UseCreateServiceRecordOptions) => {
  return useMutation({
    onMutate: async (newServiceRecord) => {
      await queryClient.cancelQueries({queryKey: ['serviceRecords', customerID]});

      const previousServiceRecords = queryClient.getQueryData<ServiceRecord[]>(['serviceRecords', customerID]);

      queryClient.setQueryData(['serviceRecords', customerID], [...(previousServiceRecords || []), newServiceRecord.data]);

      return { previousServiceRecords };
    },
    onError: (_, __, context: any) => {
      if (context?.previousServiceRecords) {
        queryClient.setQueryData(['serviceRecords', customerID], context.previousServiceRecords);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['serviceRecords', customerID]});
    },
    ...config,
    mutationFn: createServiceRecord,
  });
};