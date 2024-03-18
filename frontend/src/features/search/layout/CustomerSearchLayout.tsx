'use client';

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { ActionButton, Divider } from "@/components/Elements";
import { SearchBar } from "../components/SearchBar";
import { CustomerList } from '@/features/customers'
import { useCustomerSearch } from '../api/getCustomersSearch';

export const CustomerSearchLayout = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = React.useState(searchParams.get('search') || '');

    const customerData = useCustomerSearch({ query: query });


    return (
        <main className="">
            <div className="sticky top-0 left-0 z-50 p-6 bg-white">
                <SearchBar
                    onSubmit={
                        (query) => {
                            console.log(query);
                            setQuery(query.query)
                        }
                    }
                />
            </div>
            <Divider variant="middle" size="sm" />
            {customerData?.data &&
                 <CustomerList data={customerData.data} linkTo={"/customer?id="} />
            }
            {
                customerData?.status === 'error' && <div>Error</div>
            }
            <ActionButton className="fixed end-6 bottom-20" onClick={() => router.push('/customer/create')} />
        </main>
    )
}