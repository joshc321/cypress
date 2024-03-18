'use client';

import { TopBar, DisplayButton, Divider } from "@/components/Elements";
import { useSearchParams, useRouter } from "next/navigation";
import { ServiceRecordDataViewer } from '../components/ServiceRecordDataViewer';
import { useServiceRecord } from "../api/getServiceRecord";


export const ServiceRecordLayout = () => {

    // get query param id
    const searchParams = useSearchParams();

    const serviceRecord = useServiceRecord({serviceId: searchParams.get('id') || ''});

    return (
        <div>
            <TopBar primaryText={'Service Record'} secondaryText="Infomation" to={`service-record/edit?id=${serviceRecord.data?.id}`}/>
            <div className="pt-52">
                { serviceRecord.data?.customer &&
                    <>
                        <DisplayButton 
                            info="Customer" 
                            primary={serviceRecord.data.customer.first + ' ' + serviceRecord.data.customer.last} 
                            to={`customer?id=${serviceRecord.data.customer.id}`} 
                        />
                        <Divider />
                    </>
                }
                <ServiceRecordDataViewer data={serviceRecord.data} />
            </div>
        </div>

    )
}