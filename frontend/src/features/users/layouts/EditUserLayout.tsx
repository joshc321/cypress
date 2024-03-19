'use client';

import { FormSpacing } from "@/components/Form"
import { EditUserForm } from "../components/EditUserForm";
import { useRouter, useSearchParams } from "next/navigation";
import { IconButton } from "@/components/Elements";
import { MdArrowBack } from "react-icons/md";
import { AuthUser } from "@/features/auth";
import { useUser } from "@/lib/auth";
import React from "react";


export const EditUserLayout = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useUser();
    const [userId, setUserId] = React.useState<string | null>(searchParams.get('id'));

    const onSuccess = (user: AuthUser) => {
        console.log('created user', user.id);
    }

    return (
        <FormSpacing className="pt-14">
            <IconButton onClick={() => router.back()}>
                <MdArrowBack className="w-6 h-6" /> 
            </IconButton>
            <h1 className="text-xl font-semibold pb-5">Edit Account</h1>
            {
                userId &&
                <EditUserForm onSuccess={onSuccess} authLevel={user.data?.role} userId={userId} />
            
            }
        </FormSpacing>
    )
}