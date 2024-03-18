'use client';

import clsx from 'clsx';
import { IconButton } from "@/components/Elements/Button";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import { InputField  } from "@/components/Form"
import {useState} from "react";
import { FieldWrapperPassThroughProps } from "@/components/Form/FieldWrapper";
import { UseFormRegisterReturn } from 'react-hook-form';


type PasswordFieldFieldProps = FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
    placeholder?: string;
  };

export const  PasswordField = (props: PasswordFieldFieldProps) => {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <InputField
            type={showPassword ? "text" : "password"}
            {...props}
            endAdornment={
                <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ?  <MdVisibilityOff className="h-6 w-6" /> : <MdVisibility className="h-6 w-6"/>}
                </IconButton>
            }
        />
    )
}