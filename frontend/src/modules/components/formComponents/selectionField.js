import { TextField, MenuItem } from "@mui/material"

export default function SelectionField({label, value, handleChange, options})
{
    return(
        <TextField 
            label={label}
            select
            fullWidth
            value={value}
            onChange={handleChange}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.text}
                </MenuItem>
            ))}
        </TextField>
    )
}