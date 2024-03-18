'use client';

import { FormSpacing } from "@/components/Form"
import { CreateCustomerForm } from "../components/CreateCustomerForm";
import { Customer } from "../types";


export const CreateCustomerLayout = () => {

    const onSuccess = (customer: Customer) => {
        console.log('created customer', customer.id);
    }

    return (
        <FormSpacing className="pt-14">
            <h1 className="text-xl font-semibold pb-5">Create Customer</h1>
            <CreateCustomerForm onSuccess={onSuccess} />
        </FormSpacing>
    )
}