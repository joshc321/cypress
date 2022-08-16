import { TextField } from "@mui/material"

export default function EmailField({value, error, handleChange, required=true})
{
    return(
        <TextField 
            type="text"
            label="Email"
            autoComplete="email"
            fullWidth
            error={error}
            value={value}
            onChange={handleChange}
            required={required}
        />
    )
}

