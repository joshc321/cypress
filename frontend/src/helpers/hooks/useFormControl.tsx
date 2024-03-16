import {ChangeEvent, useState} from "react";

type UseFormControlType<T> = [T, (prop: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void];

export function useFormControl<T>(initialValues: T): UseFormControlType<T> {
    const [formValues, setFormValues] = useState(initialValues);

    const handleFormChange = (prop: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if(e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            setFormValues({ ...formValues, [prop]: e.target.checked });
        }
        else {
            setFormValues({...formValues, [prop]: e.target.value});
        }
    }

    return [formValues, handleFormChange]
}