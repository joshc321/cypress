import {ChangeEventHandler} from "react";

export interface SearchBarComponentSpec {
    onSubmit : () => void,
    value : string | number,
    onChange : ChangeEventHandler,
}