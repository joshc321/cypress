'use client';

import  z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, TextAreaField, SelectField } from '@/components/Form';
import { UpdateServiceRecordDTO, useUpdateServiceRecord } from '../api/updateServiceRecord';
import { useServiceRecord } from '../api/getServiceRecord';
import { ServiceRecord } from '../types';

const schema = z.object({
    date: z.date(),
    service: z.string().optional(),
    notes: z.string().optional(),
    bill: z.number(),
});

type EditServiceRecordFormProps = {
    serviceId: string;
    onSuccess: (serviceRecord: ServiceRecord) => void;
};

export const EditServiceRecordForm = ({ onSuccess, serviceId }: EditServiceRecordFormProps) => {
    
        const serviceRecord = useServiceRecord({serviceId});
        const createServiceRecordMutation = useUpdateServiceRecord();

  return (
      <Form<UpdateServiceRecordDTO['data'], typeof schema>
        onSubmit={async (values) => {
          const res = await createServiceRecordMutation.mutateAsync({data: values, serviceId: serviceId});
            onSuccess(res);
        }}
        options={{
            defaultValues: {
                date: '',
                service: '',
                notes: '',
                bill: 0,
            },
            values: serviceRecord.data
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField error={formState.errors['date']} label='Date' placeholder="Date" type="datetime-local" registration={register('date', {valueAsDate: true})} />
            <TextAreaField error={formState.errors['service']} label='Service' placeholder="Service" registration={register('service')} />
            <TextAreaField error={formState.errors['notes']} label='Notes' placeholder="Notes" registration={register('notes')} />
            <InputField error={formState.errors['bill']} label='Bill' placeholder="Bill" type="number" registration={register('bill', {valueAsNumber: true})} />

            <Button isLoading={createServiceRecordMutation.isPending} type="submit" className="w-full">
              Update
            </Button>
          </>
        )}
      </Form>
  );
};
