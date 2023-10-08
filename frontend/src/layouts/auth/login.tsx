'use client';

import Link from "next/link";
import {FormEvent} from "react";
import AuthFormLayout from "@/components/formGroups/authLayout";
import InputBase from "@/components/baseComponents/inputBase";
import PasswordInput from "@/components/formComponents/passwordInput";


export default function LoginLayout() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            rememberMe: e.currentTarget.remember_me.checked
        };
        console.log(data);
    }

    return (
        <AuthFormLayout onSubmit={handleSubmit} formLabel={"Login"} buttonText={"Login"}>
            <InputBase type="text" id="email" placeholder="email" />
            <PasswordInput />
            <div className="flex flex-row justify-between">
                <div className="flex gap-1 items-center">
                    <input className="accent-primary-dark rounded w-4 h-4" type="checkbox" id="remember_me"/>
                    <label className="text-sm font-light text-secondary-dark" htmlFor="remember_me">Remember Me</label>
                </div>
                <Link className="text-base font-normal text-secondary-dark" href="/forgot">Forgot Password?</Link>
            </div>
        </AuthFormLayout>
    )
}