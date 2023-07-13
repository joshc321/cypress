import { Popover, Stack, Box, Typography } from "@mui/material";
import Event from "./event";

export default function Popup({ open, anchorEl, onClose, data }){
    return(
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Stack
            >
                <Box display="flex" flexDirection={"column"} alignItems="center">
                <Typography pt={1} textTransform={"uppercase"} fontSize={12} fontWeight="fontWeightRegular">{data && data?.day}</Typography>
                    <Typography fontSize={26} fontWeight="fontWeightRegular" >{data && data?.value}</Typography>
                </Box>
                <Stack
                    px={1}
                    paddingBottom={1}
                    spacing={0.5}
                    overflow={"auto"}
                    maxHeight={400}
                >
                    {data && data?.events.map((v) => {
                        return(<Event key={v} value={v}/>)
                    })}
                </Stack>
            </Stack>
        </Popover>
    )
}