'use client';

import Link from "next/link";
import {FormEvent} from "react";
import AuthFormLayout from "@/components/formGroups/authLayout";
import InputBase from "@/components/baseComponents/inputBase";
import PasswordInput from "@/components/formComponents/passwordInput";
import { useRouter } from "next/navigation";
import {useFormControl} from "@/helpers/hooks/useFormControl";


export default function LoginLayout() {

    const router = useRouter();
    const [formValues, handleFormChange] = useFormControl({
        email: '',
        password: '',
        checked: false,
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            email: formValues.email,
            password: formValues.password,
            rememberMe: formValues.checked
        };
        console.log(data);

        if(data.email.length > 5) {
            router.push("/");
        }
    }

    return (
        <AuthFormLayout onSubmit={handleSubmit} formLabel={"Login"} buttonText={"Login"}>
            <InputBase type="text" id="email" placeholder="email" value={formValues.email} onChange={handleFormChange("email")} />
            <PasswordInput value={formValues.password}  onChange={handleFormChange("password")} />
            <div className="flex flex-row justify-between">
                <div className="flex gap-1 items-center">
                    <input
                        className="accent-primary-dark rounded w-4 h-4"
                        type="checkbox" id="remember_me"
                        checked={formValues.checked}
                        onChange={handleFormChange("checked")}
                    />
                    <label className="text-sm font-light text-secondary-dark" htmlFor="remember_me">Remember Me</label>
                </div>
                <Link className="text-base font-normal text-secondary-dark" href="/forgot">Forgot Password?</Link>
            </div>
        </AuthFormLayout>
    )
}