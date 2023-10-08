'use client';

import AuthFormLayout from "@/components/formGroups/authLayout";
import {FormEvent} from "react";
import InputBase from "@/components/baseComponents/inputBase";


export default function ForgotLayout() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
    }

    return (
        <AuthFormLayout
            onSubmit={handleSubmit}
            formLabel={"Forgot Password"}
            buttonText={"Send"}
        >
            <InputBase
                type="text"
                id="email"
                placeholder="email"
            />

        </AuthFormLayout>
    )
}