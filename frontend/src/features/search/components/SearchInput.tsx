'use client';
import { IconButton } from "@/components/Elements/Button";
import { MdSearch } from "react-icons/md";
import { InputField, InputFieldProps } from "@/components/Form";

type SearchInputProps = InputFieldProps & {
}

export const SearchInput = (props : SearchInputProps) => {
    return (
        <InputField
            className="bg-gray-light border-0 rounded-3xl"
            type="text"
            placeholder="Search"
            startAdornment={
                <IconButton
                    type="submit"
                >
                    <MdSearch className="w-6 h-6" />
                </IconButton>
            }
            {...props}
        />
    )
}