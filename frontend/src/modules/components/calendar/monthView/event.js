import { Paper, Typography, Stack, Box } from "@mui/material"

export default function Event({value}) {
    return(
        <Paper sx={{ width: "95%", backgroundColor: "secondary.light", paddingX: 0.5, cursor: 'pointer'}}>
            <Typography fontSize={12} sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }} >{value} testing the length overflow???</Typography>
        </Paper>
    )
}