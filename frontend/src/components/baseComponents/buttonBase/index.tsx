import {ButtonBaseSpec} from "@/components/baseComponents/buttonBase/buttonBase.spec";

export default function ButtonBase(
    {
        type = "button",
        className,
        onClick,
        children
    }: ButtonBaseSpec) {
    return(
        <button
            type={type}
            onClick={onClick}
            className={`${className}`}
        >
            {children}
        </button>
    )
}