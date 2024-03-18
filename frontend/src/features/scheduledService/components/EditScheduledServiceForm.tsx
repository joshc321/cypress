'use client';

import  z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { UpdateScheduledServiceDTO, useUpdateScheduledService } from '../api/updateScheduledService';
import { useScheduledService } from '../api/getScheduledService';
import { ScheduledService } from '../types';

const schema = z.object({
    date: z.date(),
    service: z.string().optional(),
    notes: z.string().optional(),
    estimate: z.number(),
});

type EditScheduledServiceFormProps = {
    serviceId: string;
    onSuccess: (scheduledService: ScheduledService) => void;
};

export const EditScheduledServiceForm = ({ onSuccess, serviceId }: EditScheduledServiceFormProps) => {
    
        const ScheduledService = useScheduledService({serviceId});
        const createScheduledServiceMutation = useUpdateScheduledService();

  return (
      <Form<UpdateScheduledServiceDTO['data'], typeof schema>
        onSubmit={async (values) => {
          const res = await createScheduledServiceMutation.mutateAsync({data: values, serviceId: serviceId});
            onSuccess(res);
        }}
        options={{
            defaultValues: {
                date: '',
                service: '',
                notes: '',
                estimate: 0,
            },
            values: ScheduledService.data
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField error={formState.errors['date']} label='Date' placeholder="Date" type="datetime-local" registration={register('date', {valueAsDate: true})} />
            <TextAreaField error={formState.errors['service']} label='Service' placeholder="Service" registration={register('service')} />
            <InputField error={formState.errors['estimate']} label='Bill' placeholder="Bill" type="number" registration={register('estimate', {valueAsNumber: true})} />
            <TextAreaField error={formState.errors['notes']} label='Notes' placeholder="Notes" registration={register('notes')} />

            <Button isLoading={createScheduledServiceMutation.isPending} type="submit" className="w-full">
              Update
            </Button>
          </>
        )}
      </Form>
  );
};
