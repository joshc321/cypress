import {ChangeEventHandler} from "react";

export interface InputAdornmentSpec {
    htmlFor?: string,
    type: string,
    id: string,
    onChange: ChangeEventHandler,
    value: string | number,
    adornmentElement: React.ReactNode,
    className?: string,
    placeholder: string,
}