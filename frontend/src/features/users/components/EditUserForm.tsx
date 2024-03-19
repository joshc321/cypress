'use client';

import  z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField, SelectField } from '@/components/Form';
import { PasswordField } from '@/features/auth';
import { UpdateUserDTO, useUpdateUser } from '../api/updateUser';
import { useOtherUser } from '../api/getUser';
import { AuthUser } from '@/features/auth';
import { ROLES } from '@/lib/authorization'

const schema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    first: z.string(),
    last: z.string(),
    role: z.enum(['ADMIN', 'USER']),
});

type EditUserFormProps = {
    authLevel?: string;
    userId: string;
    onSuccess: (user: AuthUser) => void;
};

export const EditUserForm = ({ onSuccess,  authLevel, userId}: EditUserFormProps) => {
  const editUserMutation = useUpdateUser();

  const user = useOtherUser({userId: userId});

  return (
      <Form<UpdateUserDTO['data'], typeof schema>
        onSubmit={async (values) => {
          const res = await editUserMutation.mutateAsync({data: values, userId: userId});
            onSuccess(res);
        }}
        options={{
            defaultValues: {
                role: ROLES.USER,
            },
            values: user.data
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <div className="flex flex-row gap-3">
                <InputField error={formState.errors['email']} label='First' placeholder="First" registration={register('first')} />
                <InputField error={formState.errors['email']} label='Last' placeholder="Last" registration={register('last')} />
            </div>
            <InputField error={formState.errors['email']} label='Email' placeholder="Email" type="email" registration={register('email')} />

            { authLevel === ROLES.ADMIN &&
            <SelectField error={formState.errors['role']} label='Role' options={[{label: 'Admin', value: ROLES.ADMIN}, {label: 'User', value: ROLES.USER}]} registration={register('role')} />
            }
            <Button isLoading={editUserMutation.isPending} type="submit" className="w-full">
              Update
            </Button>
          </>
        )}
      </Form>
  );
};
