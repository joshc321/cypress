import { ListItem, Divider, ListItemButton, ListItemText, Typography } from '@mui/material'
import { PinDrop, Phone, Event, Note, Notes, EventRepeat, CalendarToday, ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom'

import MapsSelector from './api/mapsSelector';
import TextListItemButton from './textListItemButton';
import TextListItem from './textListItem';
import useWindowDimensions from './useWindowDimensions';

import moment from 'moment';

function SimpleCustomerView({data})
{
    const windowDimensions = useWindowDimensions()

    return(
        <>
            { data.scheduledService && data.scheduledService._id ? 
            <>
            <ListItem sx={{p: 0}}>
                <ListItemButton component={Link} to={`/viewscheduledservice/${data.scheduledService._id}`}>
                    <ListItemText 
                        primary={
                            <div>
                                <Typography sx={{ maxWidth: windowDimensions.width * 0.8, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightSemibold", fontSize: 13 }}>Scheduled Service</Typography>
                                <Typography sx={{ maxWidth: windowDimensions.width * 0.8, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightBold", fontSize: 18 }}>{data.scheduledService.date.format()}</Typography>
                            </div>
                        }/>
                    <ArrowForwardIos />
                </ListItemButton>    
            </ListItem>
            <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            </>
            : ''}
            <TextListItemButton text={data?.address?.street} icon={<PinDrop />} handleClick={() => MapsSelector(data?.address?.street)}/>
            <TextListItem text={data?.phone} icon={<Phone />} />
            <TextListItem text={moment(data?.lastServiced).format()} icon={<Event />} />
            <TextListItem text={moment(data?.nextService).format()} icon={<CalendarToday />} />
            <TextListItem text={moment.duration(data?.serviceInterval?.duration, data?.serviceInterval?.unit).humanize()} icon={<EventRepeat />} />
            <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            <TextListItem text={data?.system} icon={<Note />} />
            <TextListItem text={data?.notes} icon={<Notes />} />
            <Divider sx={{ borderBottomWidth: 18 }}/>
        </>
    )
}

export default SimpleCustomerView;