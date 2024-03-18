'use client';

import  z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { CreateCustomerDTO, useCreateCustomer } from '../api/createCustomer';
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
    notes: z.string()
});

type CreateCustomerFormProps = {
    onSuccess: (customer: Customer) => void;
};

export const CreateCustomerForm = ({ onSuccess }: CreateCustomerFormProps) => {
  const createCustomerMutation = useCreateCustomer();

  return (
      <Form<CreateCustomerDTO['data'], typeof schema>
        onSubmit={async (values) => {
          const res = await createCustomerMutation.mutateAsync({data: values});
            onSuccess(res);
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
              notes: ''
          }
      }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <div className="flex flex-row gap-3">
                <InputField error={formState.errors['first']} label='First' placeholder="First" registration={register('first')} />
                <InputField error={formState.errors['last']} label='Last' placeholder="Last" registration={register('last')} />
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

            <Button isLoading={createCustomerMutation.isPending} type="submit" className="w-full">
              Create
            </Button>
          </>
        )}
      </Form>
  );
};
