import { IconButton, Box } from '@mui/material'
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'

function ScrollArrows({ onBackArrow, onForwardArrow })
{
    return(
        <Box>
            <IconButton onClick={onBackArrow}>
              <ArrowBackIos fontSize='small'/>
            </IconButton>
            <IconButton onClick={onForwardArrow}>
              <ArrowForwardIos fontSize='small' />
            </IconButton>
        </Box>
    );
}

export default ScrollArrows;