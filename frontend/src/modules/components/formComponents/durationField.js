import { Grid, TextField, MenuItem } from '@mui/material'

export default function DurationField({duration, handleChange})
{
    return(
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <TextField 
                label="Service Interval"
                type="number"
                InputProps={{
                    inputProps: { min: 1 }
                }}
                sx={{width: "49%"}}
                value={duration.duration}
                onChange={handleChange('duration')}
            />
            <TextField 
                label="unit"
                select
                sx={{ width: "49%"}}
                value={duration.unit}
                onChange={handleChange('unit')}
            >
                {units.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.value}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
    )
}

const units = [
    {
        value: 'years',
    },
    {
        value: 'months',
    },
    {
        value: 'weeks',
    },
    {
        value: 'days',
    }
]