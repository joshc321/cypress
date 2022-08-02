import { List, Divider } from '@mui/material'
import { PinDrop, Phone, Event, Note, Notes, EventRepeat, CalendarToday } from '@mui/icons-material';

import MapsSelector from './api/mapsSelector';
import TextListItemButton from './textListItemButton';
import TextListItem from './textListItem';

import moment from 'moment';

function SimpleCustomerView({data})
{
    return(
        <>
            <TextListItemButton text={data.address.street} icon={<PinDrop />} handleClick={() => MapsSelector(data.address.street)}/>
            <TextListItem text={data.phone} icon={<Phone />} />
            <TextListItem text={data.lastServiced.format()} icon={<Event />} />
            <TextListItem text={data.nextService.format()} icon={<CalendarToday />} />
            <TextListItem text={moment.duration(data.serviceInterval.duration, data.serviceInterval.unit).humanize()} icon={<EventRepeat />} />
            <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
            <TextListItem text={data.system} icon={<Note />} />
            <TextListItem text={data.notes} icon={<Notes />} />
            <Divider sx={{ borderBottomWidth: 18 }}/>
        </>
    )
}

export default SimpleCustomerView;