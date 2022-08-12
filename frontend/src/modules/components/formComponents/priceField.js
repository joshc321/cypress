import { TextField, InputAdornment } from "@mui/material"

export default function PriceField({value, handleChange, label="Estimate"})
{
    return(
        <TextField 
            type="number"
            label={label}
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    $
                    </InputAdornment>  
                ),
            }}
            value={value}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
        />
    )
}