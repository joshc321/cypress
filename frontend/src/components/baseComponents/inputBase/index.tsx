import {InputBaseSpec} from "@/components/baseComponents/inputBase/inputBase.spec";
import React from "react";

/**
 * InputBase is a base component for input fields
 * @param className - string - custom class for the input
 * @param type - string - type of input
 * @param id - string - id of the input
 * @param onChange - function - function to be called when input changes
 * @param value - string | number - value of the input
 * @param placeholder - string - placeholder for the input
 * @param multiline - boolean - if the input is a textarea
 * @param maxRows - number - maximum rows for the textarea
 * @returns - JSX.Element - returns a JSX element
 */
export default function InputBase(
    {
        className,
        type,
        id,
        onChange,
        value,
        placeholder,
        multiline=false,
        maxRows=5,
        label,
    }: InputBaseSpec
){

    if(multiline === false) {
        return (
            // add a label to the input field that is placed at the top of the input field and is moved to the top when the input is focused or has a value
                <div className="w-full relative">
                    {
                        label &&
                        <label htmlFor={label} className="absolute top-0 left-0 translate-x-3 -translate-y-2.5 px-2 bg-white text-sm">{label}</label>
                    }

                    <input
                        className={`w-full focus:outline-secondary-dark rounded-lg border-solid border border-secondary border-box p-3 ${className}`}
                        type={type}
                        id={id}
                        onChange={onChange}
                        value={value}
                        placeholder={placeholder}
                    />
                </div>
    
        )
    }
    else {

        const [rows, setRows] = React.useState(1);

        const multirow_onchange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            // check if event is a newline entered
            const event_type: string = (event.nativeEvent as any).inputType;
            const new_value : string = event.target.value;
            if(event_type === 'insertLineBreak' || event_type === 'deleteContentBackward' || event_type === 'historyUndo' || event_type === 'historyRedo' || event_type === 'insertFromPaste') {
                setRows( Math.min(Math.max(typeof new_value === 'string' ? new_value.split('\n').length : 1, 1), maxRows));
            }
            onChange(event);
        }

        return (
            <textarea
                className={`w-full focus:outline-secondary-dark rounded-lg border-solid border border-secondary border-box p-3 ${className}`}
                id={id}
                onChange={multirow_onchange}
                value={value}
                placeholder={placeholder}
                rows={rows}
            />
        )
    }
    
}