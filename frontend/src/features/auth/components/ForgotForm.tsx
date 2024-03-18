'use client';

import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useForgotPassword } from '../api/forgotPassword'

const schema = z.object({
  email: z.string().min(1, 'Required'),
});

type ForgotValues = {
  email: string;
};

type ForgotFormProps = {
  onSuccess: () => void;
};

export const ForgotForm = ({ onSuccess }: ForgotFormProps) => {
  const forgotPasswordMutation = useForgotPassword({});

  return (
      <Form<ForgotValues, typeof schema>
        onSubmit={async (values) => {
          await forgotPasswordMutation.mutateAsync({
            data: {
                email: values.email
            }
          });
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            
            <div>
              <Button isLoading={forgotPasswordMutation.isPending} type="submit" className="w-full">
                Log in
              </Button>
            </div>
            <Link className="text-center hover:underline" href="/login">{"Back to Login"}</Link>
          </>
        )}
        
      </Form>
  );
};
