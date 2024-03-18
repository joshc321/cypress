'use client';

import  z from 'zod';

import { Button } from '@/components/Elements';
import { MdArrowForwardIos } from 'react-icons/md';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { CreateScheduledServiceDTO, useCreateScheduledService } from '../api/createScheduledService';
import { useCustomer } from '@/features/customers';
import { ScheduledService } from '../types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const schema = z.object({
    date: z.date(),
    service: z.string(),
    notes: z.string(),
    estimate: z.number(),
});

type CreateScheduledServiceFormProps = {
    customerId?: string;
    onSuccess: (scheduledService: ScheduledService) => void;
};

export const CreateScheduledServiceForm = ({ onSuccess, customerId }: CreateScheduledServiceFormProps) => {
  
  const router = useRouter();
  const customer = customerId ? useCustomer({customerId: customerId}) : {data: undefined, isLoading: false};
  const createScheduledServiceMutation = useCreateScheduledService();

  return (
      <Form<CreateScheduledServiceDTO['data'], typeof schema>
        onSubmit={async (values) => {
          if (!customerId) return;
          const res = await createScheduledServiceMutation.mutateAsync({data: values, customerId: customerId});
            onSuccess(res);
        }}
        options={{
            defaultValues: {
                date: new Date().toISOString().slice(0, 16),
                service: '',
                notes: '',
                estimate: 0,
            },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <div className='relative'>
                <InputField 
                  placeholder={customer.data?.first ? `${customer.data.first} ${customer.data.last}` : 'Select Customer'}
                  htmtInputProps={{
                    readOnly: true,
                    onClick: () => router.push('/?direct=/scheduled-service/create')
                  }}  
                  registration={{}} 
                  className = "hover:bg-secondary-light active:opacity-80 cursor-default"
                />
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pt-1.5 inline-flex items-center justify-center z-10'>
                <MdArrowForwardIos className='w-4 h-4 text-secondary' />
              </div>
            </div>
            <InputField error={formState.errors['date']} label='Date' placeholder="Date" type="datetime-local" registration={register('date', {valueAsDate: true})} />
            <TextAreaField label='Service' placeholder="Service" registration={register('service')} />
            <InputField error={formState.errors['estimate']} label='Estimate' placeholder="Estimate" type="number" registration={register('estimate', {valueAsNumber: true})} />
            <TextAreaField label='Notes' placeholder="Notes" registration={register('notes')} />


            <Button isLoading={createScheduledServiceMutation.isPending} type="submit" className="w-full">
              Create
            </Button>
          </>
        )}
      </Form>
  );
};
