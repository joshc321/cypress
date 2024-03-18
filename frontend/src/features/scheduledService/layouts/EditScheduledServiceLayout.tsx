'use client';

import { TopBar } from "@/components/Elements"
import { useSearchParams } from "next/navigation";
import { FormSpacing } from "@/components/Form"
import { EditScheduledServiceForm } from "../components/EditScheduledServiceForm";
import { ScheduledService } from "../types";


export const EditScheduledServiceLayout = () => {

    const searchParams = useSearchParams();

    const onSuccess = (scheduledService: ScheduledService) => {
        console.log(scheduledService);
    }

    return (
        <div>
            <TopBar primaryText={"Scheduled Service"} secondaryText="Edit Service" />
            <FormSpacing className="pt-56">
                <EditScheduledServiceForm serviceId={searchParams.get('id') || ''} onSuccess={onSuccess} />
            </FormSpacing>
        </div>
    )
}