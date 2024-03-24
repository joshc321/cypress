import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { ScheduledService } from '../types';



export const getScheduledServices = ({startDate, endDate}: {startDate: string, endDate: string}): Promise<ScheduledService[]> => {
  // return axios.get(`/scheduled-service`, {
  //   params: {
  //     startDate,
  //     endDate,
  //   },
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDummyData(startDate, endDate));
    }, 10)});

};

type QueryFnType = typeof getScheduledServices;

type UseScheduledServicesOptions = {
  startDate: string;
  endDate: string
  config?: QueryConfig<QueryFnType>;
};

export const useScheduledServices = ({ startDate, endDate, config }: UseScheduledServicesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['scheduledservices', startDate, endDate],
    queryFn: () => getScheduledServices({startDate, endDate}),
  });
};


const getDummyData = (startDate: string, endDate: string): ScheduledService[] => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    return [
        {
          id: "1",
          date: `2024-03-23T09:30:00.000Z`,
          service: 'Some thing',
          notes: 'Some notes',
          estimate: 100,
          company: 'Some company',
          customer: {
            id: "1",
            first: 'John',
            last: 'Doe',
            phone: '555-555-5555',
          },
          address: {
            street: '123 Main St',
            city: 'Some City',
            state: 'CA',
            zip: '12345',
          },
        },
        {
          id: "2",
          date: `2024-03-21T12:30:00.000Z`,
          service: 'Some thing',
          notes: 'Some notes',
          estimate: 100,
          company: 'Some company',
          customer: {
            id: "1",
            first: 'John',
            last: 'Doe',
            phone: '555-555-5555',
          },
          address: {
            street: '123 Main St',
            city: 'Some City',
            state: 'CA',
            zip: '12345',
          },
        },
        {
          id: "3",
          date: `2024-03-23T11:30:00.000Z`,
          service: 'Some thing',
          notes: 'Some notes',
          estimate: 100,
          company: 'Some company',
          customer: {
            id: "1",
            first: 'John',
            last: 'Doe',
            phone: '555-555-5555',
          },
          address: {
            street: '123 Main St',
            city: 'Some City',
            state: 'CA',
            zip: '12345',
          },
        },
        {
          id: "4",
          date: `2024-03-01T12:30:00.000Z`,
          service: 'Some thing',
          notes: 'Some notes',
          estimate: 100,
          company: 'Some company',
          customer: {
            id: "1",
            first: 'John',
            last: 'Doe',
            phone: '555-555-5555',
          },
          address: {
            street: '123 Main St',
            city: 'Some City',
            state: 'CA',
            zip: '12345',
          },
        },
        {
          id: "5",
          date: startDate,
          service: 'Some thing',
          notes: 'Some notes',
          estimate: 100,
          company: 'Some company',
          customer: {
            id: "1",
            first: 'John',
            last: 'Doe',
            phone: '555-555-5555',
          },
          address: {
            street: '123 Main St',
            city: 'Some City',
            state: 'CA',
            zip: '12345',
          },
        },
        {
          id: "6",
          date: endDate,
          service: 'Some thing',
          notes: 'Some notes',
          estimate: 100,
          company: 'Some company',
          customer: {
            id: "1",
            first: 'John',
            last: 'Doe',
            phone: '555-555-5555',
          },
          address: {
            street: '123 Main St',
            city: 'Some City',
            state: 'CA',
            zip: '12345',
          },
        },
      ]
}