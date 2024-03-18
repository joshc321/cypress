'use client';

import Link from 'next/link';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, CheckBoxField } from '@/components/Form';
import { useLogin } from '@/lib/auth';
import { PasswordField } from './PasswordField';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin();

  return (
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          await login.mutate(values);
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
            <PasswordField
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div className="flex flex-row justify-between">
                <CheckBoxField
                    label="Remember Me"
                    registration={{}}
                />
                <Link className="text-base font-normal text-secondary-dark hover:underline" href="/forgot">Forgot Password?</Link>
            </div>
            <div>
              <Button isLoading={login.isPending} type="submit" className="w-full">
                Log in
              </Button>
            </div>
            <Link className="text-center hover:underline" href="https://joshcordero.com">{"Need An Account?"}</Link>
          </>
        )}
      </Form>
  );
};
