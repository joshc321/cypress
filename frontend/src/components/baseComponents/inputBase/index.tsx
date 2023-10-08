import {InputBaseSpec} from "@/components/baseComponents/inputBase/inputBase.spec";

export default function InputBase(
    {
        className,
        type,
        id,
        placeholder
    }: InputBaseSpec
){
    return (
        <input
            className={`w-full focus:outline-secondary-dark rounded-lg border-solid border border-secondary border-box p-3 ${className}`}
            type={type}
            id={id}
            placeholder={placeholder}
        />

    )
}