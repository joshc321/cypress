import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import useWindowDimensions from './useWindowDimensions';

function TextListItemButton({text, icon, handleClick})
{
    const windowDimensions = useWindowDimensions()
    
    return(
        <ListItem sx={{p: 0}} onClick={handleClick}>
            <ListItemButton> 
                <ListItemIcon>
                    {icon}
                    <ListItemText 
                        primary={
                            <div>
                                <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{text}</Typography>
                            </div>
                        }/>
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}

export default TextListItemButton;