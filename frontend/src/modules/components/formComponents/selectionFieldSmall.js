import { TextField, MenuItem } from "@mui/material"

export default function SelectionFieldSmall({label, value, handleChange, options})
{
    return(
        <TextField
            size='small'
            label={label}
            select
            value={value}
            onChange={handleChange}
            sx={{
                '& .MuiSelect-select': {
                    padding: '3px 10px',
                    fontSize: '0.8rem'
                  },
            }}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.text}
                </MenuItem>
            ))}
        </TextField>
    )
}