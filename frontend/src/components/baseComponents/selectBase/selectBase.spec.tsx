import { ChangeEventHandler } from "react";

export interface SelectBaseSpec {
    label: string;
    options: string[];
    value: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}