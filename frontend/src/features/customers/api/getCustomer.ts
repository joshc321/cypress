import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Customer } from '../types';



export const getCustomer = ({id}: {id: string}): Promise<Customer> => {
  // return axios.get(`/customer`, {
  //   params: {
  //     id,
  //   },
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_data);
    })});

};

type QueryFnType = typeof getCustomer;

type UseCustomerOptions = {
  customerId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useCustomer = ({ customerId, config }: UseCustomerOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['customer', customerId],
    queryFn: () => getCustomer({ id: customerId }),
  });
};


const dummy_data = 
{
    id: "6392cc174a8514d8f531b73e",
    phone: "765-2020",
    email: "",
    first: "Resevoir",
    last: "A.W.Z.",

    address: {
        street: "P.O. box 519",
        city: "winchester",
        state: "CA",
        zip: "92596"
    },
    serviceInterval: {
        "duration": 1,
        "unit": "years"
    },
    
    system: "",
    notes: "287,400, 422",
    company: "6392cbdf4a8514d8f531b738",
    lastServiced: "2021-12-08T00:00:00.000Z",
    status: "active",
    nextService: "2022-12-08T00:00:00.000Z",
    scheduledService: {
      id: ";aksdjfia;sd00",
      date: "2022-12-08T00:00:00.000Z",
    },
    serviceRecords: [
      {
        id: "0897sd09f8a7s0d9",
        system: "this is a system yup",
        date: "2021-12-08T00:00:00.000Z",
        notes: 'here are some notes for this yea',
        company: '6392cbdf4a8514d8f531b738',
        service: 'uhh this is the service I did',
        bill: 32,
      },
      {
        id: "lakjsdf0a87sdf",
        system: "this is a system yup",
        date: "2021-12-08T00:00:00.000Z",
        notes: 'here are some notes for this yea',
        company: '6392cbdf4a8514d8f531b738',
        service: 'uhh this is the service I did',
        bill: 32,
      },
      {
        id: "lakjsdf087asd6f0",
        system: "this is a system yup",
        date: "2021-12-08T00:00:00.000Z",
        notes: 'here are some notes for this yea',
        company: '6392cbdf4a8514d8f531b738',
        service: 'uhh this is the service I did',
        bill: 32,
      }
    ]
}