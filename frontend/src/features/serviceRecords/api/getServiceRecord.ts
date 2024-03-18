import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { ServiceRecord } from '../types';



export const getServiceRecord = ({id}: {id: string}): Promise<ServiceRecord> => {
  // return axios.get(`/service-record`, {
  //   params: {
  //     id,
  //   },
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_data);
    }, 10)});

};

type QueryFnType = typeof getServiceRecord;

type UseServiceRecordOptions = {
  serviceId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useServiceRecord = ({ serviceId, config }: UseServiceRecordOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['serviceRecord', serviceId],
    queryFn: () => getServiceRecord({ id: serviceId }),
  });
};


const dummy_data = 
{
    id: "6392ccasdf74a8514d8f531b73e",
    customer: {
        id: "a4kdjsf8889asdf",
        first: "John",
        last: "Doe",
    },
    company: "as9d8f0a9s8df",
    notes: "some notes here yeah",
    system: "some system",
    date: "2023-05-20T05:33",
    service: "some service here and there ya man",
    bill: 100,
    address: {
      street: "1234 Some Street",
      city: "Some City",
      state: "Some State",
      zip: "12345",
    }
}