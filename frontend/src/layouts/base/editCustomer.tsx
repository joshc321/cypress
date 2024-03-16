'use client';

import InputBase from "@/components/baseComponents/inputBase";
import TopBar from "@/components/dumbComponents/topbar";
import BaseFormLayout from "@/components/formGroups/baseFormLayout";
import getCustomer from "@/helpers/data_fetching/specific/getCustomer";
import SelectBase from "@/components/baseComponents/selectBase";
import { useFormControl } from "@/helpers/hooks/useFormControl";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";


export default function EditCustomerLayout() {

    // get query param id
    const searchParams = useSearchParams();

    const customer = getCustomer(searchParams.get('id') || '');

    const [formValues, handleFormChange] = useFormControl({
        first: customer.data.first,
        last: customer.data.last,
        phone: customer.data.phone,
        street: customer.data.address.street,
        city: customer.data.address.city,
        state: customer.data.address.state,
        zip: customer.data.address.zip,
        system: customer.data.system,
        notes: customer.data.notes,
        duration: customer.data.serviceInterval.duration,
        unit: customer.data.serviceInterval.unit,
        status: customer.data.status
    });
    const [unitVal, setUnitVal] = useState(customer.data.serviceInterval.unit);
    const handleUnitChange = (e: FormEvent<HTMLSelectElement>) => {
        setUnitVal(e.currentTarget.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("submitting");
    }

    return (
        <div>
            <TopBar primaryText={`${customer.data.first} ${customer.data.last}`} secondaryText="Edit Customer" />
            <div className="pt-52 pb-20">
                <BaseFormLayout onSubmit={handleSubmit} formLabel="Info" buttonText="Update">
                    <div className="flex flex-row gap-3">
                        <InputBase onChange={handleFormChange('first')} value={formValues.first} placeholder="First" />
                        <InputBase onChange={handleFormChange('last')} value={formValues.last} placeholder="Last" />
                    </div>
                    
                    <InputBase onChange={handleFormChange('phone')} value={formValues.phone} placeholder="Phone" />
                    <InputBase onChange={handleFormChange('street')} value={formValues.street} placeholder="Street" />
                    <InputBase onChange={handleFormChange('city')} value={formValues.city} placeholder="City" />
                    
                    <div className="flex flex-row gap-3">
                        <InputBase onChange={handleFormChange('state')} value={formValues.state} placeholder="State" />
                        <InputBase onChange={handleFormChange('zip')} value={formValues.zip} placeholder="Zip" />
                    </div>

                    <InputBase multiline onChange={handleFormChange('system')} value={formValues.system} placeholder="System" />
                    <InputBase multiline onChange={handleFormChange('notes')} value={formValues.notes} placeholder="Notes" />
                    
                    <div className="flex flex-row gap-3">
                        <InputBase label="Service Interval" type="number" onChange={handleFormChange('duration')} value={formValues.duration} placeholder="Duration" />
                        <SelectBase label="unit" options={["years", "months", "weeks", "days"]} value={formValues.unit} onChange={handleFormChange('duration')} />

                    </div>

                    <SelectBase label="Status" options={["active", "inactive"]} value={formValues.status} onChange={handleFormChange('status')} />
                    
                </BaseFormLayout>
            </div>
        </div>
    )
}