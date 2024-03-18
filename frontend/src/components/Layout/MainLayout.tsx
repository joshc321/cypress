'use client';

import React from "react";
import { NavBarComponent } from "@/components/Elements";

export const MainLayout = (
    {
        children, 
    }: {
        children: React.ReactNode
}) => {
    return (
        <main className="pb-20">
            {children}

            <NavBarComponent />
        </main>
    )
}
