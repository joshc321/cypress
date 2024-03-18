'use client';

import { TopBar } from "@/components/Elements"
import { useCustomer } from "../api/getCustomer"
import { useSearchParams } from "next/navigation";
import { FormSpacing } from "@/components/Form"
import { EditCustomerForm } from "../components/EditCustomerForm";


export const EditCustomerLayout = () => {

    const searchParams = useSearchParams();
    const customer = useCustomer({customerId: searchParams.get('id') || ''});

    return (
        <div>
            <TopBar primaryText={customer.data?.first || 'Not Found'} secondaryText="Edit Customer" />
            <FormSpacing className="pt-56">
                <EditCustomerForm customerId={customer.data?.id || ''} />
            </FormSpacing>
        </div>
    )
}