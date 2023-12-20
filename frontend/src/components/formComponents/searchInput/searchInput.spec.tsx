import {ChangeEventHandler, EventHandler, MouseEventHandler} from "react";

export interface SearchInputSpec {
    handleSearch: EventHandler<any>,
    onChange: ChangeEventHandler,
    value: string | number,
}