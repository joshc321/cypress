import { ListItem, ListItemButton, ListItemText, Typography, Divider } from "@mui/material"
import { ArrowForwardIos } from "@mui/icons-material"
import { Link } from "react-router-dom"

export default function SingleListItem({text, to, divider=false, color=''})
{
    return(
        <>
            <ListItem sx={{p: 0}} >
                <ListItemButton component={Link} to={to} sx={{ height: 75}}>
                    <ListItemText primary={
                        <Typography fontWeight="fontWeightBold" variant="body1" color={color}>{text}</Typography>
                    }
                    />
                    <ArrowForwardIos />
                </ListItemButton>
            </ListItem>

            {divider ? <Divider /> : ''}
        </>
    )
}