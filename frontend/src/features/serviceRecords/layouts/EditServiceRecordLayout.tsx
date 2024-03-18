'use client';

import { TopBar } from "@/components/Elements"
import { useSearchParams } from "next/navigation";
import { FormSpacing } from "@/components/Form"
import { EditServiceRecordForm } from "../components/EditServiceRecordForm";
import { ServiceRecord } from "../types";


export const EditServiceRecordLayout = () => {

    const searchParams = useSearchParams();

    const onSuccess = (serviceRecord: ServiceRecord) => {
        console.log(serviceRecord);
    }

    return (
        <div>
            <TopBar primaryText={"Service Record"} secondaryText="Edit Service" />
            <FormSpacing className="pt-56">
                <EditServiceRecordForm serviceId={searchParams.get('id') || ''} onSuccess={onSuccess} />
            </FormSpacing>
        </div>
    )
}