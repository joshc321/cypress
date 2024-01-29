import React from "react";
import NavBarComponent from "@/components/functionalComponents/navBarComponent";

export default function UserViewLayout({
    children, // will be a page or nested layout
    }: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}

            <NavBarComponent />
        </main>
    )
}
