import { TextField, Grid } from '@mui/material'

export default function AddressField({address, handleChange, error, required=true})
{
    return(
        <>
            <TextField 
                autoComplete="street-address"
                label="Address"
                fullWidth
                error={error}
                value={address.street}
                onChange={handleChange('street')}
                required={required}
            />
            <TextField 
                label="City"
                autoComplete="address-level2"
                fullWidth
                value={address.city}
                onChange={handleChange('city')}
            />
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <TextField 
                    label="State"
                    autoComplete="address-level1"
                    sx={{width: "49%"}}
                    value={address.state}
                    onChange={handleChange('state')}
                />
                <TextField 
                    label="Zip"
                    autoComplete="postal-code"
                    sx={{width: "49%"}}
                    value={address.zip}
                    onChange={handleChange('zip')}
                />
            </Grid>
        </>
    )
}