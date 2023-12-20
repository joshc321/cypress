'use client';
import { PasswordInputSpec } from "@/components/formComponents/passwordInput/passwordInput.spec";
import IconButton from "@/components/baseComponents/iconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import InputAdornment from "@/components/baseComponents/inputAdornment";
import {useState} from "react";

export default function PasswordInput(
    {
        onChange,
        value,
    }: PasswordInputSpec
) {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <InputAdornment
            htmlFor="password"
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={onChange}
            value={value}
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