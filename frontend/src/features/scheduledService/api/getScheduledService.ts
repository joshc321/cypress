import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { ScheduledService } from '../types';



export const getScheduledService = ({id}: {id: string}): Promise<ScheduledService> => {
  // return axios.get(`/scheduled-service`, {
  //   params: {
  //     id,
  //   },
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_data);
    }, 10)});

};

type QueryFnType = typeof getScheduledService;

type UseScheduledServiceOptions = {
  serviceId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useScheduledService = ({ serviceId, config }: UseScheduledServiceOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['scheduledservice', serviceId],
    queryFn: () => getScheduledService({ id: serviceId }),
  });
};


const dummy_data = 
{
    id: "6392ccasdf74a8514d8f531b73e",
    date: "2023-05-20T05:33",
    service: "some service here and there ya man",
    notes: "some notes here yeah",
    estimate: 100,
    company: "as9d8f0a9s8df",
    customer: {
        id: "a4kdjsf8889asdf",
        first: "John",
        last: "Doe",
        phone: "1234567890",
    },
    address: {
      street: "1234 Some Street",
      city: "Some City",
      state: "Some State",
      zip: "12345",
    }
    
}