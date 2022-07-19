import { Paper,Typography,Box, IconButton, Divider, Grid, Link } from '@mui/material'
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TopBar(props){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    return(
        <div>
        <Paper square={true} elevation={0} sx={{
            position: 'fixed',
            zIndex: 'tooltip',
            width: '100%',
        }}>
            <Paper square={true} sx={{
                backgroundColor: 'secondary.dark',
                height: 154,
                }}
            >
                <Box sx={{ml: 0, mt:0}}>
                <IconButton
                    aria-label="back button"
                    onClick={handleClick}
                    edge="end"
                    >
                    {<ArrowBackIosNew color="secondary"/>}
                </IconButton>
                </Box>
                <Box sx={{ pt: 2 }}>
                <Typography noWrap fontWeight="fontWeightSemibold" sx={{fontSize:36, fontFamily:"Proxima Nova"}} color="white" align="center">{props.primary}</Typography>
                </Box>

            </Paper>
            {!props.id ?
            <div>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ml: 2, mt: 1, pr: 4}}>
                    <Grid>
                        <Typography fontWeight="fontWeightBold" variant="h4">{props.secondary}</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            </div> : ''}
        </Paper>
        {props.id ?
            <Box sx={{ pt: 19 }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ml: 2, mt: 1, pr: 4}}>
                    <Grid>
                        <Link onClick={props.onClick} fontWeight="fontWeightBold" variant="h4" underline="hover">{props.secondary}</Link>
                    </Grid>
                    <Grid>
                        <Link onClick={()=> navigate(`/edit-customer/:${props.id}`)} color='inherit' underline="hover" variant='body1'>Edit</Link>
                    </Grid>
                </Grid> 
                <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/> 
            </Box>
            : ''}
        </div>
        
    )
}

export default TopBar;