
import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { ServiceRecord } from '../types';

export type UpdateServiceRecordDTO = {
  data: {
    date: string;
    service: string;
    notes: string;
    bill: number;
  };
  serviceId: string;
};

export const updateServiceRecord = ({
  data,
  serviceId,
}: UpdateServiceRecordDTO): Promise<ServiceRecord> => {
  return axios.patch(`/service-record/${serviceId}`, data);
  
};

type UseUpdateServiceRecordOptions = {
  config?: MutationConfig<typeof updateServiceRecord>;
};

export const useUpdateServiceRecord = ({ config }: UseUpdateServiceRecordOptions = {}) => {

  return useMutation({
    onMutate: async (updatingServiceRecord: any) => {
      await queryClient.cancelQueries({queryKey: ['servicerecord', updatingServiceRecord?.serviceId]});

      const previousServiceRecord = queryClient.getQueryData<ServiceRecord>([
        'servicerecord',
        updatingServiceRecord?.serviceId,
      ]);

      queryClient.setQueryData(['servicerecord', updatingServiceRecord?.serviceId], {
        ...previousServiceRecord,
        ...updatingServiceRecord.data,
        id: updatingServiceRecord.serviceId,
      });

      return { previousServiceRecord };
    },
    onError: (_, __, context: any) => {
      if (context?.previousServiceRecord) {
        queryClient.setQueryData(
          ['servicerecord', context.serviceId],
          context.previousServiceRecord
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({queryKey: ['servicerecord', data.id]});
    },
    ...config,
    mutationFn: updateServiceRecord,
  });
};
