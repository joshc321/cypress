import { TextField } from "@mui/material"

export default function PhoneField({phone, handleChange, error, required=true})
{
    return(
        <TextField 
            type="phone"
            label="Phone"
            autoComplete="tel-national"
            fullWidth
            error={error}
            value={phone}
            onChange={handleChange('phone')}
            required={required}
        />
    )
}