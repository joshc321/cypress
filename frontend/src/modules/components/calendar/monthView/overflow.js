import { Paper, Typography, Stack, Box } from "@mui/material"

export default function Overflow({ value, onClick}) {
    return(
        <Paper 
            onClick={onClick}
            elevation={0}
            sx={{ 
                width: "95%", 
                paddingX: 0.5, 
                cursor: 'pointer',
                textAlign: 'center',
                '& :hover': {
                    backgroundColor: 'secondary.light',
                    borderRadius: '5px',
                }
            }}>
            <Typography fontSize={12} sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }} >{value}</Typography>
        </Paper>
    )
}