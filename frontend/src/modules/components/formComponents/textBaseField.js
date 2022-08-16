import { TextField } from "@mui/material";

export default function TextBaseField({label, value, handleChange})
{
    return(
        <TextField 
            label={label}
            fullWidth
            type="text"
            value={value}
            onChange={handleChange}
        />
    )
}