
import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { ScheduledService } from '../types';

export type UpdateScheduledServiceDTO = {
  data: {
    date: string;
    service: string;
    notes: string;
    estimate: number;
  };
  serviceId: string;
};

export const updateScheduledService = ({
  data,
  serviceId,
}: UpdateScheduledServiceDTO): Promise<ScheduledService> => {
  return axios.patch(`/scheduled-service/${serviceId}`, data);
  
};

type UseUpdateScheduledServiceOptions = {
  config?: MutationConfig<typeof updateScheduledService>;
};

export const useUpdateScheduledService = ({ config }: UseUpdateScheduledServiceOptions = {}) => {

  return useMutation({

    onSuccess: (data) => {
      queryClient.refetchQueries({queryKey: ['scheduledservice', data.id]});
    },
    ...config,
    mutationFn: updateScheduledService,
  });
};
