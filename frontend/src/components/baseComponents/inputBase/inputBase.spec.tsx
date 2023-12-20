import {ChangeEventHandler} from "react";

export interface InputBaseSpec {
    className?: string,
    type?: string,
    id?: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    value: string | number,
    placeholder: string,
}