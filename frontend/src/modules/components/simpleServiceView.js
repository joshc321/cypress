import { List, ListItem, ListItemButton, 
    ListItemText, Typography, Divider, ListItemIcon,
    Box,
} from '@mui/material'

import TextListItem from './textListItem';
import TextListItemButton from './textListItemButton';

import MapsSelector from './api/mapsSelector';
import useWindowDimensions from '../components/useWindowDimensions'

import { Link } from 'react-router-dom';

import { ArrowForwardIos, PinDrop,
     Event, LocalAtm, Notes, Note
} from '@mui/icons-material'

export default function SimpleServiceView({data})
{
    const windowDimensions = useWindowDimensions()

    return(
        <Box sx={{pt: 25, pb: 8}}>
            <List>
                <ListItem sx={{p: 0}}>
                    <ListItemButton component={Link} to={`/customer/${data.customer._id}`}>
                        <ListItemText 
                            primary={
                                <div>
                                    <Typography sx={{ maxWidth: windowDimensions.width * 0.8, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>Customer</Typography>
                                    <Typography sx={{ maxWidth: windowDimensions.width * 0.8, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightBold", fontSize: 18 }}>{data.customer.first + ' ' + data.customer.last}</Typography>
                                </div>
                            }/>
                        <ArrowForwardIos />
                    </ListItemButton>    
                </ListItem>
                <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                <TextListItemButton text={data.customer.address.street} icon={<PinDrop />} handleClick={() => MapsSelector(data.customer.address.street)}/>
                <TextListItem text={data.date.format()} icon={<Event />} />
                <TextListItem text={data.bill ? '$ '+ data.bill : 'No Price'} icon={<LocalAtm />} />
                <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                <TextListItem text={data.service} icon={<Note />}/>
                <TextListItem text={data.notes} icon={<Notes />}/>
                <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            </List>
        </Box>
    )
}