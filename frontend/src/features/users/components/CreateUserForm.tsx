'use client';

import  z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, SelectField } from '@/components/Form';
import { PasswordField } from '@/features/auth';
import { CreateUserDTO, useCreateUser } from '../api/createUser';
import { AuthUser } from '@/features/auth';
import { ROLES } from '@/lib/authorization'

const schema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    first: z.string(),
    last: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['ADMIN', 'USER']),
});

type CreateUserFormProps = {
    authLevel?: string;
    onSuccess: (user: AuthUser) => void;
};

export const CreateUserForm = ({ onSuccess,  authLevel}: CreateUserFormProps) => {
  const createUserMutation = useCreateUser();

  return (
      <Form<CreateUserDTO['data'], typeof schema>
        onSubmit={async (values) => {
          const res = await createUserMutation.mutateAsync({data: values});
            onSuccess(res);
        }}
        options={{
            defaultValues: {
                role: ROLES.USER,
            },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <div className="flex flex-row gap-3">
                <InputField error={formState.errors['first']} label='First' placeholder="First" registration={register('first')} />
                <InputField error={formState.errors['last']} label='Last' placeholder="Last" registration={register('last')} />
            </div>
            <InputField error={formState.errors['email']} label='Email' placeholder="Email" type="email" registration={register('email')} />

            { authLevel === ROLES.ADMIN &&
            <SelectField error={formState.errors['role']} label='Role' options={[{label: 'Admin', value: ROLES.ADMIN}, {label: 'User', value: ROLES.USER}]} registration={register('role')} />
            }
            <PasswordField error={formState.errors['password']} label="Password" placeholder='Password' registration={register('password')} />
            <Button isLoading={createUserMutation.isPending} type="submit" className="w-full">
              Create
            </Button>
          </>
        )}
      </Form>
  );
};
