import {ChangeEventHandler} from "react";

export interface DualAdornmentInputSpec {
    htmlFor?: string,
    type: string,
    id: string,
    onChange: ChangeEventHandler,
    value: string | number,
    leftAdornmentElement: React.ReactNode,
    rightAdornmentElement: React.ReactNode,
    className?: string,
    placeholder: string,
}