'use client';

import DataDisplayerView from "@/components/dumbComponents/dataDisplayerView";
import ServiceRecordList from "@/components/dumbComponents/serviceRecordList";
import TopBar from "@/components/dumbComponents/topbar";
import getCustomer from "@/helpers/data_fetching/specific/getCustomer";
import { useSearchParams } from "next/navigation";


export default function CustomerLayout() {

    // get query param id
    const searchParams = useSearchParams();

    const customer = getCustomer(searchParams.get('id') || '');

    return (
        <div>
            <TopBar primaryText={`${customer.data.first} ${customer.data.last}`} secondaryText="Information" to={`edit-customer?id=${customer.data.id}`} />
            <div className="pt-52 pb-20">
                <DataDisplayerView data={customer.data} />
                <hr className={"border-secondary-light border-8"} />
                <h2 className="text-2xl font-semibold p-2">Service Records</h2>
                <hr className={"border-secondary-light border-2"} />
                <ServiceRecordList serviceRecords={customer.data.services} to="service-record"/>
            </div>
        </div>

    )
}