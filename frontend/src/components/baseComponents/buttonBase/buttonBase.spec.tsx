import React, {MouseEventHandler} from "react";

export interface ButtonBaseSpec {
    type?: "button" | "reset" | "submit" | undefined,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children?: React.ReactNode
}