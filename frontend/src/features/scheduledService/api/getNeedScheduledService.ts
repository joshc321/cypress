/*
    Route to get the customers
    that need to be scheduled
    for a service
*/

import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { NeedScheduledService } from '../types';



export const getNeedScheduledService = (): Promise<NeedScheduledService[]> => {
  // return axios.get(`/need-schedule`, {
  //   params: {
  //     id,
  //   },
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_data);
    }, 10)});

};

type QueryFnType = typeof getNeedScheduledService;

type UseNeedScheduledServiceOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useNeedScheduledService = ({ config }: UseNeedScheduledServiceOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['needscheduledservice'],
    queryFn: () => getNeedScheduledService(),
  });
};


const dummy_data = 
[
  {
    date: "2023-04-20T05:33",
    customer: {
        id: "0a9s8df098as9df",
        first: "John",
        last: "Doe",
        phone: "123-456-7890",
    },
    address: {
      street: "1234 Some Street",
      city: "Some City",
      state: "Some State",
      zip: "12345",
    }
    
  },
  {
    date: "2023-05-20T05:33",
    customer: {
        id: "a4kdjsf8889asdf",
        first: "John",
        last: "Doe",
        phone: "123-456-7890",
    },
    address: {
      street: "1234 Some Street",
      city: "Some City",
      state: "Some State",
      zip: "12345",
    }
    
  },
  {
    date: "2023-06-20T05:33",
    customer: {
        id: "0a9s8d7f09adf",
        first: "John",
        last: "Doe",
        phone: "123-456-7890",
    },
    address: {
      street: "1234 Some Street",
      city: "Some City",
      state: "Some State",
      zip: "12345",
    }
    
  },
  {
    date: "2022-06-20T05:33",
    customer: {
        id: "0a9s8d7f09adf",
        first: "John",
        last: "Doe",
        phone: "123-456-7890",
    },
    address: {
      street: "1234 Some Street",
      city: "Some City",
      state: "Some State",
      zip: "12345",
    }
    
  },
  {
    date: "2023-05-10T05:33",
    customer: {
        id: "0a9s8d7f09adf",
        first: "John",
        last: "Doe",
        phone: "123-456-7890",
    },
    address: {
      street: "1234 Some Street",
      city: "Some City",
      state: "Some State",
      zip: "12345",
    }
    
  },
]