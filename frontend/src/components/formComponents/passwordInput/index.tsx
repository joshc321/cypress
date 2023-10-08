'use client';

import IconButton from "@/components/baseComponents/iconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import InputAdornment from "@/components/baseComponents/inputAdornment";
import {useState} from "react";

export default function PasswordInput(
    {

    }: PasswordInputSpec
) {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <InputAdornment
            htmlFor="password"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="password"
            adornmentElement={
                <IconButton
                    icon={showPassword ?  <MdVisibilityOff className="h-6 w-6" /> : <MdVisibility className="h-6 w-6"/>}
                    onClick={() => setShowPassword(!showPassword)}
                />
            }
        />
    )
}