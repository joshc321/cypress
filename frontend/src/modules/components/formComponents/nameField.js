import { Grid, TextField } from '@mui/material'

export default function NameField({first, last, handleChange, error, required=true})
{
    return(
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <TextField 
                label="First"
                autoComplete="given-name"
                sx={{width: "49%"}}
                error={error}
                value={first}
                onChange={handleChange('first')}
                required={required}
            />
            <TextField 
                label="Last"
                autoComplete="family-name"
                sx={{width: "49%"}}
                error={error}
                value={last}
                onChange={handleChange('last')}
                required={required}
            />
        </Grid>
    )
}