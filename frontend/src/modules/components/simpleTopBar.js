import { Box, IconButton, Typography } from '@mui/material'
import { ArrowBackIosNew } from '@mui/icons-material'
import { Link } from "react-router-dom";

function SimpleTopBar({to, text})
{
    return(
        <>
            <Box sx={{ml: 0, mt:0}}>
                <IconButton
                    aria-label="back button"
                    component={Link}
                    to={to}
                    edge="end"
                    >
                    {<ArrowBackIosNew/>}
                </IconButton>
            </Box>
            <Box sx={{ml: 2, mt: 2}}>
                <Typography fontWeight="fontWeightBold" variant="h4">{text}</Typography>
            </Box>
        </>
    )
}

export default SimpleTopBar;