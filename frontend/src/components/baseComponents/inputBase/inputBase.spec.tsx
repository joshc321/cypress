import {ChangeEventHandler} from "react";

export interface InputBaseSpec {
    className?: string,
    type?: string,
    id?: string,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    value: string | number,
    placeholder: string,
    multiline?: boolean,
    maxRows?: number,
}