import {ListItem, Typography, ListItemButton, ListItemText,
    Divider
} from '@mui/material';
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

function ListItemThreeIn({ primaryText, secondaryText, topText, linkTo })
{
    return(
        <div>
        <ListItem sx={{ p: 0 }}>
            <ListItemButton
            component={Link}
            to={linkTo}
            >
            <ListItemText
                primary={
                <div>
                    <Typography
                    sx={{
                        fontFamily: "Proxima Nova Alt",
                        fontWeight: "fontWeightThin",
                        fontSize: 13,
                    }}
                    >
                    {topText}
                    </Typography>
                    <Typography
                    sx={{
                        fontFamily: "Proxima Nova Alt",
                        fontWeight: "fontWeightBold",
                        fontSize: 18,
                    }}
                    >
                    {primaryText}
                    </Typography>
                </div>
                }
                secondary={
                <Typography
                    sx={{
                    fontFamily: "Proxima Nova Alt",
                    fontWeight: "fontWeightLight",
                    fontSize: 13,
                    }}
                >
                    {secondaryText}
                </Typography>
                }
            />
            <ArrowForwardIos />
            </ListItemButton>
        </ListItem>
            <Divider variant='middle'/>
        </div>
    )
}

export default ListItemThreeIn