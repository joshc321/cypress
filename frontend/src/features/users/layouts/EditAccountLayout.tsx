'use client';

import { FormSpacing } from "@/components/Form"
import { EditUserForm } from "../components/EditUserForm";
import { useRouter } from "next/navigation";
import { IconButton } from "@/components/Elements";
import { MdArrowBack } from "react-icons/md";
import { AuthUser } from "@/features/auth";
import { useUser } from "@/lib/auth";


export const EditAccountLayout = () => {

    const router = useRouter();
    const user = useUser();

    const onSuccess = (user: AuthUser) => {
        console.log('created user', user.id);
    }

    return (
        <FormSpacing className="pt-14">
            <IconButton onClick={() => router.back()}>
                <MdArrowBack className="w-6 h-6" /> 
            </IconButton>
            <h1 className="text-xl font-semibold pb-5">Edit Account</h1>
            
            <EditUserForm onSuccess={onSuccess} authLevel={user.data?.role} userId={user.data?.id || ''} />
                
        </FormSpacing>
    )
}