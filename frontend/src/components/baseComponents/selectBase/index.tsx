import { SelectBaseSpec } from "@/components/baseComponents/selectBase/selectBase.spec";


export default function SelectBase (
    {
        label,
        options,
        value,
        onChange
    } : SelectBaseSpec
) {
    return (
        <div className="relative w-full">
            <label htmlFor={label} className="absolute top-0 left-0 translate-x-3 -translate-y-2.5 px-2 bg-white text-sm">{label}</label>
            <select
                id={label}
                value={value}
                onChange={onChange}
                className="w-full focus:outline-secondary-dark rounded-lg border-solid border border-secondary border-box p-3 h-full"
            >
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option}>{option}</option>
                    )
                })}
            </select>
        </div>
    )
}