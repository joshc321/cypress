import {
    Paper, Box, Typography
} from '@mui/material'

function TopBarLarge(props){
    return(
        <Paper square={true} sx={{
            backgroundColor: 'secondary.dark',
            height: 223,
            }}
        >
            <Box sx={{ pt: 6 }}>
            <Typography fontWeight="fontWeightBold" variant="h1" color="white" align="center">{props.primary}</Typography>
            <Typography noWrap sx={{ pt: 1 }}fontWeight="fontWeightSemibold" variant="h6" color="white" align="center">{props.secondary}</Typography>
            </Box>

        </Paper>
    )
}

export default TopBarLarge