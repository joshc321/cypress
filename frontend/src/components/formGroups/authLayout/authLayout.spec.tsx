import React, {FormEventHandler} from "react";

export interface AuthLayoutSpec {
    onSubmit: FormEventHandler<HTMLFormElement>,
    formLabel: string,
    primaryText?: string,
    buttonText: string,
    children: React.ReactNode
}