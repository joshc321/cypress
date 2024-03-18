'use client';

import Link from 'next/link';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, SelectField, TextAreaField } from '@/components/Form';
import { useCustomer } from '../api/getCustomer';
import { UpdateCustomerDTO, useUpdateCustomer } from '../api/updateCustomer';
import { Customer } from '../types';

const schema = z.object({
    first: z.string().min(1, 'Required'),
    last: z.string().min(1, 'Required'),
    phone: z.string(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.string()
    }),
    system: z.string(),
    notes: z.string(),
    duration: z.number(),
    unit: z.string(),
    status: z.string(),
});

type EditCustomerFormProps = {
  customerId: string;
};

const convertCustToForm = (customer: Customer | undefined) => {
    return {
        first: customer?.first || '',
        last: customer?.last || '',
        phone: customer?.phone || '',
        address: {
            street: customer?.address.street || '',
            city: customer?.address.city || '',
            state: customer?.address.state || '',
            zip: customer?.address.zip || ''
        },
        system: customer?.system || '',
        notes: customer?.notes || '',
        duration: customer?.serviceInterval.duration || 1,
        unit: customer?.serviceInterval.unit || 'years',
        status: customer?.status || 'active'
    };
}

export const EditCustomerForm = ({ customerId }: EditCustomerFormProps) => {
  const customer = useCustomer({customerId});
  const updateCustomerMutation = useUpdateCustomer();

  return (
      <Form<UpdateCustomerDTO['data'], typeof schema>
        onSubmit={async (values) => {
          await updateCustomerMutation.mutateAsync({data: values, customerId});
        }}
        options={{
            defaultValues: {
                first: '',
                last: '',
                phone: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                system: '',
                notes: '',
                duration: 0,
                unit: '',
                status: ''
            },
            values: convertCustToForm(customer.data)
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <div className="flex flex-row gap-3">
                <InputField label='First' placeholder="First" registration={register('first')} />
                <InputField label='Last' placeholder="Last" registration={register('last')} />
            </div>
            <InputField label='Phone' placeholder="Phone" registration={register('phone')} />
            <InputField label='Street' placeholder="Street" registration={register('address.street')} />
            <InputField label='City' placeholder="City" registration={register('address.city')} />
            
            <div className="flex flex-row gap-3">
                <InputField label='State' placeholder="State" registration={register('address.state')} />
                <InputField label='Zip' placeholder="Zip" registration={register('address.zip')} />
            </div>

            <InputField label='System' placeholder="System" registration={register('system')} />
            <TextAreaField label='Notes' placeholder="Notes" registration={register('notes')} />
            
            <div className="flex flex-row gap-3">
                <InputField label="Duration" type="number" placeholder="Duration" registration={register('duration')} />
                <SelectField label="unit" options={
                    [
                        {label: "years", value: "years"}, 
                        {label: "months", value: "months"},
                        {label: "weeks", value: "weeks"},
                        {label: "days", value: "days"}
                        ]} 
                    registration={register('unit')} 
                />
            </div>

            <SelectField label="unit" options={
                    [
                        {label: "active", value: "active"}, 
                        {label: "inactive", value: "inactive"}
                        ]} registration={register('status')} 
                />

            <div>
              <Button isLoading={updateCustomerMutation.isPending} type="submit" className="w-full">
                Update
              </Button>
            </div>
          </>
        )}
      </Form>
  );
};
