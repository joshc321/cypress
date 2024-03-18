'use client';

import { SpeedDial, SpeedDialAction } from "@/components/Elements/SpeedDial";
import { SectionHeading, TopBar, DisplayButton, Divider } from "@/components/Elements";
import { useSearchParams, useRouter } from "next/navigation";
import {MdDesignServices, MdCalendarMonth} from "react-icons/md";
import { CustomerDataViewer } from '../components/CustomerDataViewer';
import { useCustomer } from "../api/getCustomer";
import { ServiceRecordList } from "@/features/serviceRecords";
import { formatDate } from "@/utils/format";


export const CustomerLayout = () => {

    // get query param id
    const searchParams = useSearchParams();
    const router = useRouter();

    const customer = useCustomer({customerId: searchParams.get('id') || ''});

    return (
        <div>
            <TopBar primaryText={`${customer.data?.first || ''} ${customer.data?.last || ''}`}/>
            <div className="pt-40">
                <SectionHeading text="Information" to={`customer/edit?id=${customer.data?.id}`}  />
                { customer.data?.scheduledService &&
                    <>
                        <DisplayButton 
                        info="Scheduled Service" 
                        primary={formatDate(customer.data.scheduledService.date)} 
                        to={`scheduled-service?id=${customer.data.scheduledService.id}`} 
                        />
                        <Divider />
                    </>
                }
                <CustomerDataViewer data={customer.data} />
                <hr className={"border-secondary-light border-8"} />
                <h2 className="text-2xl font-semibold p-2">Service Records</h2>
                <hr className={"border-secondary-light border-2"} />
                <ServiceRecordList serviceRecords={customer.data?.serviceRecords} to="service-record"/>
            </div>
            <SpeedDial>
                <SpeedDialAction label={"Schedule"} icon={<MdCalendarMonth className="w-6 h-6" />} onClick={() => router.push(`/scheduled-service/create?id=${customer.data?.id}`)} />
                <SpeedDialAction label={"Service"} icon={<MdDesignServices className="w-6 h-6" />} onClick={() => router.push(`/service-record/create?id=${customer.data?.id}`)} />
            </SpeedDial>
        </div>

    )
}