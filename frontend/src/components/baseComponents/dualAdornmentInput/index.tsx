import {DualAdornmentInputSpec} from "@/components/baseComponents/dualAdornmentInput/dualAdornmentInput.spec";
import InputBase from "@/components/baseComponents/inputBase";

export default function DualAdornmentInput(
    {
        htmlFor,
        type,
        id,
        onChange,
        value,
        leftAdornmentElement,
        rightAdornmentElement,
        className,
        placeholder
    }: DualAdornmentInputSpec) {
    return (
        <label htmlFor={htmlFor} className="flex relative">
            <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center"
            >
                {rightAdornmentElement}
            </div>
            <div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center"
            >
                {leftAdornmentElement}
            </div>
            <InputBase
                className={`px-11 ${className} `}
                type={type}
                id={id}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
        </label>
    )
}