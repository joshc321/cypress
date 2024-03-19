'use client';

import { UserProfile } from "../components/UserProfile";
import { useOtherUser } from "../api/getUser";
import { useSearchParams } from "next/navigation";

export const UserAccountLayout = () => {
    const searchParams = useSearchParams();
    
    const otherUser = useOtherUser({userId: searchParams.get('id') || ''});

    return (
        <UserProfile user={otherUser.data} />
    )
}