'use client';

import { FormSpacing } from "@/components/Form"
import { CreateScheduledServiceForm } from "../components/CreateScheduledServiceForm";
import { ScheduledService } from "../types";
import { useSearchParams, useRouter } from "next/navigation";
import { IconButton } from "@/components/Elements";
import { MdArrowBack } from "react-icons/md";


export const CreateScheduledServiceLayout = () => {

    const router = useRouter();
    const serachParams = useSearchParams();

    const onSuccess = (scheduledService: ScheduledService) => {
        console.log('created scheduled service', scheduledService.id);
    }

    return (
        <FormSpacing className="pt-14">
            <IconButton onClick={() => router.back()}>
                <MdArrowBack className="w-6 h-6" /> 
            </IconButton>
            <h1 className="text-xl font-semibold pb-5">Schedule Service</h1>
            <CreateScheduledServiceForm onSuccess={onSuccess} customerId={serachParams.get('id') || ''} />
        </FormSpacing>
    )
}