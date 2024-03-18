'use client';

import { TopBar, DisplayButtonLink, Divider } from "@/components/Elements";
import { useSearchParams, useRouter } from "next/navigation";
import { ScheduledServiceDataViewer } from '../components/ScheduledServiceFormDataViewer';
import { useScheduledService } from "../api/getScheduledService";


export const ScheduledServiceLayout = () => {

    // get query param id
    const searchParams = useSearchParams();

    const scheduledService = useScheduledService({serviceId: searchParams.get('id') || ''});

    return (
        <div>
            <TopBar primaryText={'Scheduled Service'} secondaryText="Infomation" to={`scheduled-service/edit?id=${scheduledService.data?.id}`}/>
            <div className="pt-52">
                { scheduledService.data?.customer &&
                    <>
                        <DisplayButtonLink 
                            info="Customer" 
                            primary={scheduledService.data.customer.first + ' ' + scheduledService.data.customer.last} 
                            to={`customer?id=${scheduledService.data.customer.id}`} 
                        />
                        <Divider />
                    </>
                }
                <ScheduledServiceDataViewer data={scheduledService.data} />
            </div>
        </div>

    )
}