import { Box, Stack, Typography, FormControlLabel, Checkbox } from '@mui/material'

function SimpleFormTopper({text, label, checked, setChecked})
{
    return(
        <Box sx={{ pt: 1}}>
            {label ?
            <Stack direction={'row'} alignItems='center' justifyContent={'space-between'}>
            <Typography fontWeight="fontWeightSemibold" variant="h6">{text}</Typography>
            <FormControlLabel labelPlacement="start" control={
                <Checkbox 
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    color="primary"
                />
                } 
                label={<Typography fontWeight="fontWeightThin" variant="body2">{label}</Typography>} 
            />
            </Stack>
            : 
            <Typography fontWeight="fontWeightSemibold" variant="h6">{text}</Typography>
            }
        </Box>
    )
}

export default SimpleFormTopper;