'use client';

import { FormSpacing } from "@/components/Form"
import { CreateServiceRecordForm } from "../components/CreateServiceRecordForm";
import { ServiceRecord } from "../types";
import { useSearchParams, useRouter } from "next/navigation";
import { IconButton } from "@/components/Elements";
import { MdArrowBack } from "react-icons/md";


export const CreateServiceRecordLayout = () => {

    const router = useRouter();
    const serachParams = useSearchParams();

    const onSuccess = (serviceRecord: ServiceRecord) => {
        console.log('created service record', serviceRecord.id);
    }

    return (
        <FormSpacing className="pt-14">
            <IconButton onClick={() => router.back()}>
                <MdArrowBack className="w-6 h-6" /> 
            </IconButton>
            <h1 className="text-xl font-semibold pb-5">Create Service</h1>
            <CreateServiceRecordForm onSuccess={onSuccess} customerId={serachParams.get('id') || ''} />
        </FormSpacing>
    )
}