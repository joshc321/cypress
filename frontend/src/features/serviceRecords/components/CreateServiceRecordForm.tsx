'use client';

import  z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, TextAreaField, SelectField } from '@/components/Form';
import { CreateServiceRecordDTO, useCreateServiceRecord } from '../api/createServiceRecord';
import { ServiceRecord } from '../types';

const schema = z.object({
    date: z.date(),
    service: z.string(),
    notes: z.string(),
    bill: z.number(),
    serviceType: z.enum(['full', 'partial']),
});

type CreateServiceRecordFormProps = {
    customerId: string;
    onSuccess: (serviceRecord: ServiceRecord) => void;
};

export const CreateServiceRecordForm = ({ onSuccess, customerId }: CreateServiceRecordFormProps) => {
  const createServiceRecordMutation = useCreateServiceRecord({customerID: customerId});

  return (
      <Form<CreateServiceRecordDTO['data'], typeof schema>
        onSubmit={async (values) => {
          const res = await createServiceRecordMutation.mutateAsync({data: values, customerId: customerId});
            onSuccess(res);
        }}
        options={{
            defaultValues: {
                date: new Date().toISOString().slice(0, 16),
                service: '',
                notes: '',
                bill: 0,
                serviceType: 'full',
            },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField error={formState.errors['date']} label='Date' placeholder="Date" type="datetime-local" registration={register('date', {valueAsDate: true})} />
            <TextAreaField label='Service' placeholder="Service" registration={register('service')} />
            <TextAreaField label='Notes' placeholder="Notes" registration={register('notes')} />
            <InputField error={formState.errors['bill']} label='Bill' placeholder="Bill" type="number" registration={register('bill', {valueAsNumber: true})} />

            <SelectField label='Type' options={[{label: 'Full Service', value: 'full'}, {label: 'Partial Service', value: 'full'}]} registration={register('serviceType')} />

            <Button isLoading={createServiceRecordMutation.isPending} type="submit" className="w-full">
              Create
            </Button>
          </>
        )}
      </Form>
  );
};
