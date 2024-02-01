import React, {FormEventHandler} from "react";

export interface AuthLayoutSpec {
    onSubmit: FormEventHandler<HTMLFormElement>,
    formLabel: string,
    buttonText: string,
    footerText?: string | null,
    footerHref?: string | null,
    children: React.ReactNode
}