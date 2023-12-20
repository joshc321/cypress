'use client';

import AuthFormLayout from "@/components/formGroups/authLayout";
import {ChangeEvent, FormEvent, useState} from "react";
import InputBase from "@/components/baseComponents/inputBase";
import PasswordInput from "@/components/formComponents/passwordInput";
import {useFormControl} from "@/helpers/hooks/useFormControl";


export default function ResetLayout() {

    const [formValues, handleFormChange] = useFormControl({
        password: '',
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
    }

    return (
        <AuthFormLayout
            onSubmit={handleSubmit}
            formLabel={"Reset Password"}
            buttonText={"Reset"}
            footerText={"Back to Login"}
            footerHref={"/login"}
        >
            <PasswordInput
                onChange={handleFormChange('password')}
                value={formValues.password}
            />

        </AuthFormLayout>
    )
}