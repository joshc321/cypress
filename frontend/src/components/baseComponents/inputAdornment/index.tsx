import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import InputBase from "@/components/baseComponents/inputBase";
import {InputAdornmentSpec} from "@/components/baseComponents/inputAdornment/inputAdornment.spec";

export default function InputAdornment(
    {
        htmlFor,
        type,
        id,
        placeholder,
        adornmentElement,
        className,
    }: InputAdornmentSpec) {
    return (
        <label htmlFor={htmlFor} className="flex relative">
            <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center"
            >
                {adornmentElement}
            </div>
            <InputBase
                className={`pr-11 ${className} `}
                type={type}
                id={id}
                placeholder={placeholder}
            />
        </label>
    )
}