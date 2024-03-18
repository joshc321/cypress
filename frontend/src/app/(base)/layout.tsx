import React from "react";
import { MainLayout } from "@/components/Layout";

export default function UserViewLayout({
    children, // will be a page or nested layout
    }: {
    children: React.ReactNode
}) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}
