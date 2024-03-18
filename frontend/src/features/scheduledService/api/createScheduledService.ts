import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { ScheduledService } from '../types';

export type CreateScheduledServiceDTO = {
  data: {
    date: string;
    service: string;
    notes: string;
    estimate: number;
  };
  customerId: string;
};

export const createScheduledService = ({ data, customerId }: CreateScheduledServiceDTO): Promise<ScheduledService> => {
    return axios.post(`/scheduled-service/${customerId}`, data);
};

type UseCreateScheduledServiceOptions = {
    config?: MutationConfig<typeof createScheduledService>;
};

export const useCreateScheduledService = ({ config }: UseCreateScheduledServiceOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: createScheduledService,
  });
};