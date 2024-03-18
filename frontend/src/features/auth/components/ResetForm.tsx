'use client';

import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useResetPassword } from '../api/resetpassword'
import { PasswordField } from './PasswordField';


const schema = z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
});

type ResetValues = {
    email: string;
    password: string;
};

type ResetFormProps = {
    onSuccess: () => void;
};

export const ResetForm = ({ onSuccess }: ResetFormProps) => {
  const resetPasswordMutation = useResetPassword({});

  return (
      <Form<ResetValues, typeof schema>
        onSubmit={async (values) => {
          await resetPasswordMutation.mutateAsync({
            data: {
                email: values.email,
                password: values.password
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
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <PasswordField
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            
            <div>
              <Button isLoading={resetPasswordMutation.isPending} type="submit" className="w-full">
                Log in
              </Button>
            </div>
            <Link className="text-center hover:underline" href="/login">{"Back to Login"}</Link>
          </>
        )}
      </Form>
  );
};
