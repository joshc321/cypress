import { TextField } from "@mui/material";

export default function SimpleTextField({label, value, handleChange, error})
{
    return(
        <TextField 
            label={label}
            fullWidth
            type="text"
            value={value}
            onChange={handleChange}
            error={error}
        />
    )
}