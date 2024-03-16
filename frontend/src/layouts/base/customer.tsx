'use client';

import { SpeedDial, SpeedDialAction } from "@/components/baseComponents/speedDial";
import DataDisplayerView from "@/components/dumbComponents/dataDisplayerView";
import ServiceRecordList from "@/components/dumbComponents/serviceRecordList";
import TopBar from "@/components/dumbComponents/topbar";
import getCustomer from "@/helpers/data_fetching/specific/getCustomer";
import { useSearchParams, useRouter } from "next/navigation";
import {MdDesignServices, MdCalendarMonth} from "react-icons/md";



export default function CustomerLayout() {

    // get query param id
    const searchParams = useSearchParams();
    const router = useRouter();

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
            <SpeedDial>
                <SpeedDialAction label={"Schedule"} icon={<MdCalendarMonth className="w-6 h-6" />} onClick={() => router.push(`/create-schedule?id=${customer.data.id}`)} />
                <SpeedDialAction label={"Service"} icon={<MdDesignServices className="w-6 h-6" />} onClick={() => router.push(`/create-service?id=${customer.data.id}`)} />
            </SpeedDial>
        </div>

    )
}