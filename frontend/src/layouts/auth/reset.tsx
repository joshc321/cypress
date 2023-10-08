'use client';

import AuthFormLayout from "@/components/formGroups/authLayout";
import {FormEvent} from "react";
import InputBase from "@/components/baseComponents/inputBase";
import PasswordInput from "@/components/formComponents/passwordInput";


export default function ResetLayout() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
    }

    return (
        <AuthFormLayout
            onSubmit={handleSubmit}
            formLabel={"Reset Password"}
            buttonText={"Reset"}
        >
            <PasswordInput />

        </AuthFormLayout>
    )
}