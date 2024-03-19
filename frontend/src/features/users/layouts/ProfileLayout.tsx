'use client';

import { UserProfile } from "../components/UserProfile";
import { useUser } from "@/lib/auth";

export const ProfileLayout = () => {
    
    const user = useUser();

    return (
        <UserProfile user={user.data || undefined} />
    )
}