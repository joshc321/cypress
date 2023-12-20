import React from "react";

export default function UserViewLayout({
    children, // will be a page or nested layout
    }: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}

            <h1>herro</h1>
        </main>
    )
}
