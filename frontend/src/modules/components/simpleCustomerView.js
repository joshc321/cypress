import { ListItem, Divider, ListItemButton, ListItemText, Typography } from '@mui/material'
import { PinDrop, Phone, Event, Note, Notes, Autorenew, AccessTime, ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom'

import MapsSelector from './api/mapsSelector';
import TextListItemButton from './textListItemButton';
import TextListItem from './textListItem';
import useWindowDimensions from './useWindowDimensions';
import formatDate from './helpers/formatDate';
import formatAddress from './helpers/formatAddress';
import formatDuration from './helpers/formatDuration';

import moment from 'moment';

function SimpleCustomerView({data})
{
    const windowDimensions = useWindowDimensions()

    return(
        <>
            { data.scheduledService && data.scheduledService._id ? 
            <>
            <ListItem sx={{p: 0}}>
                <ListItemButton component={Link} to={`/viewscheduledservice/${data?.scheduledService?._id}`}>
                    <ListItemText 
                        primary={
                            <div>
                                <Typography sx={{ maxWidth: windowDimensions.width * 0.8, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightSemibold", fontSize: 13 }}>Scheduled Service</Typography>
                                <Typography sx={{ maxWidth: windowDimensions.width * 0.8, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightBold", fontSize: 18 }}>{formatDate(data.scheduledService.date)}</Typography>
                            </div>
                        }/>
                    <ArrowForwardIos />
                </ListItemButton>    
            </ListItem>
            <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            </>
            : ''}
            <TextListItemButton text={formatAddress(data?.address)} icon={<PinDrop />} handleClick={() => MapsSelector(formatAddress(data?.address))}/>
            <TextListItem text={data?.phone} icon={<Phone />} />
            <TextListItem text={formatDate(data?.lastServiced)} icon={<Event />} />
            <TextListItem text={formatDate(data?.nextService)} icon={<AccessTime />} />
            <TextListItem text={formatDuration(data?.serviceInterval?.duration, data?.serviceInterval?.unit)} icon={<Autorenew />} />
            <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            <TextListItem text={data?.system} icon={<Note />} />
            <TextListItem text={data?.notes} icon={<Notes />} />
            <Divider sx={{ borderBottomWidth: 18 }}/>
        </>
    )
}

export default SimpleCustomerView;