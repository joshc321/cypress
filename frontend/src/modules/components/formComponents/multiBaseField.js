import { TextField } from "@mui/material"

export default function MultiBaseField({label, value, handleChange})
{
    return(
        <TextField 
            label={label}
            fullWidth
            multiline
            value={value}
            onChange={handleChange}
        />
    )
}