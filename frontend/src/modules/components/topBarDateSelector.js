import { Paper,Typography,Box, IconButton, Divider, TextField, Stack } from '@mui/material'
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function TopBarDateSelector(props){

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
            {(!props.id && props.secondary ) ?
            <div>
                <Stack  direction="row" justifyContent="space-between" alignItems="center" sx={{ml: 2, mt: 1, mr: 2}}>
                    <Typography fontWeight="fontWeightBold" variant="h4">{props.secondary}</Typography>
                    <TextField 
                        type="month"
                        size="small"
                        value={moment(props.date).format("yyyy-MM")}
                        onChange={props.handleChange}
                        required={true}
                        InputLabelProps={{
                            shrink: true,
                            }}
                    />
                </Stack>
                <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            </div> : ''}
        </Paper>
        </div>
        
    )
}

export default TopBarDateSelector;