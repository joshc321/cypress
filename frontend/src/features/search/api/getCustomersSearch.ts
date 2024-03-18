import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Customer } from '@/features/customers';



export const getCustomersSearch = ({query}: {query: string}): Promise<Customer[]> => {
  // return axios.get(`/search`, {
  //   params: {
  //     query,
  //   },
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummy_data);
    }, 10)});

};

type QueryFnType = typeof getCustomersSearch;

type UseCustomersSearchOptions = {
  query: string;
  config?: QueryConfig<QueryFnType>;
};

export const useCustomerSearch = ({ query, config }: UseCustomersSearchOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['search', query],
    queryFn: () => getCustomersSearch({ query }),
  });
};


const dummy_data = 
[{
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
},
{
  id: "019823470198374",
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

},
{
  id: "laksjdfhou8807",
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
}
];