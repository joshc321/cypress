'use client';

import { IconButton, Button } from "@/components/Elements/Button";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import { InputField, SelectField, TextAreaField, CheckBoxField, Form } from "@/components/Form";
import { z } from "zod";
import { Input } from "postcss";

const schema = z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
    remember_me: z.boolean(),
    chosen: z.enum(['one', 'two', 'three']),
    datetime_choice: z.string().optional(),
    searchString: z.string().optional()
});
type LoginValues = {
    email: string;
    password: string;
    remember_me: boolean;
    chosen: 'one' | 'two' | 'three';
    datetime_choice: Date;
    searchString: string;
};


  
export default function Page() {
    return (
        <main className="p-3 space-y-3">
            <h1>upcoming</h1>
            <Form<LoginValues, typeof schema>
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                    schema={schema}
                    options={
                        {
                            defaultValues: {
                                searchString: 'what up'
                            }
                        }
                    }
                >
                    {({ register, formState }) => (
                    <>
                        <InputField
                        type="email"
                        label="Email Address"
                        error={formState.errors['email']}
                        registration={register('email')}
                        />
                        <InputField
                        type="password"
                        label="Password"
                        error={formState.errors['password']}
                        registration={register('password')}
                        endAdornment={
                            <IconButton
                            type="button"
                            onClick={() => {
                                console.log('clicked');
                            }}
                            >
                            <MdVisibility className="w-6 h-6" />
                            </IconButton>
                        }
                        />
                        <SelectField
                        label="Choose"
                        registration={register('chosen')}
                        error={formState.errors['chosen']}
                        options={[{label: "One", value: "one"}, {label: "Two", value: "two"}, {label: "Three", value: "three"}]}
                        />
                        <InputField
                            type="datetime-local"
                            label="Choose a date"
                            registration={register('datetime_choice')}
                            error={formState.errors['datetime_choice']}
                        />
                        <InputField
                            type="text"
                            registration={register('searchString')}
                            error={formState.errors['searchString']}
                            placeholder="Search"
                            className="border-none bg-gray-100"
                            endAdornment={
                                <IconButton
                                    type="button"
                                    onClick={() => {
                                        console.log('clicked');
                                    }}
                                >
                                    <MdVisibility className="w-6 h-6" />
                                </IconButton>
                            }
                            />
                        <InputField
                            type="text"
                            registration={register('searchString')}
                            error={formState.errors['searchString']}
                            placeholder="Search"
                            className="border-none bg-gray-100"
                            startAdornment={
                                <IconButton
                                    type="button"
                                    onClick={() => {
                                        console.log('clicked');
                                    }}
                                >
                                    <MdVisibility className="w-6 h-6" />
                                </IconButton>
                            }
                        />
                        <CheckBoxField
                        label="Remember me"
                        registration={register('remember_me')}
                        />
                        <div>
                        <Button isLoading={false} type="submit" className="w-full">
                            Log in
                        </Button>
                        </div>
                    </>
                    )}
                </Form>
        </main>
    )
}