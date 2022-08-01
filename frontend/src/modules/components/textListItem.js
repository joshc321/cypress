import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import useWindowDimensions from './useWindowDimensions';

function TextListItem({text, icon})
{
    const windowDimensions = useWindowDimensions()

    return(
        <ListItem> 
            <ListItemIcon>
                {icon}
                <ListItemText 
                    primary={
                        <div>
                            <Typography sx={{ maxWidth: windowDimensions.width * 0.9, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{text}</Typography>
                        </div>
                    }/>
            </ListItemIcon>
        </ListItem>
    )
}

export default TextListItem;