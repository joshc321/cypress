import { FormEventHandler } from "react";


export interface BaseFormLayoutSpec {
    onSubmit: FormEventHandler<HTMLFormElement>,
    formLabel: string,
    primaryText?: string,
    buttonText: string,
    footerText?: string | null,
    footerHref?: string | null,
    children: React.ReactNode
}
