'use client';

import AuthFormLayout from "@/components/formGroups/authLayout";
import {ChangeEvent, FormEvent, useState} from "react";
import InputBase from "@/components/baseComponents/inputBase";
import {useFormControl} from "@/helpers/hooks/useFormControl";


export default function ForgotLayout() {

    const [formValues, handleFormChange] = useFormControl({
        email: '',
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
    }

    return (
        <AuthFormLayout
            onSubmit={handleSubmit}
            formLabel={"Forgot Password"}
            buttonText={"Send"}
            footerText={"Back to Login"}
            footerHref={"/login"}
        >
            <InputBase
                type="text"
                id="email"
                placeholder="email"
                value={formValues.email}
                onChange={handleFormChange('email')}
            />

        </AuthFormLayout>
    )
}