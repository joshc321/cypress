import React, {MouseEventHandler} from "react";

export interface IconButtonSpec {
    icon: React.ReactNode
    onClick: MouseEventHandler<HTMLButtonElement> | undefined
    className?: string
}