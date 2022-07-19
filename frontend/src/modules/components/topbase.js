import { Typography, Box, IconButton} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
function TopBase(props){

    const navigate = useNavigate();

    const space = props.arrow ? 6.5 : 0;
    return(
        <div>
        
        { props.arrow ? 

        (<Box sx={{ml: 0, mt:0}}>
            <IconButton
                aria-label="toggle password visibility"
                onClick={()=>navigate('/login')}
                edge="end"
                >
                {<ArrowBackIosNew/>}
            </IconButton>
        </Box>)
        
        : '' }
        <Box sx={{ml: 2, mt:7 - space}}>
           <Typography fontWeight="fontWeightSemibold" variant="h4">{props.page}</Typography>
        </Box>
        <Box sx={{ mt: 15 }}>
            <Typography fontWeight="fontWeightBold" variant='h1' align='center'>Cypress</Typography>
        </Box>
        </div>
    )
}

export default TopBase;