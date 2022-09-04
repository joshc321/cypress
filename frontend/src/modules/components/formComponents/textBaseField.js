import { TextField } from "@mui/material";

export default function TextBaseField({label, value, handleChange, disabled=false})
{
    return(
        <TextField 
            label={label}
            fullWidth
            type="text"
            value={value}
            onChange={handleChange}
            disabled={disabled}

            InputLabelProps={{
                shrink: disabled,
                }}
        />
    )
}