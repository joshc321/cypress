import {ChangeEventHandler} from "react";

export interface PasswordInputSpec {
    onChange: ChangeEventHandler,
    value: string | number,
}